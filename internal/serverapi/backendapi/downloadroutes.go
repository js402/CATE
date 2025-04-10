package backendapi

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/js402/CATE/internal/serverops"
	"github.com/js402/CATE/internal/serverops/store"
	"github.com/js402/CATE/internal/services/downloadservice"
)

func AddQueueRoutes(mux *http.ServeMux, _ *serverops.Config, dwService *downloadservice.Service) {
	s := &downloadManager{service: dwService}
	mux.HandleFunc("GET /queue", s.getQueue)
	mux.HandleFunc("DELETE /queue/{model}", s.removeFromQueue)
	mux.HandleFunc("GET /queue/inProgress", s.inProgress)
	// mux.HandleFunc("DELETE /queue/cancel", s.cancelDownload)
}

type downloadManager struct {
	service *downloadservice.Service
}

func (s *downloadManager) getQueue(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	currentQueue, err := s.service.CurrentQueueState(ctx)
	if err != nil {
		_ = serverops.Error(w, r, err, serverops.GetOperation)
		return
	}

	payload := map[string]any{
		"downloadQueue": currentQueue,
	}

	_ = serverops.Encode(w, r, http.StatusOK, payload)
}

func (s *downloadManager) removeFromQueue(w http.ResponseWriter, r *http.Request) {
	modelName := r.PathValue("model")
	if modelName == "" {
		_ = serverops.Error(w, r, serverops.ErrBadPathValue("model name required"), serverops.DeleteOperation)
		return
	}

	if err := s.service.RemoveFromQueue(r.Context(), modelName); err != nil {
		_ = serverops.Error(w, r, err, serverops.DeleteOperation)
		return
	}

	_ = serverops.Encode(w, r, http.StatusOK, map[string]string{"message": "Model removed from queue"})
}

// inProgress streams status updates to the client via Server-Sent Events.
func (s *downloadManager) inProgress(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	flusher, ok := w.(http.Flusher)
	if !ok {
		serverops.Error(w, r, serverops.ErrBadPathValue("streaming unsupported"), serverops.ServerOperation)
		return
	}

	statusCh := make(chan *store.Status)

	go func() {
		if err := s.service.InProgress(r.Context(), statusCh); err != nil {
			log.Printf("error during InProgress subscription: %v", err)
		}
		close(statusCh)
	}()

	// Listen for incoming status updates and stream them to the client.
	for {
		select {
		case st, ok := <-statusCh:
			if !ok {
				// Channel closed: end the stream.
				return
			}
			// Marshal the status update into JSON.
			data, err := json.Marshal(st)
			if err != nil {
				log.Printf("failed to marshal status update: %v", err)
				continue
			}
			// Write the SSE formatted message.
			fmt.Fprintf(w, "data: %s\n\n", data)
			// Flush to ensure the message is sent immediately.
			flusher.Flush()
		case <-r.Context().Done():
			// Client canceled the request.
			return
		}
	}
}

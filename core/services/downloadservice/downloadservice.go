package downloadservice

import (
	"context"
	"encoding/json"
	"log"
	"time"

	"github.com/js402/cate/core/serverops"
	"github.com/js402/cate/core/serverops/store"
	"github.com/js402/cate/libs/libbus"
	"github.com/js402/cate/libs/libdb"
)

var _ serverops.ServiceMeta = &Service{}

type Service struct {
	dbInstance      libdb.DBManager
	psInstance      libbus.Messenger
	securityEnabled bool
	jwtSecret       string
}

func New(dbInstance libdb.DBManager, psInstance libbus.Messenger) *Service {
	return &Service{
		dbInstance: dbInstance,
		psInstance: psInstance,
	}
}

type QueueJobs struct {
	ID           string          `json:"id"`
	TaskType     string          `json:"taskType"`
	ModelJob     store.QueueItem `json:"modelJob"`
	ScheduledFor int             `json:"scheduledFor"`
	ValidUntil   int             `json:"validUntil"`
	CreatedAt    time.Time       `json:"createdAt"`
}

func (s *Service) CurrentQueueState(ctx context.Context) ([]QueueJobs, error) {
	if err := serverops.CheckServiceAuthorization(ctx, s, store.PermissionView); err != nil {
		return nil, err
	}
	tx := s.dbInstance.WithoutTransaction()
	queue, err := store.New(tx).GetJobsForType(ctx, "model_download")
	if err != nil {
		return nil, err
	}
	var convQueue []QueueJobs
	var item store.QueueItem
	for _, queue := range queue {

		err := json.Unmarshal(queue.Payload, &item)
		if err != nil {
			return nil, err
		}
		convQueue = append(convQueue, QueueJobs{
			ID:           queue.ID,
			TaskType:     queue.TaskType,
			ModelJob:     item,
			ScheduledFor: queue.ScheduledFor,
			ValidUntil:   queue.ValidUntil,
			CreatedAt:    queue.CreatedAt,
		})
	}

	return convQueue, nil
}

func (s *Service) CancelDownloads(ctx context.Context, url string) error {
	queueItem := store.Job{
		ID: url,
	}
	b, err := json.Marshal(&queueItem)
	if err != nil {
		return err
	}
	return s.psInstance.Publish(ctx, "queue_cancel", b)
}

func (s *Service) RemoveFromQueue(ctx context.Context, modelName string) error {
	if err := serverops.CheckServiceAuthorization(ctx, s, store.PermissionView); err != nil {
		return err
	}
	tx, comm, rTx, err := s.dbInstance.WithTransaction(ctx)
	defer func() {
		if err := rTx(); err != nil {
			log.Println("failed to rollback transaction", err)
		}
	}()
	if err != nil {
		return err
	}
	jobs, err := store.New(tx).PopJobsForType(ctx, "model_download")
	if err != nil {
		return err
	}
	found := false
	var filteresJobs []*store.Job
	for _, job := range jobs {
		var item store.QueueItem
		err = json.Unmarshal(job.Payload, &item)
		if err != nil {
			return err
		}
		if item.Model != modelName {
			filteresJobs = append(filteresJobs, job)
		}
		if item.Model == modelName {
			found = true
		}
	}
	for _, job := range filteresJobs {
		err := store.New(tx).AppendJob(ctx, *job)
		if err != nil {
			return err
		}
	}
	if found {
		return comm(ctx)
	}
	return nil
}

func (s *Service) InProgress(ctx context.Context, statusCh chan<- *store.Status) error {
	if err := serverops.CheckServiceAuthorization(ctx, s, store.PermissionView); err != nil {
		return err
	}
	ch := make(chan []byte, 16)
	sub, err := s.psInstance.Stream(ctx, "model_download", ch)
	if err != nil {
		return err
	}
	go func() {
		defer sub.Unsubscribe()
		for {
			select {
			case data, ok := <-ch:
				if !ok {
					return
				}
				var st store.Status
				if err := json.Unmarshal(data, &st); err != nil {
					log.Printf("failed to unmarshal status: %v", err)
					continue
				}
				if len(st.BaseURL) == 0 {
					log.Printf("BUG: len(st.BaseURL) == 0")
					continue
				}
				select {
				case statusCh <- &st:
				default:
					// If the channel is full, skip sending.
				}
			case <-ctx.Done():
				return
			}
		}
	}()

	<-ctx.Done()

	if err := sub.Unsubscribe(); err != nil {
		return err
	}

	return nil
}

func (s *Service) GetServiceName() string {
	return "downloadservice"
}

func (s *Service) GetServiceGroup() string {
	return serverops.DefaultDefaultServiceGroup
}

package backendservice

import (
	"context"
	"errors"
	"fmt"

	"github.com/js402/cate/core/serverops"
	"github.com/js402/cate/core/serverops/store"
	"github.com/js402/cate/libs/libdb"
)

var (
	ErrInvalidBackend = errors.New("invalid backend data")
)

type Service struct {
	dbInstance      libdb.DBManager
	securityEnabled bool
	jwtSecret       string
}

func New(db libdb.DBManager) *Service {
	return &Service{dbInstance: db}
}

func (s *Service) Create(ctx context.Context, backend *store.Backend) error {
	tx := s.dbInstance.WithoutTransaction()
	if err := serverops.CheckServiceAuthorization(ctx, store.New(tx), s, store.PermissionManage); err != nil {
		return err
	}
	if err := validate(backend); err != nil {
		return err
	}
	return store.New(tx).CreateBackend(ctx, backend)
}

func (s *Service) Get(ctx context.Context, id string) (*store.Backend, error) {
	tx := s.dbInstance.WithoutTransaction()
	if err := serverops.CheckServiceAuthorization(ctx, store.New(tx), s, store.PermissionView); err != nil {
		return nil, err
	}
	return store.New(tx).GetBackend(ctx, id)
}

func (s *Service) Update(ctx context.Context, backend *store.Backend) error {
	if err := validate(backend); err != nil {
		return err
	}
	tx := s.dbInstance.WithoutTransaction()
	if err := serverops.CheckServiceAuthorization(ctx, store.New(tx), s, store.PermissionManage); err != nil {
		return err
	}
	return store.New(tx).UpdateBackend(ctx, backend)
}

func (s *Service) Delete(ctx context.Context, id string) error {
	tx := s.dbInstance.WithoutTransaction()
	if err := serverops.CheckServiceAuthorization(ctx, store.New(tx), s, store.PermissionManage); err != nil {
		return err
	}
	return store.New(tx).DeleteBackend(ctx, id)
}

func (s *Service) List(ctx context.Context) ([]*store.Backend, error) {
	tx := s.dbInstance.WithoutTransaction()
	if err := serverops.CheckServiceAuthorization(ctx, store.New(tx), s, store.PermissionView); err != nil {
		return nil, err
	}
	return store.New(tx).ListBackends(ctx)
}

func validate(backend *store.Backend) error {
	if backend.Name == "" {
		return fmt.Errorf("%w: name is required", ErrInvalidBackend)
	}
	if backend.BaseURL == "" {
		return fmt.Errorf("%w: baseURL is required", ErrInvalidBackend)
	}
	if backend.Type != "Ollama" {
		return fmt.Errorf("%w: Type is required to be Ollama", ErrInvalidBackend)
	}

	return nil
}

func (s *Service) GetServiceName() string {
	return "backendservice"
}

func (s *Service) GetServiceGroup() string {
	return serverops.DefaultDefaultServiceGroup
}

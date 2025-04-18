import { apiFetch } from './fetch';
import {
  AccessEntry,
  AuthenticatedUser,
  Backend,
  ChatMessage,
  ChatSession,
  Job,
  Model,
  Pool,
  UpdateAccessEntryRequest,
  UpdateUserRequest,
  User,
} from './types';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
  credentials?: RequestCredentials;
}

const options = (method: HttpMethod, data?: unknown): ApiOptions => {
  const options: ApiOptions = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return options;
};

export const api = {
  // Backends
  getBackends: () => apiFetch<Backend[]>('/api/backends'),
  getBackend: (id: string) => apiFetch<Backend>(`/api/backends/${id}`),
  createBackend: (data: Partial<Backend>) =>
    apiFetch<Backend>('/api/backends', options('POST', data)),
  updateBackend: (id: string, data: Partial<Backend>) =>
    apiFetch<Backend>(`/api/backends/${id}`, options('PUT', data)),
  deleteBackend: (id: string) => apiFetch<void>(`/api/backends/${id}`, options('DELETE')),

  // Model State
  createModel: (model: string) => apiFetch<Model>('/api/models', options('POST', { model })),
  getModels: () => apiFetch<Model[]>('/api/models'),
  deleteModel: (model: string) => apiFetch<void>(`/api/models/${model}`, options('DELETE')),

  // Chats
  createChat: ({ model }: Partial<ChatSession>) =>
    apiFetch<Partial<ChatSession>>('/api/chats', options('POST', { model })),
  sendMessage: (id: string, message: string) =>
    apiFetch<ChatMessage[]>(`/api/chats/${id}/chat`, options('POST', { message })),

  sendInstruction: (id: string, instruction: string) =>
    apiFetch<ChatMessage[]>(`/api/chats/${id}/instruction`, options('POST', { instruction })),

  getChatHistory: (id: string) => apiFetch<ChatMessage[]>(`/api/chats/${id}`),
  getChats: () => apiFetch<ChatSession[]>('/api/chats'),

  // Users
  getUsers: (from?: string) =>
    apiFetch<User[]>(from ? `/api/users?from=${encodeURIComponent(from)}` : '/api/users'),
  getUser: (id: string) => apiFetch<User>(`/api/users/${id}`),
  createUser: (data: Partial<AccessEntry>) => apiFetch<User>('/api/users', options('POST', data)),
  updateUser: (id: string, data: UpdateUserRequest) =>
    apiFetch<User>(`/api/users/${id}`, options('PUT', data)),
  deleteUser: (id: string) => apiFetch<void>(`/api/users/${id}`, options('DELETE')),

  getSystemServices: () => apiFetch<string[]>(`/api/system/services`),

  getQueue: () => apiFetch<Job[] | null>(`/api/queue`),
  deleteQueueEntry: (model: string) => apiFetch<void>(`/api/queue/${model}`, options('DELETE')),
  queueProgress(): EventSource {
    return new EventSource(`api/queue/inProgress`);
  },

  // Pools
  getPools: () => apiFetch<Pool[]>('/api/pools'),
  getPool: (id: string) => apiFetch<Pool>(`/api/pools/${id}`),
  createPool: (data: Partial<Pool>) => apiFetch<Pool>('/api/pools', options('POST', data)),
  updatePool: (id: string, data: Partial<Pool>) =>
    apiFetch<Pool>(`/api/pools/${id}`, options('PUT', data)),
  deletePool: (id: string) => apiFetch<void>(`/api/pools/${id}`, options('DELETE')),
  getPoolByName: (name: string) => apiFetch<Pool>(`/api/pool-by-name/${name}`),
  listPoolsByPurpose: (purpose: string) => apiFetch<Pool[]>(`/api/pool-by-purpose/${purpose}`),

  // Backend associations
  assignBackendToPool: (poolID: string, backendID: string) =>
    apiFetch<void>(`/api/backend-associations/${poolID}/backends/${backendID}`, options('POST')),
  removeBackendFromPool: (poolID: string, backendID: string) =>
    apiFetch<void>(`/api/backend-associations/${poolID}/backends/${backendID}`, options('DELETE')),
  listBackendsForPool: (poolID: string) =>
    apiFetch<Backend[]>(`/api/backend-associations/${poolID}/backends`),
  listPoolsForBackend: (backendID: string) =>
    apiFetch<Pool[]>(`/api/backend-associations/${backendID}/pools`),

  // Model associations
  assignModelToPool: (poolID: string, modelID: string) =>
    apiFetch<void>(`/api/model-associations/${poolID}/models/${modelID}`, options('POST')),
  removeModelFromPool: (poolID: string, modelID: string) =>
    apiFetch<void>(`/api/model-associations/${poolID}/models/${modelID}`, options('DELETE')),
  listModelsForPool: (poolID: string) =>
    apiFetch<Model[]>(`/api/model-associations/${poolID}/models`),
  listPoolsForModel: (modelID: string) =>
    apiFetch<Pool[]>(`/api/model-associations/${modelID}/pools`),

  // Access Entries
  getAccessEntries: (expand?: boolean, identity?: string) => {
    const params = new URLSearchParams();
    if (expand) params.append('expand', 'user');
    if (identity) params.append('identity', identity);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiFetch<AccessEntry[]>(`/api/access-control${queryString}`);
  },
  getPermissions: () => apiFetch<string[]>('/api/permissions'),

  getAccessEntry: (id: string) => apiFetch<AccessEntry>(`/api/access-control/${id}`),
  createAccessEntry: (data: Partial<AccessEntry>) =>
    apiFetch<AccessEntry>('/api/access-control', options('POST', data)),
  updateAccessEntry: (id: string, data: UpdateAccessEntryRequest) =>
    apiFetch<AccessEntry>(`/api/access-control/${id}`, options('PUT', data)),
  deleteAccessEntry: (id: string) => apiFetch<void>(`/api/access-control/${id}`, options('DELETE')),

  // Auth endpoints
  login: (data: Partial<User>): Promise<AuthenticatedUser> =>
    apiFetch<AuthenticatedUser>('/api/ui/login', options('POST', data)),
  register: (data: Partial<User>): Promise<AuthenticatedUser> =>
    apiFetch<AuthenticatedUser>('/api/ui/register', options('POST', data)),
  logout: () => apiFetch<void>('/api/ui/logout', options('POST')),
  getCurrentUser: (): Promise<AuthenticatedUser> => apiFetch<AuthenticatedUser>('/api/ui/me'),
  // Queue management
  removeModelFromQueue: (model: string) => apiFetch<void>(`/api/queue/${model}`, options('DELETE')),
};

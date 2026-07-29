import axios, { AxiosError } from 'axios';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const api = axios.create({
  baseURL: `${basePath}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Request failed';
    const err = new Error(message) as Error & { response?: typeof error.response };
    err.response = error.response;
    throw err;
  }
);

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  city?: string;
  social_links?: string;
  rating_sum?: number;
  rating_count?: number;
  average_rating?: number;
  badge?: string;
  isAdmin?: boolean;
  is_super_admin?: boolean;
  is_authenticated?: boolean;
  is_blocked?: boolean;
  blocked_until?: string;
  blocked_reason?: string;
  telegram_id?: string | null;
  telegram_username?: string | null;
  total_applications?: number;
  active_applications?: number;
  resolved_applications?: number;
  false_calls_count?: number;
  help_given?: number;
  help_total?: number;
  received_ratings?: Array<{
    id: number;
    rating_value: number;
    comment?: string;
    created_at: string;
    rater: { first_name: string; last_name?: string };
  }>;
  
}

export type Category =
  | 'emergency'
  | 'food'
  | 'medicine'
  | 'shelter';

export interface Application {
  id: number;
  number?: number;
  description: string;
  latitude: number;
  longitude: number;
  address?: string;
  category: Category;
  date?: string;
  created_at?: string;
  expires_at?: string;
  duration_days?: number;
  status?: string;
  moderation_status?: string;
  is_sos?: boolean;
  is_resolved?: boolean;
  is_false_call?: boolean;
  is_own?: boolean;
  user_id?: number;
  creator?: {
    id: number;
    first_name: string;
    last_name?: string;
    avatar?: string;
  };
  priority: number;
  city?: string;
  region?: string;
  location?: string;
  sos_count?: number;
  media_files?: Array<{ id: number; file_path: string; file_type: string }>;
  responses?: ApplicationResponse[];
  user_response?: ApplicationResponse;
  accepted_volunteers?: Array<{
    response_id: number;
    responder_id: number;
    status: string;
    responder?: User;
    is_rated?: boolean;
    rating_value?: number;
  }>;
  responses_count?: number;
}

export interface ApplicationResponse {
  id: number;
  application_id?: number;
  responder_id?: number;
  status?: string;
  created_at?: string;
  responder?: {
    id: number;
    first_name: string;
    last_name?: string;
    avatar?: string;
    average_rating?: number;
  };
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  notification_type?: string;
  is_read: boolean;
  created_at?: string;
  related_application_id?: number;
  related_user_id?: number;
}

export interface SearchResult {
  applications?: Application[];
  users?: User[];
  cities?: string[];
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    pages: number;
  };
}

export interface LeaderboardEntry {
  rank: number;
  id: number;
  first_name: string;
  last_name?: string;
  avatar?: string;
  help_count: number;
  average_rating: number;
  rating_count: number;
  badge?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  news_type: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
  author?: {
    id?: number;
    first_name: string;
    last_name?: string;
  };
}

function cacheParams(forceRefresh?: boolean, city?: string) {
  const params: Record<string, string | number> = {};
  if (city) params.city = city;
  if (forceRefresh) params._ = Date.now();
  return params;
}

class ApiClient {
  async getApplications(forceRefresh?: boolean, city?: string): Promise<Application[]> {
    const { data } = await api.get<Application[]>('/map/points', {
      params: cacheParams(forceRefresh, city),
    });
    return data;
  }

  async getApplicationsList(forceRefresh?: boolean, city?: string): Promise<Application[]> {
    const { data } = await api.get<Application[]>('/applications/list', {
      params: cacheParams(forceRefresh, city),
    });
    return data;
  }

  async getApplication(id: number): Promise<Application> {
    const { data } = await api.get<Application>(`/applications/${id}`);
    return data;
  }

  async createApplication(payload: {
    latitude: number;
    longitude: number;
    category: string;
    description: string;
    city?: string;
    region?: string;
  }): Promise<Application> {
    const { data } = await api.post<Application>('/applications', payload);
    return data;
  }

  async respondToApplication(appId: number): Promise<void> {
    await api.post(`/applications/${appId}/respond`);
  }

  async acceptResponse(appId: number, responseId: number): Promise<void> {
    await api.post(`/applications/${appId}/responses/${responseId}/accept`);
  }

  async rejectResponse(appId: number, responseId: number): Promise<void> {
    await api.post(`/applications/${appId}/responses/${responseId}/reject`);
  }

  async resolveApplication(appId: number): Promise<void> {
    await api.post(`/applications/${appId}/resolve`);
  }

  async rateVolunteer(appId: number, helperId: number, isPositive: boolean): Promise<void> {
    await api.post(`/applications/${appId}/rate-volunteer-simple`, {
      helper_id: helperId,
      is_positive: isPositive,
    });
  }

  async rateHelper(
    appId: number,
    helperId: number,
    ratingValue: number,
    comment?: string
  ): Promise<{ success: boolean; message: string }> {
    const { data } = await api.post(`/applications/${appId}/rate-helper`, {
      helper_id: helperId,
      rating_value: ratingValue,
      comment,
    });
    return data;
  }

  async markApplicationFalse(appId: number): Promise<void> {
    await api.post(`/applications/${appId}/mark-false`);
  }

  async createSOS(latitude: number, longitude: number): Promise<void> {
    await api.post('/sos', { latitude, longitude });
  }

  async getRegionalStats(city?: string) {
    const { data } = await api.get('/stats/regional', {
      params: city ? { city } : undefined,
    });
    return data;
  }

  async search(query: string): Promise<SearchResult> {
    const { data } = await api.get<SearchResult>('/search', { params: { q: query } });
    return data;
  }

  async searchCities(query: string): Promise<{ cities: string[] }> {
    const { data } = await api.get<{ cities: string[] }>('/cities/search', { params: { q: query } });
    return data;
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const { data } = await api.get<LeaderboardEntry[]>('/leaderboard');
    return data;
  }

  async login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  async signup(payload: {
    email: string;
    firstName: string;
    lastName?: string;
    password1: string;
    password2: string;
    phone: string;
    city: string;
    cityHidden?: boolean;
    telegram_id?: string;
  }) {
    const { data } = await api.post('/auth/signup', payload);
    return data;
  }

  async getCurrentUser() {
    const { data } = await api.get('/user/current');
    return data;
  }

  async getUser(id: number): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  }

  async getUserApplications(limit = 10, offset = 0) {
    const { data } = await api.get('/user/applications', { params: { limit, offset } });
    return data;
  }

  async getUserResponses(limit = 10, offset = 0) {
    const { data } = await api.get('/user/responses', { params: { limit, offset } });
    return data;
  }

  async updateProfile(formData: FormData): Promise<void> {
    await api.post('/profile/edit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async getTelegramBotInfo() {
    const { data } = await api.get('/telegram-bot-info');
    return data;
  }

  async linkTelegram(
    telegramId: string,
    telegramUsername?: string
  ): Promise<{ success: boolean; message?: string; error?: string; telegram_id?: string }> {
    const { data } = await api.post('/link-telegram', {
      telegram_id: telegramId,
      telegram_username: telegramUsername,
    });
    return data;
  }

  async getNotifications() {
    const { data } = await api.get('/notifications');
    return data;
  }

  async markNotificationRead(id: number): Promise<void> {
    await api.post(`/notifications/${id}/read`);
  }

  async markAllNotificationsRead(): Promise<void> {
    await api.post('/notifications/read-all');
  }

  async getNews(limit = 20, offset = 0) {
    const { data } = await api.get('/news', { params: { limit, offset } });
    return data;
  }

  async getSingleNews(id: number): Promise<NewsItem> {
    const { data } = await api.get<NewsItem>(`/news/${id}`);
    return data;
  }

  async getAdminStats() {
    const { data } = await api.get('/admin/stats');
    return data;
  }

  async getAdminUsers() {
    const { data } = await api.get('/admin/users');
    return data;
  }

  async getAdminApplications(status: 'all' | 'pending' | 'approved' | 'rejected' = 'all') {
    const { data } = await api.get<Application[]>('/admin/applications', { params: { status } });
    return data;
  }

  async approveApplication(appId: number): Promise<void> {
    await api.post(`/admin/applications/${appId}/approve`);
  }

  async rejectApplication(appId: number): Promise<void> {
    await api.post(`/admin/applications/${appId}/reject`);
  }

  async markFalseApplication(appId: number): Promise<void> {
    await api.post(`/admin/applications/${appId}/mark-false`);
  }

  async setApplicationPriority(appId: number, priority: number): Promise<void> {
    await api.post(`/admin/applications/${appId}/set-priority`, { priority });
  }

  async blockUser(userId: number, days: number, reason: string): Promise<void> {
    await api.post(`/admin/users/${userId}/block`, { days, reason });
  }

  async unblockUser(userId: number): Promise<void> {
    await api.post(`/admin/users/${userId}/unblock`);
  }

  async makeAdmin(userId: number): Promise<void> {
    await api.post(`/admin/users/${userId}/make-admin`);
  }

  async deleteUser(userId: number): Promise<void> {
    await api.post(`/admin/users/${userId}/delete`);
  }

  async getAdminNews() {
    const { data } = await api.get('/admin/news');
    return data;
  }

  async createNews(payload: {
    title: string;
    content: string;
    news_type: string;
    is_published?: boolean;
  }) {
    const { data } = await api.post('/admin/news', payload);
    return data;
  }

  async updateNews(
    id: number,
    payload: Partial<{
      title: string;
      content: string;
      news_type: string;
      is_published: boolean;
    }>
  ) {
    const { data } = await api.put(`/admin/news/${id}`, payload);
    return data;
  }

  async deleteNews(id: number): Promise<void> {
    await api.delete(`/admin/news/${id}`);
  }
}

export const apiClient = new ApiClient();
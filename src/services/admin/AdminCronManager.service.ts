import apiInterceptor from '../../api/api.interceptor';

export interface IResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export const AdminCronManager = {
  async getAgents(): Promise<IResponse<{}>> {
    const response = await apiInterceptor.get<IResponse<{}>>(
      `${import.meta.env.VITE_API}/admin/sync-agent`
    );
    return response.data;
  },
  async getAgentStatus(): Promise<{ isSyncing: boolean }> {
    const response = await apiInterceptor.get<{ isSyncing: boolean }>(
      `${import.meta.env.VITE_API}/admin/status-agent`
    );
    return response.data;
  },

  async getUsers(): Promise<IResponse<{}>> {
    const response = await apiInterceptor.get<IResponse<{}>>(
      `${import.meta.env.VITE_API}/admin/sync-users`
    );
    return response.data;
  },
  async getUsersStatus(): Promise<{ isSyncing: boolean }> {
    const response = await apiInterceptor.get<{ isSyncing: boolean }>(
      `${import.meta.env.VITE_API}/admin/status-users`
    );
    return response.data;
  },

  async getCategories(): Promise<IResponse<{}>> {
    const response = await apiInterceptor.get<IResponse<{}>>(
      `${import.meta.env.VITE_API}/admin/sync-category`
    );
    return response.data;
  },
  async getCategoryStatus(): Promise<{ isSyncing: boolean }> {
    const response = await apiInterceptor.get<{ isSyncing: boolean }>(
      `${import.meta.env.VITE_API}/admin/status-category`
    );
    return response.data;
  },

  async getProducts(): Promise<IResponse<{}>> {
    const response = await apiInterceptor.get<IResponse<{}>>(
      `${import.meta.env.VITE_API}/admin/sync-products`
    );
    return response.data;
  },
  async getProductsStatus(): Promise<{ isSyncing: boolean }> {
    const response = await apiInterceptor.get<{ isSyncing: boolean }>(
      `${import.meta.env.VITE_API}/admin/status-products`
    );
    return response.data;
  },

  async getPriceLists(): Promise<IResponse<{}>> {
    const response = await apiInterceptor.get<IResponse<{}>>(
      `${import.meta.env.VITE_API}/admin/sync-price-lists`
    );
    return response.data;
  },
  async getPriceListsStatus(): Promise<{ isSyncing: boolean }> {
    const response = await apiInterceptor.get<{ isSyncing: boolean }>(
      `${import.meta.env.VITE_API}/admin/status-price-lists`
    );
    return response.data;
  },

  async getPriceListDetailed(): Promise<IResponse<{}>> {
    const response = await apiInterceptor.get<IResponse<{}>>(
      `${import.meta.env.VITE_API}/admin/sync-price-list-detailed`
    );
    return response.data;
  },
  async getPriceListDetailedStatus(): Promise<{ isSyncing: boolean }> {
    const response = await apiInterceptor.get<{ isSyncing: boolean }>(
      `${import.meta.env.VITE_API}/admin/status-price-list-detailed`
    );
    return response.data;
  },

  async getPriceListUser(): Promise<IResponse<{}>> {
    const response = await apiInterceptor.get<IResponse<{}>>(
      `${import.meta.env.VITE_API}/admin/sync-price-list-user`
    );
    return response.data;
  },
  async getPriceListUserStatus(): Promise<{ isSyncing: boolean }> {
    const response = await apiInterceptor.get<{ isSyncing: boolean }>(
      `${import.meta.env.VITE_API}/admin/status-price-list-user`
    );
    return response.data;
  },

  async getAttributesMain(): Promise<IResponse<{}>> {
    const response = await apiInterceptor.get<IResponse<{}>>(
      `${import.meta.env.VITE_API}/admin/sync-attributes-main`
    );
    return response.data;
  },
  async getAttributesMainStatus(): Promise<{ isSyncing: boolean }> {
    const response = await apiInterceptor.get<{ isSyncing: boolean }>(
      `${import.meta.env.VITE_API}/admin/status-attributes-main`
    );
    return response.data;
  },

  async getAttributesSub(): Promise<IResponse<{}>> {
    const response = await apiInterceptor.get<IResponse<{}>>(
      `${import.meta.env.VITE_API}/admin/sync-attributes-sub`
    );
    return response.data;
  },
  async getAttributesSubStatus(): Promise<{ isSyncing: boolean }> {
    const response = await apiInterceptor.get<{ isSyncing: boolean }>(
      `${import.meta.env.VITE_API}/admin/status-attributes-sub`
    );
    return response.data;
  },

  async getAttributesProduct(): Promise<IResponse<{}>> {
    const response = await apiInterceptor.get<IResponse<{}>>(
      `${import.meta.env.VITE_API}/admin/sync-attributes-product`
    );
    return response.data;
  },
  async getAttributesProductStatus(): Promise<{ isSyncing: boolean }> {
    const response = await apiInterceptor.get<{ isSyncing: boolean }>(
      `${import.meta.env.VITE_API}/admin/status-attributes-product`
    );
    return response.data;
  },
};

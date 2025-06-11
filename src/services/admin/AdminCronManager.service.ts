import apiInterceptor from '../../api/api.interceptor';

export interface IResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export const AdminCronManager = {
  async getAll(): Promise<ICron[]> {
    const response = await apiInterceptor.get<ICron[]>(
      `${import.meta.env.VITE_API}/cron`
    );
    return response.data;
  },

  async getSetting(id: number): Promise<ICron> {
    const response = await apiInterceptor.get<ICron>(
      `${import.meta.env.VITE_API}/cron/${id}`
    );
    return response.data;
  },

  async getStatus(jobName: string): Promise<ICron> {
    const response = await apiInterceptor.get<ICron>(
      `${import.meta.env.VITE_API}/cron/status/${jobName}`
    );
    return response.data;
  },

  async create(jobName: string, cronTime: string): Promise<ICron> {
    const response = await apiInterceptor.post<IResponse<ICron>>(
      `${import.meta.env.VITE_API}/cron`,
      { jobName, cronTime }
    );
    return response.data.data;
  },

  async update(id: number, obj: any): Promise<ICron> {
    const response = await apiInterceptor.put<IResponse<ICron>>(
      `${import.meta.env.VITE_API}/cron/${id}`,
      obj
    );
    return response.data.data;
  },

  async run(jobName: string): Promise<{ status: boolean; message: string }> {
    const response = await apiInterceptor.post<IResponse<null>>(
      `${import.meta.env.VITE_API}/cron/run/${jobName}`
    );
    return { status: response.data.status, message: response.data.message };
  },
};
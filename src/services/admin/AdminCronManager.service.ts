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

  async getOne(id: number): Promise<ICron> {
    const response = await apiInterceptor.get<ICron>(
      `${import.meta.env.VITE_API}/cron/${id}`
    );
    return response.data;
  },

  async update(id: number, obj: any): Promise<ICron> {
    const response = await apiInterceptor.put<IResponse<ICron>>(
      `${import.meta.env.VITE_API}/cron/${id}`,
      obj
    );
    return response.data.data;
  },


  async getStatus(jobName: string): Promise<ICron> {
    const response = await apiInterceptor.get<ICron>(
      `${import.meta.env.VITE_API}/cron/status/${jobName}`
    );
    return response.data;
  },

  async run(jobName: string): Promise<{ status: boolean; message: string }> {
    const response = await apiInterceptor.post<{status: boolean, message:string}>(
      `${import.meta.env.VITE_API}/cron/run/${jobName}`
    );
    return { status: response.data.status, message: response.data.message };
  },

  async runAll(): Promise<{status: boolean, message:string}> {
    const response = await apiInterceptor.post<{status: boolean, message:string}>(
      `${import.meta.env.VITE_API}/cron/allCrons`
    );
    return response.data;
  },

  async statusCron(): Promise<{status: boolean}> {
    const response = await apiInterceptor.get<{status: boolean}>(
      `${import.meta.env.VITE_API}/cron/statusCron`,
    );
    return response.data;
  },

  async getCronSettings(): Promise<ICronSettings> {
    const response = await apiInterceptor.get<ICronSettings>(
      `${import.meta.env.VITE_API}/cron-settings`
    );
    return response.data;
  },

  async changeCronSettings({ cronTime, isActive } : {cronTime: string, isActive: boolean}): Promise<ICronSettings> {
    const response = await apiInterceptor.put<ICronSettings>(
      `${import.meta.env.VITE_API}/cron-settings`,
      {cronTime,isActive}
    );
    return response.data;
  },





};
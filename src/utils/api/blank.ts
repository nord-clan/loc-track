import type { AxiosInstance } from 'axios';

///                                                                                 //
export const BlankApi = (instance: AxiosInstance) => ({
  async notImplemented(): Promise<unknown> {
    const data = await instance.get<unknown>('/');
    return data;
  }
});

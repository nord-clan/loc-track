// ? A class created to be able to cancellation requests
import type { AxiosResponse } from 'axios';
import axios from 'axios';

interface IRequestData {
  isPending: boolean;
  isResolved: boolean;
  isError: boolean;
  abortController: AbortController;
}

export class ApiProxy {
  private static requestMap = new Map<AbortController, IRequestData>();

  private static proceedRequestData = (abortController: AbortController): IRequestData => {
    const existingRequestState = this.requestMap.get(abortController);
    if (existingRequestState && existingRequestState.isPending) {
      existingRequestState.abortController.abort();
    }

    const requestData = {
      abortController,
      isError: false,
      isPending: true,
      isResolved: false
    } as IRequestData;

    this.requestMap.set(abortController, requestData);

    return requestData;
  };

  private static getSuccessCallBack = <T>(
    requestData: IRequestData
  ): ((value: AxiosResponse<T>) => T | PromiseLike<T>) => {
    return (value: AxiosResponse<T>) => {
      requestData.isPending = false;
      requestData.isResolved = true;
      return value.data;
    };
  };

  private static getErrorCallBack = <T>(
    requestData: IRequestData
  ): ((value: unknown) => T | PromiseLike<T>) => {
    return (value: unknown) => {
      requestData.isPending = false;
      requestData.isError = true;
      throw value;
    };
  };

  private static setPromiseCallbacks = <T>(
    response: Promise<AxiosResponse<T>>,
    requestData: IRequestData,
    abortController: AbortController
  ): Promise<T> => {
    return response
      .then(this.getSuccessCallBack<T>(requestData))
      .catch(this.getErrorCallBack<T>(requestData))
      .finally(() => {
        this.requestMap.delete(abortController);
      });
  };

  static post = <T, U>(abortController: AbortController, url: string, data: U): Promise<T> => {
    const requestData = this.proceedRequestData(abortController);
    return this.setPromiseCallbacks(
      axios.post<T>(url, data, {
        signal: requestData.abortController.signal
      }),
      requestData,
      abortController
    );
  };

  static get = <T, U>(abortController: AbortController, url: string, params?: U): Promise<T> => {
    const requestData = this.proceedRequestData(abortController);
    return this.setPromiseCallbacks(
      axios.get<T>(url, {
        params,
        signal: abortController.signal
      }),
      requestData,
      abortController
    );
  };

  static put = <T, U>(abortController: AbortController, url: string, data: U): Promise<T> => {
    const requestData = this.proceedRequestData(abortController);
    return this.setPromiseCallbacks(
      axios.put<T>(url, data, {
        signal: requestData.abortController.signal
      }),
      requestData,
      abortController
    );
  };

  static delete = <U>(abortController: AbortController, url: string, data: U): Promise<void> => {
    const requestData = this.proceedRequestData(abortController);
    return this.setPromiseCallbacks(
      axios.request<void>({
        url,
        method: 'DELETE',
        signal: requestData.abortController.signal,
        data
      }),
      requestData,
      abortController
    );
  };

  static abort = (abortController: AbortController): void => {
    const existingRequestState = this.requestMap.get(abortController);
    existingRequestState?.abortController.abort();
    this.requestMap.delete(abortController);
  };
}

import { useAuthStore } from '@/stores/auth';
import { generateUrl } from '@/utils/common';
import { toast } from 'react-toastify';

export interface ResponseData<T> {
  timestamp?: string;
  message?: string;
  data?: T;
  error?: string;
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  url: string;
  body?: any;
  handleResponseData?: boolean;
  showErrorMessage?: boolean;
  isMainTenant?: boolean;
}

const prefixUrl = (url: string) => {
  const origin =
    typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_API_URL;
  return url.startsWith('http') ? url : origin + url;
};

class Request {
  private static instance: Request;

  private constructor() {
    // do nothing
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Request();
    }
    return this.instance;
  }

  private transformOption(option: RequestOptions): RequestOptions {
    option.url = prefixUrl(option.url);
    if (option.isMainTenant) {
      option.headers = { ...option.headers, 'Main-Tenant-Id': process.env.NEXT_PUBLIC_MAIN_TENANT };
    }
    option.headers = this.transformHeader(option.headers as Record<string, string>);
    return option;
  }

  private transformHeader(
    headers: Record<string, string | undefined> = {},
  ): Record<string, string> {
    const { token, user } = useAuthStore.getState();
    const _headers: Record<string, string> = {
      ...headers,
      'Tenant-Id': user?.currentTenant?.tenantAlias || process.env.NEXT_PUBLIC_MAIN_TENANT,
    };
    if (token) _headers.Authorization = `Bearer ${token}`;
    else _headers['User-Id'] = 'default';
    return _headers;
  }

  private async _request<T>(option: RequestOptions): Promise<T> {
    option = this.transformOption(option);

    const response = await fetch(option.url, option);

    const contentType = response.headers.get('content-type');
    let result: ResponseData<T>;

    if (contentType?.includes('application/json')) {
      try {
        result = await response.json();
      } catch (e) {
        result = { data: null } as ResponseData<T>;
      }
    } else {
      result = { data: null } as ResponseData<T>;
    }

    return this.handleResponse(result, response.status, option);
  }

  private async handleResponse<T>(
    data: ResponseData<T>,
    statusCode: number,
    option: RequestOptions,
  ): Promise<T> {
    if (statusCode === 308) {
      return Promise.reject({ statusCode, data });
    }

    if (!statusCode.toString().startsWith('2')) {
      this.handleError(option, data, statusCode);
      return Promise.reject({ statusCode, data });
    }

    if (option.handleResponseData === false) return data as unknown as T;
    return data.data as T;
  }

  private async handleAuthError() {
    try {
      toast.error('认证失败');
      await useAuthStore.getState().logout();
    } catch (error) {
      return Promise.reject(401);
    }
  }

  private async handleError(option: RequestOptions, error: any, code?: number) {
    switch (code) {
      case 308:
        break;
      case 401:
        await this.handleAuthError();
        break;
      case 403:
        toast.error('您没有权限访问该资源');
        break;
      case 404:
        if (option?.showErrorMessage) toast.error('网络可能异常，请稍后重试');
        break;
      default:
        if (option?.showErrorMessage) toast.error(error.message || '＞﹏＜ 服务异常，请稍后重试');
        console.error(code, option.url, error);
        break;
    }
  }

  public get<T>(url: string, data?: any, option: Partial<RequestOptions> = {}): Promise<T> {
    return this._request<T>({
      ...option,
      method: 'GET',
      url: data ? generateUrl(url, data) : url,
    });
  }

  public post<T>(url: string, data?: any, option: Partial<RequestOptions> = {}): Promise<T> {
    return this._request<T>({
      ...option,
      method: 'POST',
      url,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...option.headers,
      },
    });
  }

  public patch<T>(url: string, data?: any, option: Partial<RequestOptions> = {}): Promise<T> {
    return this._request<T>({
      ...option,
      method: 'PATCH',
      url,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...option.headers,
      },
    });
  }

  public put<T>(url: string, data?: any, option: Partial<RequestOptions> = {}): Promise<T> {
    return this._request<T>({
      ...option,
      method: 'PUT',
      url,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...option.headers,
      },
    });
  }

  public delete<T>(url: string, data?: any, option: Partial<RequestOptions> = {}): Promise<T> {
    return this._request<T>({
      ...option,
      method: 'DELETE',
      url: data ? generateUrl(url, data) : url,
      headers: {
        'Content-Type': 'application/json',
        ...option.headers,
      },
      redirect: 'manual',
    });
  }

  public async upload<T>(
    url: string,
    file: File,
    option: Partial<RequestOptions> = {},
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    return this._request<T>({
      ...option,
      method: 'POST',
      url: prefixUrl(url),
      body: formData,
    });
  }

  public async download(
    url: string,
    data?: any,
    option: Partial<RequestOptions> = {},
  ): Promise<void> {
    let downloadUrl = prefixUrl(url);
    if (data) {
      downloadUrl = generateUrl(downloadUrl, data);
    }

    const response = await fetch(downloadUrl, {
      ...option,
      method: 'GET',
      headers: this.transformHeader(option.headers as Record<string, string>),
    });

    const blob = await response.blob();
    const downloadLink = document.createElement('a');
    const urlBlob = window.URL.createObjectURL(blob);
    downloadLink.href = urlBlob;
    downloadLink.download = 'download';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    window.URL.revokeObjectURL(urlBlob);
    document.body.removeChild(downloadLink);
  }
}

export default Request.getInstance();

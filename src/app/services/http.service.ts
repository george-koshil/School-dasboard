const BASE_URL = process.env.API_BASE_URL ?? 'https://digital-school-server.netlify.app/.netlify/functions/api'

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export class HttpClient {
  public baseUrl: string;
  public headers: HeadersInit | undefined

  constructor(baseUrl: string, headers?: HeadersInit) {
    this.baseUrl = baseUrl;
    this.headers = headers ?? {}
  }

  async request<T>(url: string, options?: RequestInit): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(this.baseUrl + url, { headers: { 'Content-Type': 'application/json', ...this.headers }, mode: 'no-cors', ...options});
    response.parsedBody = await response.json();
    return response;
  }

  async get<T>(url: string, options?: RequestInit): Promise<HttpResponse<T>> {
    return await this.request<T>(url, { ...options, method: 'GET' });
  }

  async post<T>(url: string, body: any, options?: RequestInit): Promise<HttpResponse<T>> {
    return await this.request<T>(url, { ...options, method: 'POST', body: JSON.stringify(body) });
  }

  async put<T>(url: string, body: any, options?: RequestInit): Promise<HttpResponse<T>> {
    return await this.request<T>(url, { ...options, method: 'PUT', body: JSON.stringify(body) });
  }

  async delete<T>(url: string, options?: RequestInit): Promise<HttpResponse<T>> {
    return await this.request<T>(url, { ...options, method: 'DELETE' });
  }
}

export const http = new HttpClient(BASE_URL)
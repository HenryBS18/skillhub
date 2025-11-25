import { env } from "./env"
export class Api {
  private baseUrl: string
  private prefix: string

  constructor(prefix?: string) {
    this.baseUrl = typeof window === 'undefined' ? env.API_BASE_INTERNAL_URL : env.API_BASE_URL
    this.prefix = prefix ?? ''
  }

  public async post(endpoint: string, data?: Object): Promise<Response> {
    try {
      return await fetch(this.parseUrl(endpoint), {
        method: 'POST',
        headers: this.parseHeaders(),
        body: data ? JSON.stringify(data) : null,
      })
    } catch (error) {
      throw error
    }
  }

  public async get(endpoint: string): Promise<Response> {
    try {
      return await fetch(this.parseUrl(endpoint), {
        method: "GET",
        headers: this.parseHeaders(),
      })
    } catch (error) {
      throw error
    }
  }

  public async patch(endpoint: string, data?: Object): Promise<Response> {
    try {
      return await fetch(this.parseUrl(endpoint), {
        method: 'PATCH',
        headers: this.parseHeaders(),
        body: data ? JSON.stringify(data) : null,
      })
    } catch (error) {
      throw error
    }
  }

  public async delete(endpoint: string): Promise<Response> {
    try {
      return await fetch(this.parseUrl(endpoint), {
        method: "DELETE",
        headers: this.parseHeaders(),
      })
    } catch (error) {
      throw error
    }
  }

  private parseUrl(endpoint: string): string {
    try {
      return `${this.baseUrl}${this.prefix}${endpoint}`
    } catch (error) {
      throw error
    }
  }

  private parseHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
    }
  }
}
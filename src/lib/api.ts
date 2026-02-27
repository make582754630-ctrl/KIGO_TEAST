// API服务层

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

// 基础API客户端
class ApiClient {
  private baseURL: string
  private headers: HeadersInit

  constructor() {
    this.baseURL = API_BASE_URL
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  // 设置认证token
  setAuthToken(token: string) {
    this.headers = {
      ...this.headers,
      'Authorization': `Bearer ${token}`,
    }
  }

  // 移除认证token
  removeAuthToken() {
    delete this.headers['Authorization']
  }

  // GET请求
  async get<T>(endpoint: string, params?: Record<string, string>) {
    const url = new URL(`${this.baseURL}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.headers,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json() as Promise<T>
  }

  // POST请求
  async post<T>(endpoint: string, data?: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json() as Promise<T>
  }

  // PUT请求
  async put<T>(endpoint: string, data?: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json() as Promise<T>
  }

  // DELETE请求
  async delete<T>(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.headers,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json() as Promise<T>
  }
}

// 创建API客户端实例
const apiClient = new ApiClient()

// 导出API服务
export const api = {
  // 认证相关
  auth: {
    login: (credentials: { email: string; password: string }) => 
      apiClient.post<{ token: string; user: any }>('/auth/login', credentials),
    register: (userData: { name: string; email: string; password: string }) => 
      apiClient.post<{ token: string; user: any }>('/auth/register', userData),
    me: () => 
      apiClient.get<{ user: any }>('/auth/me'),
  },

  // 产品相关
  products: {
    getAll: (params?: { category?: string; page?: number; limit?: number }) => 
      apiClient.get<any[]>('/products', params),
    getById: (id: string) => 
      apiClient.get<any>(`/products/${id}`),
    search: (query: string) => 
      apiClient.get<any[]>('/products/search', { q: query }),
  },

  // 分类相关
  categories: {
    getAll: () => 
      apiClient.get<any[]>('/categories'),
  },

  // 购物车相关
  cart: {
    get: () => 
      apiClient.get<any[]>('/cart'),
    add: (productId: string, quantity: number) => 
      apiClient.post('/cart', { productId, quantity }),
    update: (itemId: string, quantity: number) => 
      apiClient.put(`/cart/${itemId}`, { quantity }),
    remove: (itemId: string) => 
      apiClient.delete(`/cart/${itemId}`),
  },

  // 订单相关
  orders: {
    create: (orderData: any) => 
      apiClient.post('/orders', orderData),
    getById: (id: string) => 
      apiClient.get<any>(`/orders/${id}`),
    getMyOrders: () => 
      apiClient.get<any[]>('/orders/my'),
  },

  // 支付相关
  payment: {
    createIntent: (orderId: string) => 
      apiClient.post<{ clientSecret: string }>(`/payment/intent`, { orderId }),
  },

  // 物流相关
  shipping: {
    calculate: (params: { origin: string; destination: string; weight: number; dimensions: { length: number; width: number; height: number } }) => 
      apiClient.post<{ cost: number; estimatedDays: number }>('/shipping/calculate', params),
  },
}

// 导出API客户端实例
export { apiClient }

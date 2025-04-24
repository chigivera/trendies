// Fonction utilitaire pour les appels API
export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
  const url = `${baseUrl}${endpoint}`

  const defaultHeaders = {
    "Content-Type": "application/json",
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `API request failed with status ${response.status}`)
  }

  return response.json()
}

// Fonctions pour les commandes
export const ordersApi = {
  getAll: async (params: { page?: number; limit?: number; status?: string } = {}) => {
    const searchParams = new URLSearchParams()
    if (params.page) searchParams.append("page", params.page.toString())
    if (params.limit) searchParams.append("limit", params.limit.toString())
    if (params.status) searchParams.append("status", params.status)

    return fetchApi(`/orders?${searchParams.toString()}`)
  },

  getById: async (id: number) => {
    return fetchApi(`/orders/${id}`)
  },

  create: async (data: any) => {
    return fetchApi("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  update: async (id: number, data: any) => {
    return fetchApi(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  delete: async (id: number) => {
    return fetchApi(`/orders/${id}`, {
      method: "DELETE",
    })
  },
}

// Fonctions pour les clients
export const customersApi = {
  getAll: async (params: { page?: number; limit?: number; search?: string } = {}) => {
    const searchParams = new URLSearchParams()
    if (params.page) searchParams.append("page", params.page.toString())
    if (params.limit) searchParams.append("limit", params.limit.toString())
    if (params.search) searchParams.append("search", params.search)

    return fetchApi(`/customers?${searchParams.toString()}`)
  },

  getById: async (id: number) => {
    return fetchApi(`/customers/${id}`)
  },

  create: async (data: any) => {
    return fetchApi("/customers", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  update: async (id: number, data: any) => {
    return fetchApi(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  delete: async (id: number) => {
    return fetchApi(`/customers/${id}`, {
      method: "DELETE",
    })
  },
}

// Fonctions pour les produits
export const productsApi = {
  getAll: async (params: { page?: number; limit?: number; search?: string; category?: string } = {}) => {
    const searchParams = new URLSearchParams()
    if (params.page) searchParams.append("page", params.page.toString())
    if (params.limit) searchParams.append("limit", params.limit.toString())
    if (params.search) searchParams.append("search", params.search)
    if (params.category) searchParams.append("category", params.category)

    return fetchApi(`/products?${searchParams.toString()}`)
  },

  getById: async (id: number) => {
    return fetchApi(`/products/${id}`)
  },

  create: async (data: any) => {
    return fetchApi("/products", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  update: async (id: number, data: any) => {
    return fetchApi(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  delete: async (id: number) => {
    return fetchApi(`/products/${id}`, {
      method: "DELETE",
    })
  },
}

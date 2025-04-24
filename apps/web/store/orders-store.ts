import { create } from "zustand"
import { ordersApi } from "@/lib/api"

interface Order {
  id: number
  orderNumber: string
  status: string
  total: number
  customer: {
    name: string
  }
  createdAt: string
  items: Array<{
    id: number
    quantity: number
    price: number
    product: {
      id: number
      name: string
    }
  }>
}

interface OrdersState {
  orders: Order[]
  currentOrder: Order | null
  isLoading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }

  // Actions
  fetchOrders: (params?: { page?: number; limit?: number; status?: string }) => Promise<void>
  fetchOrderById: (id: number) => Promise<void>
  createOrder: (data: any) => Promise<void>
  updateOrder: (id: number, data: any) => Promise<void>
  deleteOrder: (id: number) => Promise<void>
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  fetchOrders: async (params = {}) => {
    try {
      set({ isLoading: true, error: null })

      const { page, limit } = get().pagination
      const response = await ordersApi.getAll({
        page: params.page || page,
        limit: params.limit || limit,
        status: params.status,
      })

      set({
        orders: response.data,
        pagination: {
          ...get().pagination,
          page: response.meta.page,
          limit: response.meta.limit,
          total: response.meta.total,
          totalPages: response.meta.totalPages,
        },
        isLoading: false,
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Une erreur est survenue",
      })
    }
  },

  fetchOrderById: async (id) => {
    try {
      set({ isLoading: true, error: null })

      const order = await ordersApi.getById(id)

      set({
        currentOrder: order,
        isLoading: false,
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Une erreur est survenue",
      })
    }
  },

  createOrder: async (data) => {
    try {
      set({ isLoading: true, error: null })

      await ordersApi.create(data)

      // Rafraîchir la liste des commandes
      await get().fetchOrders()

      set({ isLoading: false })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Une erreur est survenue",
      })
    }
  },

  updateOrder: async (id, data) => {
    try {
      set({ isLoading: true, error: null })

      await ordersApi.update(id, data)

      // Rafraîchir la commande courante et la liste
      if (get().currentOrder?.id === id) {
        await get().fetchOrderById(id)
      }
      await get().fetchOrders()

      set({ isLoading: false })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Une erreur est survenue",
      })
    }
  },

  deleteOrder: async (id) => {
    try {
      set({ isLoading: true, error: null })

      await ordersApi.delete(id)

      // Rafraîchir la liste des commandes
      await get().fetchOrders()

      set({ isLoading: false })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Une erreur est survenue",
      })
    }
  },

  setPage: (page) => {
    set({
      pagination: {
        ...get().pagination,
        page,
      },
    })
    get().fetchOrders({ page })
  },

  setLimit: (limit) => {
    set({
      pagination: {
        ...get().pagination,
        limit,
        page: 1, // Réinitialiser à la première page
      },
    })
    get().fetchOrders({ limit, page: 1 })
  },
}))

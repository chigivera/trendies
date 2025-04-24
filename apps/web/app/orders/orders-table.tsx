"use client"

import { Table, Badge, ActionIcon, Menu, Group, Text, Select } from "@mantine/core"
import { useState } from "react"
import Link from "next/link"
import { Edit, MoreHorizontal, Eye, Trash, Filter } from "lucide-react"

// Types pour les commandes
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

interface Order {
  id: number
  orderNumber: string
  customer: string
  date: string
  total: number
  status: OrderStatus
  items: number
}

// Fonction pour simuler le chargement des commandes depuis l'API
const getOrders = (page: number, limit: number, status?: string): Order[] => {
  // Ceci serait normalement un appel API
  return Array.from({ length: limit }, (_, i) => {
    const id = (page - 1) * limit + i + 1
    const statuses: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"]
    const randomStatus = status ? (status as OrderStatus) : statuses[Math.floor(Math.random() * statuses.length)]

    return {
      id,
      orderNumber: `ORD-${1000 + id}`,
      customer: `Client ${id}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      total: Math.round(Math.random() * 1000 * 100) / 100,
      status: randomStatus,
      items: Math.floor(Math.random() * 10) + 1,
    }
  })
}

// Composant pour afficher le statut avec une couleur appropriée
const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusConfig = {
    pending: { color: "yellow", label: "En attente" },
    processing: { color: "blue", label: "En cours" },
    shipped: { color: "cyan", label: "Expédiée" },
    delivered: { color: "green", label: "Livrée" },
    cancelled: { color: "red", label: "Annulée" },
  }

  const config = statusConfig[status]
  return <Badge color={config.color}>{config.label}</Badge>
}

export function OrdersTable({
  page,
  limit,
  status,
}: {
  page: number
  limit: number
  status?: string
}) {
  const [selectedStatus, setSelectedStatus] = useState(status || "")
  const orders = getOrders(page, limit, selectedStatus)

  return (
    <div>
      <div className="p-4 border-b">
        <Group>
          <Select
            placeholder="Filtrer par statut"
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value || "")}
            leftSection={<Filter size={16} />}
            clearable
            data={[
              { value: "", label: "Tous les statuts" },
              { value: "pending", label: "En attente" },
              { value: "processing", label: "En cours" },
              { value: "shipped", label: "Expédiée" },
              { value: "delivered", label: "Livrée" },
              { value: "cancelled", label: "Annulée" },
            ]}
            className="w-60"
          />
        </Group>
      </div>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>N° Commande</Table.Th>
            <Table.Th>Client</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Articles</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th>Statut</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {orders.map((order) => (
            <Table.Tr key={order.id}>
              <Table.Td>
                <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                  {order.orderNumber}
                </Link>
              </Table.Td>
              <Table.Td>{order.customer}</Table.Td>
              <Table.Td>{order.date}</Table.Td>
              <Table.Td>{order.items}</Table.Td>
              <Table.Td>{order.total.toFixed(2)} €</Table.Td>
              <Table.Td>
                <StatusBadge status={order.status} />
              </Table.Td>
              <Table.Td>
                <Menu position="bottom-end" withArrow>
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <MoreHorizontal size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<Eye size={16} />}>
                      <Link href={`/orders/${order.id}`}>Voir les détails</Link>
                    </Menu.Item>
                    <Menu.Item leftSection={<Edit size={16} />}>
                      <Link href={`/orders/${order.id}/edit`}>Modifier</Link>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item leftSection={<Trash size={16} />} color="red">
                      Supprimer
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {orders.length === 0 && (
        <div className="p-8 text-center">
          <Text c="dimmed">Aucune commande trouvée</Text>
        </div>
      )}
    </div>
  )
}

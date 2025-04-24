"use client"

import { Table, ActionIcon, Menu, Badge, Text } from "@mantine/core"
import Link from "next/link"
import { Edit, MoreHorizontal, Eye, Trash, Mail } from "lucide-react"

// Types pour les clients
interface Customer {
  id: number
  name: string
  email: string
  phone: string
  ordersCount: number
  totalSpent: number
  status: "active" | "inactive"
}

// Fonction pour simuler le chargement des clients depuis l'API
const getCustomers = (page: number, limit: number, search?: string): Customer[] => {
  // Ceci serait normalement un appel API
  return Array.from({ length: limit }, (_, i) => {
    const id = (page - 1) * limit + i + 1
    const name = `Client ${id}`

    // Filtrer par recherche si nécessaire
    if (search && !name.toLowerCase().includes(search.toLowerCase())) {
      return null
    }

    return {
      id,
      name,
      email: `client${id}@example.com`,
      phone: `06 ${Math.floor(10000000 + Math.random() * 90000000)}`,
      ordersCount: Math.floor(Math.random() * 10),
      totalSpent: Math.round(Math.random() * 1000 * 100) / 100,
      status: Math.random() > 0.2 ? "active" : "inactive",
    }
  }).filter(Boolean) as Customer[]
}

export function CustomersTable({
  page,
  limit,
  search,
}: {
  page: number
  limit: number
  search?: string
}) {
  const customers = getCustomers(page, limit, search)

  return (
    <div>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nom</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Téléphone</Table.Th>
            <Table.Th>Commandes</Table.Th>
            <Table.Th>Total dépensé</Table.Th>
            <Table.Th>Statut</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {customers.map((customer) => (
            <Table.Tr key={customer.id}>
              <Table.Td>
                <Link href={`/customers/${customer.id}`} className="text-blue-600 hover:underline">
                  {customer.name}
                </Link>
              </Table.Td>
              <Table.Td>{customer.email}</Table.Td>
              <Table.Td>{customer.phone}</Table.Td>
              <Table.Td>{customer.ordersCount}</Table.Td>
              <Table.Td>{customer.totalSpent.toFixed(2)} €</Table.Td>
              <Table.Td>
                <Badge color={customer.status === "active" ? "green" : "gray"}>
                  {customer.status === "active" ? "Actif" : "Inactif"}
                </Badge>
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
                      <Link href={`/customers/${customer.id}`}>Voir les détails</Link>
                    </Menu.Item>
                    <Menu.Item leftSection={<Edit size={16} />}>
                      <Link href={`/customers/${customer.id}/edit`}>Modifier</Link>
                    </Menu.Item>
                    <Menu.Item leftSection={<Mail size={16} />}>Envoyer un email</Menu.Item>
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

      {customers.length === 0 && (
        <div className="p-8 text-center">
          <Text c="dimmed">Aucun client trouvé</Text>
        </div>
      )}
    </div>
  )
}

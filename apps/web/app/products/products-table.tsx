"use client"

import { Table, ActionIcon, Menu, Badge, Text, Image } from "@mantine/core"
import Link from "next/link"
import { Edit, MoreHorizontal, Eye, Trash, Tag } from "lucide-react"

// Types pour les produits
interface Product {
  id: number
  name: string
  sku: string
  price: number
  stock: number
  category: string
  image: string
}

// Fonction pour simuler le chargement des produits depuis l'API
const getProducts = (page: number, limit: number, search?: string, category?: string): Product[] => {
  // Ceci serait normalement un appel API
  const categories = ["electronics", "clothing", "books", "home"]

  return Array.from({ length: limit }, (_, i) => {
    const id = (page - 1) * limit + i + 1
    const name = `Produit ${id}`
    const productCategory = categories[id % categories.length]

    // Filtrer par recherche et catégorie si nécessaire
    if ((search && !name.toLowerCase().includes(search.toLowerCase())) || (category && category !== productCategory)) {
      return null
    }

    return {
      id,
      name,
      sku: `SKU-${1000 + id}`,
      price: Math.round(Math.random() * 100 * 100) / 100,
      stock: Math.floor(Math.random() * 100),
      category: productCategory,
      image: `/placeholder.svg?height=40&width=40`,
    }
  }).filter(Boolean) as Product[]
}

// Fonction pour obtenir le libellé et la couleur de la catégorie
const getCategoryInfo = (category: string) => {
  const categoryMap: Record<string, { label: string; color: string }> = {
    electronics: { label: "Électronique", color: "blue" },
    clothing: { label: "Vêtements", color: "green" },
    books: { label: "Livres", color: "yellow" },
    home: { label: "Maison", color: "purple" },
  }

  return categoryMap[category] || { label: category, color: "gray" }
}

export function ProductsTable({
  page,
  limit,
  search,
  category,
}: {
  page: number
  limit: number
  search?: string
  category?: string
}) {
  const products = getProducts(page, limit, search, category)

  return (
    <div>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Nom</Table.Th>
            <Table.Th>SKU</Table.Th>
            <Table.Th>Prix</Table.Th>
            <Table.Th>Stock</Table.Th>
            <Table.Th>Catégorie</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {products.map((product) => {
            const categoryInfo = getCategoryInfo(product.category)

            return (
              <Table.Tr key={product.id}>
                <Table.Td>
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} width={40} height={40} />
                </Table.Td>
                <Table.Td>
                  <Link href={`/products/${product.id}`} className="text-blue-600 hover:underline">
                    {product.name}
                  </Link>
                </Table.Td>
                <Table.Td>{product.sku}</Table.Td>
                <Table.Td>{product.price.toFixed(2)} €</Table.Td>
                <Table.Td>
                  <Badge color={product.stock > 10 ? "green" : product.stock > 0 ? "yellow" : "red"}>
                    {product.stock}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={categoryInfo.color}>{categoryInfo.label}</Badge>
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
                        <Link href={`/products/${product.id}`}>Voir les détails</Link>
                      </Menu.Item>
                      <Menu.Item leftSection={<Edit size={16} />}>
                        <Link href={`/products/${product.id}/edit`}>Modifier</Link>
                      </Menu.Item>
                      <Menu.Item leftSection={<Tag size={16} />}>Ajuster le prix</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item leftSection={<Trash size={16} />} color="red">
                        Supprimer
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            )
          })}
        </Table.Tbody>
      </Table>

      {products.length === 0 && (
        <div className="p-8 text-center">
          <Text c="dimmed">Aucun produit trouvé</Text>
        </div>
      )}
    </div>
  )
}

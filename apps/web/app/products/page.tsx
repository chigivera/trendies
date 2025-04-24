import { Suspense } from "react"
import { Title, Button, Group, Skeleton, TextInput, Select } from "@mantine/core"
import Link from "next/link"
import { Plus, Search, Filter } from "lucide-react"
import { ProductsTable } from "./products-table"
import { ProductsPagination } from "./products-pagination"

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; search?: string; category?: string }
}) {
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const search = searchParams.search || ""
  const category = searchParams.category || ""

  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Gestion des Produits</Title>
        <Link href="/products/create" passHref>
          <Button leftSection={<Plus size={16} />} component="a">
            Nouveau Produit
          </Button>
        </Link>
      </Group>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <form>
            <Group>
              <TextInput
                placeholder="Rechercher un produit..."
                leftSection={<Search size={16} />}
                defaultValue={search}
                name="search"
                className="flex-1"
              />
              <Select
                placeholder="Catégorie"
                leftSection={<Filter size={16} />}
                defaultValue={category}
                name="category"
                clearable
                data={[
                  { value: "", label: "Toutes les catégories" },
                  { value: "electronics", label: "Électronique" },
                  { value: "clothing", label: "Vêtements" },
                  { value: "books", label: "Livres" },
                  { value: "home", label: "Maison" },
                ]}
                className="w-60"
              />
              <Button type="submit">Filtrer</Button>
            </Group>
          </form>
        </div>

        <Suspense fallback={<Skeleton height={400} />}>
          <ProductsTable page={page} limit={limit} search={search} category={category} />
        </Suspense>

        <div className="p-4 border-t">
          <ProductsPagination
            page={page}
            limit={limit}
            total={100} // Ce serait normalement récupéré depuis l'API
          />
        </div>
      </div>
    </div>
  )
}

import { Suspense } from "react"
import { Title, Button, Group, Skeleton, TextInput } from "@mantine/core"
import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { CustomersTable } from "./customers-table"
import { CustomersPagination } from "./customers-pagination"

export default function CustomersPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; search?: string }
}) {
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const search = searchParams.search || ""

  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Gestion des Clients</Title>
        <Link href="/customers/create" passHref>
          <Button leftSection={<Plus size={16} />} component="a">
            Nouveau Client
          </Button>
        </Link>
      </Group>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <form>
            <TextInput
              placeholder="Rechercher un client..."
              leftSection={<Search size={16} />}
              defaultValue={search}
              name="search"
              className="max-w-md"
            />
          </form>
        </div>

        <Suspense fallback={<Skeleton height={400} />}>
          <CustomersTable page={page} limit={limit} search={search} />
        </Suspense>

        <div className="p-4 border-t">
          <CustomersPagination
            page={page}
            limit={limit}
            total={100} // Ce serait normalement récupéré depuis l'API
          />
        </div>
      </div>
    </div>
  )
}

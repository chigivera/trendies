import { Suspense } from "react"
import { Title, Button, Group, Skeleton } from "@mantine/core"
import Link from "next/link"
import { Plus } from "lucide-react"
import { OrdersTable } from "./orders-table"
import { OrdersPagination } from "./orders-pagination"

export default function OrdersPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; status?: string }
}) {
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const status = searchParams.status || ""

  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Gestion des Commandes</Title>
        <Link href="/orders/create" passHref>
          <Button leftSection={<Plus size={16} />} component="a">
            Nouvelle Commande
          </Button>
        </Link>
      </Group>

      <div className="bg-white rounded-lg shadow">
        <Suspense fallback={<Skeleton height={400} />}>
          <OrdersTable page={page} limit={limit} status={status} />
        </Suspense>

        <div className="p-4 border-t">
          <OrdersPagination
            page={page}
            limit={limit}
            total={100} // Ce serait normalement récupéré depuis l'API
          />
        </div>
      </div>
    </div>
  )
}

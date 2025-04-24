"use client"

import { Pagination, Select, Group, Text } from "@mantine/core"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

interface CustomersPaginationProps {
  page: number
  limit: number
  total: number
}

export function CustomersPagination({ page, limit, total }: CustomersPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(total / limit)

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleLimitChange = (newLimit: string | null) => {
    if (!newLimit) return

    const params = new URLSearchParams(searchParams)
    params.set("page", "1") // Reset to page 1 when changing limit
    params.set("limit", newLimit)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Group justify="space-between">
      <Text size="sm" c="dimmed">
        Affichage de {Math.min((page - 1) * limit + 1, total)} à {Math.min(page * limit, total)} sur {total} clients
      </Text>

      <Group>
        <Select
          value={limit.toString()}
          onChange={handleLimitChange}
          data={["5", "10", "25", "50", "100"].map((value) => ({ value, label: `${value} par page` }))}
          size="xs"
          className="w-40"
        />

        <Pagination value={page} onChange={handlePageChange} total={totalPages} siblings={1} boundaries={1} />
      </Group>
    </Group>
  )
}

import { Card, SimpleGrid, Text, Title, Group } from "@mantine/core"
import { ShoppingCart, Users, Package, AlertCircle, TrendingUp } from "lucide-react"

export default function Dashboard() {
  // Ces données seraient normalement chargées depuis l'API
  const stats = [
    { title: "Commandes totales", value: "156", icon: <ShoppingCart size={24} />, color: "blue" },
    { title: "Commandes en attente", value: "24", icon: <AlertCircle size={24} />, color: "yellow" },
    { title: "Clients", value: "78", icon: <Users size={24} />, color: "green" },
    { title: "Produits", value: "214", icon: <Package size={24} />, color: "purple" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <Title order={2} className="mb-6">
          Tableau de bord
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
          {stats.map((stat, index) => (
            <Card key={index} withBorder padding="lg" radius="md">
              <Group justify="space-between">
                <div>
                  <Text size="xs" c="dimmed" className="font-medium">
                    {stat.title}
                  </Text>
                  <Text size="xl" className="font-bold mt-1">
                    {stat.value}
                  </Text>
                </div>
                <div className={`text-${stat.color}-500`}>{stat.icon}</div>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card withBorder padding="lg" radius="md">
          <Title order={3} className="mb-4">
            Commandes récentes
          </Title>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-3 border rounded flex justify-between items-center">
                <div>
                  <Text className="font-medium">Commande #{1000 + i}</Text>
                  <Text size="sm" c="dimmed">
                    Client: Jean Dupont
                  </Text>
                </div>
                <div>
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">En cours</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card withBorder padding="lg" radius="md">
          <Group justify="space-between" className="mb-4">
            <Title order={3}>Activité récente</Title>
            <TrendingUp size={20} className="text-green-500" />
          </Group>
          <div className="space-y-3">
            {[
              { action: "Nouvelle commande créée", time: "Il y a 5 minutes" },
              { action: "Statut de commande mis à jour", time: "Il y a 1 heure" },
              { action: "Nouveau client ajouté", time: "Il y a 3 heures" },
              { action: "Produit mis à jour", time: "Il y a 5 heures" },
              { action: "Commande expédiée", time: "Il y a 1 jour" },
            ].map((activity, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-2">
                <Text size="sm">{activity.action}</Text>
                <Text size="xs" c="dimmed">
                  {activity.time}
                </Text>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

import { Suspense } from "react"
import { Title, Group, Button, Card, Grid, Text, Badge, Skeleton, Divider } from "@mantine/core"
import Link from "next/link"
import { ArrowLeft, Edit, Printer } from "lucide-react"

// Fonction pour simuler le chargement des détails d'une commande
async function getOrderDetails(id: string) {
  // Simuler un délai de chargement
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Ceci serait normalement un appel API
  return {
    id: Number.parseInt(id),
    orderNumber: `ORD-${1000 + Number.parseInt(id)}`,
    date: new Date().toLocaleDateString(),
    status: "processing",
    customer: {
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      phone: "06 12 34 56 78",
      address: "123 Rue de Paris, 75001 Paris, France",
    },
    items: [
      { id: 1, name: "Produit A", quantity: 2, price: 29.99 },
      { id: 2, name: "Produit B", quantity: 1, price: 49.99 },
      { id: 3, name: "Produit C", quantity: 3, price: 19.99 },
    ],
    shipping: 9.99,
    tax: 21.99,
    total: 199.92,
    notes: "Livraison à effectuer en après-midi uniquement.",
  }
}

// Composant pour afficher les détails de la commande
function OrderDetails({ id }: { id: string }) {
  const order = getOrderDetails(id)

  const statusColors = {
    pending: "yellow",
    processing: "blue",
    shipped: "cyan",
    delivered: "green",
    cancelled: "red",
  }

  const statusLabels = {
    pending: "En attente",
    processing: "En cours",
    shipped: "Expédiée",
    delivered: "Livrée",
    cancelled: "Annulée",
  }

  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <div>
          <Title order={2}>Commande #{order.orderNumber}</Title>
          <Text c="dimmed">Créée le {order.date}</Text>
        </div>
        <Group>
          <Link href={`/orders/${id}/edit`} passHref>
            <Button leftSection={<Edit size={16} />} variant="outline" component="a">
              Modifier
            </Button>
          </Link>
          <Button leftSection={<Printer size={16} />} variant="outline">
            Imprimer
          </Button>
        </Group>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder padding="lg" radius="md">
            <Title order={3} className="mb-4">
              Détails de la commande
            </Title>

            <div className="mb-4">
              <Badge color={statusColors[order.status as keyof typeof statusColors]} size="lg">
                {statusLabels[order.status as keyof typeof statusLabels]}
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left border-b">Produit</th>
                    <th className="p-3 text-center border-b">Quantité</th>
                    <th className="p-3 text-right border-b">Prix unitaire</th>
                    <th className="p-3 text-right border-b">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-right">{item.price.toFixed(2)} €</td>
                      <td className="p-3 text-right">{(item.quantity * item.price).toFixed(2)} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <Text>Sous-total</Text>
                <Text>{(order.total - order.shipping - order.tax).toFixed(2)} €</Text>
              </div>
              <div className="flex justify-between">
                <Text>Frais de livraison</Text>
                <Text>{order.shipping.toFixed(2)} €</Text>
              </div>
              <div className="flex justify-between">
                <Text>TVA</Text>
                <Text>{order.tax.toFixed(2)} €</Text>
              </div>
              <Divider my="sm" />
              <div className="flex justify-between font-bold">
                <Text>Total</Text>
                <Text>{order.total.toFixed(2)} €</Text>
              </div>
            </div>

            {order.notes && (
              <div className="mt-6">
                <Title order={4} className="mb-2">
                  Notes
                </Title>
                <Text className="p-3 bg-gray-50 rounded">{order.notes}</Text>
              </div>
            )}
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder padding="lg" radius="md">
            <Title order={3} className="mb-4">
              Informations client
            </Title>
            <div className="space-y-4">
              <div>
                <Text className="font-medium">Nom</Text>
                <Text>{order.customer.name}</Text>
              </div>
              <div>
                <Text className="font-medium">Email</Text>
                <Text>{order.customer.email}</Text>
              </div>
              <div>
                <Text className="font-medium">Téléphone</Text>
                <Text>{order.customer.phone}</Text>
              </div>
              <div>
                <Text className="font-medium">Adresse de livraison</Text>
                <Text>{order.customer.address}</Text>
              </div>
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <Link href="/orders" className="inline-flex items-center text-blue-600 hover:underline">
        <ArrowLeft size={16} className="mr-1" /> Retour aux commandes
      </Link>

      <Suspense fallback={<Skeleton height={600} />}>
        <OrderDetails id={params.id} />
      </Suspense>
    </div>
  )
}

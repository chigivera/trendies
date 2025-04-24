"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Title,
  Button,
  Card,
  TextInput,
  Grid,
  Textarea,
  Select,
  NumberInput,
  Group,
  Text,
  ActionIcon,
  Divider,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { ArrowLeft, Plus, Trash } from "lucide-react"

interface OrderFormValues {
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  status: string
  items: {
    productId: string
    name: string
    quantity: number
    price: number
  }[]
  notes: string
}

export default function CreateOrderPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Liste simulée de produits
  const products = [
    { value: "1", label: "Produit A", price: 29.99 },
    { value: "2", label: "Produit B", price: 49.99 },
    { value: "3", label: "Produit C", price: 19.99 },
    { value: "4", label: "Produit D", price: 39.99 },
    { value: "5", label: "Produit E", price: 59.99 },
  ]

  const form = useForm<OrderFormValues>({
    initialValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerAddress: "",
      status: "pending",
      items: [{ productId: "", name: "", quantity: 1, price: 0 }],
      notes: "",
    },
    validate: {
      customerName: (value) => (value ? null : "Le nom du client est requis"),
      customerEmail: (value) => (/^\S+@\S+$/.test(value) ? null : "Email invalide"),
      items: {
        productId: (value) => (value ? null : "Veuillez sélectionner un produit"),
        quantity: (value) => (value > 0 ? null : "La quantité doit être supérieure à 0"),
      },
    },
  })

  const handleProductChange = (productId: string, index: number) => {
    const product = products.find((p) => p.value === productId)
    if (product) {
      form.setFieldValue(`items.${index}.name`, product.label)
      form.setFieldValue(`items.${index}.price`, product.price)
    }
  }

  const addItem = () => {
    form.insertListItem("items", { productId: "", name: "", quantity: 1, price: 0 })
  }

  const removeItem = (index: number) => {
    if (form.values.items.length > 1) {
      form.removeListItem("items", index)
    }
  }

  const calculateSubtotal = () => {
    return form.values.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const shipping = 9.99
    const tax = subtotal * 0.2 // TVA
    return subtotal + shipping + tax
  }

  const handleSubmit = async (values: OrderFormValues) => {
    setIsSubmitting(true)

    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Commande créée:", values)

      notifications.show({
        title: "Commande créée",
        message: "La commande a été créée avec succès",
        color: "green",
      })

      router.push("/orders")
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error)

      notifications.show({
        title: "Erreur",
        message: "Une erreur est survenue lors de la création de la commande",
        color: "red",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/orders" className="inline-flex items-center text-blue-600 hover:underline">
        <ArrowLeft size={16} className="mr-1" /> Retour aux commandes
      </Link>

      <Title order={2}>Créer une nouvelle commande</Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card withBorder padding="lg" radius="md" className="mb-6">
              <Title order={3} className="mb-4">
                Produits
              </Title>

              {form.values.items.map((item, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <Group position="apart" className="mb-2">
                    <Text weight={500}>Produit {index + 1}</Text>
                    <ActionIcon color="red" onClick={() => removeItem(index)} disabled={form.values.items.length === 1}>
                      <Trash size={16} />
                    </ActionIcon>
                  </Group>

                  <Grid>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Select
                        label="Produit"
                        placeholder="Sélectionner un produit"
                        data={products}
                        value={item.productId}
                        onChange={(value) => {
                          form.setFieldValue(`items.${index}.productId`, value || "")
                          if (value) handleProductChange(value, index)
                        }}
                        error={form.errors?.[`items.${index}.productId`]}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 3 }}>
                      <NumberInput
                        label="Quantité"
                        min={1}
                        {...form.getInputProps(`items.${index}.quantity`)}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 3 }}>
                      <NumberInput
                        label="Prix unitaire (€)"
                        decimalScale={2}
                        step={0.01}
                        min={0}
                        {...form.getInputProps(`items.${index}.price`)}
                        readOnly
                      />
                    </Grid.Col>
                  </Grid>
                </div>
              ))}

              <Button leftSection={<Plus size={16} />} variant="outline" onClick={addItem} className="mt-2">
                Ajouter un produit
              </Button>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <Text>Sous-total</Text>
                  <Text>{calculateSubtotal().toFixed(2)} €</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Frais de livraison</Text>
                  <Text>9.99 €</Text>
                </div>
                <div className="flex justify-between">
                  <Text>TVA (20%)</Text>
                  <Text>{(calculateSubtotal() * 0.2).toFixed(2)} €</Text>
                </div>
                <Divider my="sm" />
                <div className="flex justify-between font-bold">
                  <Text>Total</Text>
                  <Text>{calculateTotal().toFixed(2)} €</Text>
                </div>
              </div>
            </Card>

            <Card withBorder padding="lg" radius="md">
              <Title order={3} className="mb-4">
                Informations supplémentaires
              </Title>

              <Select
                label="Statut de la commande"
                placeholder="Sélectionner un statut"
                data={[
                  { value: "pending", label: "En attente" },
                  { value: "processing", label: "En cours" },
                  { value: "shipped", label: "Expédiée" },
                  { value: "delivered", label: "Livrée" },
                  { value: "cancelled", label: "Annulée" },
                ]}
                {...form.getInputProps("status")}
                className="mb-4"
              />

              <Textarea
                label="Notes"
                placeholder="Informations supplémentaires sur la commande"
                minRows={3}
                {...form.getInputProps("notes")}
              />
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card withBorder padding="lg" radius="md" className="mb-6">
              <Title order={3} className="mb-4">
                Informations client
              </Title>

              <TextInput
                label="Nom"
                placeholder="Nom du client"
                {...form.getInputProps("customerName")}
                className="mb-3"
                required
              />

              <TextInput
                label="Email"
                placeholder="Email du client"
                {...form.getInputProps("customerEmail")}
                className="mb-3"
                required
              />

              <TextInput
                label="Téléphone"
                placeholder="Téléphone du client"
                {...form.getInputProps("customerPhone")}
                className="mb-3"
              />

              <Textarea
                label="Adresse de livraison"
                placeholder="Adresse complète"
                minRows={3}
                {...form.getInputProps("customerAddress")}
                required
              />
            </Card>

            <Group position="right">
              <Button type="submit" loading={isSubmitting} size="md" fullWidth>
                Créer la commande
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
    </div>
  )
}

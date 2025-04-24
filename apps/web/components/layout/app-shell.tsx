"use client"

import type React from "react"
import { AppShell as MantineAppShell, Burger, Group, NavLink, ScrollArea } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, ShoppingCart, Users, Home, Settings } from "lucide-react"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()
  const pathname = usePathname()

  const navItems = [
    { icon: <Home size={20} />, label: "Tableau de bord", href: "/" },
    { icon: <ShoppingCart size={20} />, label: "Commandes", href: "/orders" },
    { icon: <Users size={20} />, label: "Clients", href: "/customers" },
    { icon: <Package size={20} />, label: "Produits", href: "/products" },
    { icon: <Settings size={20} />, label: "Paramètres", href: "/settings" },
  ]

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group>
            <ShoppingCart size={24} />
            <span className="text-xl font-bold">Gestion de Commandes</span>
          </Group>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p="md">
        <MantineAppShell.Section grow component={ScrollArea}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} passHref legacyBehavior>
              <NavLink
                component="a"
                active={pathname === item.href}
                label={item.label}
                leftSection={item.icon}
                className="mb-1"
              />
            </Link>
          ))}
        </MantineAppShell.Section>
        <MantineAppShell.Section>
          <div className="text-sm text-gray-500 p-2">Version 1.0.0</div>
        </MantineAppShell.Section>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  )
}

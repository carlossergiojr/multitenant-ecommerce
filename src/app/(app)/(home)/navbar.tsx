"use client"

import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Link from "next/link"
import React, { useState } from "react"
import { Button } from "@/components/ui"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import NavbarSidebar from "./navbar-sidebar"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"]
})

interface NavbarItemProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

const NavbarItem = ({ children, href, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "hover:border-primary rounded-full border-transparent bg-transparent px-3.5 text-lg hover:bg-transparent",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" }
]

const Navbar = () => {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <nav className="flex h-20 justify-between border-b bg-white font-medium">
      {/* Logo */}
      <Link href="/" className="flex items-center pl-6">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>

      {/* Navbar Items */}
      <div className="hidden items-center gap-4 lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex">
        <Button
          asChild
          variant="secondary"
          className="h-full rounded-none border-0 border-l bg-white px-12 text-lg transition-colors duration-300 ease-in-out hover:bg-pink-400"
        >
          <Link prefetch href="/sign-in">
            Log in
          </Link>
        </Button>
        <Button
          asChild
          className="h-full rounded-none border-0 border-l bg-black px-12 text-lg text-white transition-colors duration-300 ease-in-out hover:bg-pink-400 hover:text-black"
        >
          <Link prefetch href="/sign-up">
            Start selling
          </Link>
        </Button>
      </div>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="flex items-center justify-center lg:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsSidebarOpen(true)}
          className="size-12 border-transparent bg-white"
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  )
}

export default Navbar

"use client"

import { Input } from "@/components/ui/input"
import { ListFilterIcon, SearchIcon } from "lucide-react"
import React, { useState } from "react"
import CategoriesSidebar from "./categories-sidebar"
import { Button } from "@/components/ui/button"

interface Props {
  disabled?: boolean
}

const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex w-full items-center gap-2">
      <CategoriesSidebar
        isOpen={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>

      {/* TODO: Add categories view all button */}
      <Button
        variant="elevated"
        className="flex size-12 shrink-0 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/* TODO: Add library button */}
    </div>
  )
}

export default SearchInput

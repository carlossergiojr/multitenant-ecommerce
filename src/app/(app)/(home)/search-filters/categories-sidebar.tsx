import React, { useState } from "react"
import { CustomCategory } from "../types"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface CategoriesSidebarProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  data: CustomCategory[]
}

const CategoriesSidebar = ({
  isOpen,
  onOpenChange,
  data
}: CategoriesSidebarProps) => {
  const router = useRouter()

  const [parentCategories, setParentCategories] = useState<
    CustomCategory[] | null
  >(null)
  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null)

  // If we have parent categories, show those, otherwise show root categories
  const currentCategories = parentCategories ?? data ?? []

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null)
    setParentCategories(null)
    onOpenChange(open)
  }

  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[])
      setSelectedCategory(category)
    } else {
      // this is a leaf category (no subcategories)
      if (parentCategories && selectedCategory) {
        // This is a subcategory - navigate to /category/subcategory
        router.push(`/${selectedCategory.slug}/${category.slug}`)
      } else {
        // This is a main category - navigate to /category
        if (category.slug === "all") {
          router.push("/")
        } else {
          router.push(`/${category.slug}`)
        }
      }

      handleOpenChange(false)
    }
  }

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null)
      setSelectedCategory(null)
    }
  }

  const backgroundColor = selectedCategory?.color || "white"

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex h-full flex-col overflow-y-auto pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
            >
              <ChevronLeftIcon className="mr-2 size-4" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className="flex w-full cursor-pointer items-center justify-between p-4 text-left text-base font-medium hover:bg-black hover:text-white"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default CategoriesSidebar

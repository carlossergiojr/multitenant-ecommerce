import { Category } from "@/payload-types"
import Link from "next/link"
import React from "react"
import { CustomCategory } from "../types"

interface SubcategoryMenuProps {
  category: CustomCategory
  isOpen: boolean
  position: {
    top: number
    left: number
  }
}

const SubcategoryMenu = ({
  category,
  isOpen,
  position
}: SubcategoryMenuProps) => {
  const shouldHideMenu =
    !isOpen || !category.subcategories || category.subcategories.length === 0

  if (shouldHideMenu) {
    return null
  }

  const backgroundColor = category.color || "#F5F5F5"

  return (
    <div
      className="fixed z-100"
      style={{
        top: position.top,
        left: position.left
      }}
    >
      {/* Invisible bridge to maintain hover */}
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="w-60 -translate-x-[2px] -translate-y-[2px] overflow-hidden rounded-md border text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <div>
          {category.subcategories.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className="flex w-full items-center justify-between p-4 text-left font-medium underline hover:bg-black hover:text-white"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubcategoryMenu

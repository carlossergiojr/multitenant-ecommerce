import configPromise from "@/payload.config"
import { getPayload } from "payload"

import React from "react"
import { SearchFilters } from "./search-filters"
import { Category } from "@/payload-types"
import { CustomCategory } from "./types"
import Navbar from "./navbar"
import Footer from "./footer"
interface Props {
  children: React.ReactNode
}

const HomeLayout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise
  })

  const data = await payload.find({
    collection: "categories",
    depth: 1, // Fetch only top-level categories || Populate subcategories
    pagination: false,
    where: {
      parent: {
        exists: false // Find top-level categories
      }
    },
    sort: "name"
  })

  const formattedData: CustomCategory[] = data.docs.map((category) => {
    const subcategories =
      category.subcategories?.docs?.map((subcategory) => ({
        ...(subcategory as Category),
        subcategories: undefined
      })) ?? []

    return {
      ...category,
      subcategories
    }
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  )
}

export default HomeLayout

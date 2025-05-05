import React, { Suspense } from "react"
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import Navbar from "./navbar"
import Footer from "./footer"
interface Props {
  children: React.ReactNode
}

const HomeLayout = async ({ children }: Props) => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  )
}

export default HomeLayout

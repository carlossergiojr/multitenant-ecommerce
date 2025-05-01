import configPromise from "@payload-config"
import { getPayload } from "payload"

export default async function Home() {
  const payload = await getPayload({
    config: configPromise
  })
  const categories = await payload.find({
    collection: "categories",
    depth: 1,
    where: {
      parent: {
        exists: false
      }
    },
    limit: 10
  })

  return (
    <div className="p-4">
      <pre>{JSON.stringify(categories, null, 2)}</pre>
    </div>
  )
}

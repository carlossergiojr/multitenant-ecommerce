import Navbar from "./navbar"
import Footer from "./footer"
interface Props {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>

      <Footer />
    </div>
  )
}

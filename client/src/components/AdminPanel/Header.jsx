import { useSelector } from "react-redux"
import { Bell, User } from "lucide-react"

function Header() {
  const user = useSelector((state) => state.auth.user)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
          </div>
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-600 mr-4">
              <Bell className="w-6 h-6" />
            </button>
            <button className="flex items-center text-gray-700 hover:text-gray-800">
              <User className="w-6 h-6 mr-2" />
              <span>{user ? user.name : "Admin User"}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


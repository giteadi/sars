import { Layout, Home, Users, FileText, Settings, LogOut } from "lucide-react"

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { icon: Home, label: "Dashboard", value: "dashboard" },
    { icon: Layout, label: "Properties", value: "properties" },
    { icon: Users, label: "Users", value: "users" },
    { icon: FileText, label: "Reports", value: "reports" },
    { icon: Settings, label: "Settings", value: "settings" },
  ]

  return (
    <div className="bg-amber-400 text-black w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <a href="#" className="text-black flex items-center space-x-2 px-4">
        <Layout className="w-8 h-8" />
        <span className="text-2xl font-extrabold">SARS Admin</span>
      </a>
      <nav>
        {menuItems.map((item) => (
          <a
            key={item.value}
            href="#"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              activeTab === item.value ? "bg-black text-white" : "hover:bg-amber-300"
            }`}
            onClick={() => setActiveTab(item.value)}
          >
            <div className="flex items-center space-x-2">
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
          </a>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full">
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-300 text-black"
          onClick={onLogout}
        >
          <div className="flex items-center space-x-2">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Sidebar


import { Link } from "react-router-dom"

export default function Sitemap() {
  const siteLinks = [
    {
      category: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "Products", path: "/product" },
        { name: "Blogs", path: "/blogs" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
      ],
    },
    {
      category: "User Access",
      links: [
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
       
      ],
    },
    {
      category: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms-and-conditions" },
        { name: "Sitemap", path: "/sitemap" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-400 mb-12 text-center">Sitemap</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteLinks.map((category, index) => (
            <div key={index} className="p-6 rounded-lg bg-yellow-400/10 backdrop-blur-sm border border-amber-400/20">
              <h2 className="text-xl font-semibold text-amber-400 mb-4">{category.category}</h2>
              <ul className="space-y-3">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.path} className="text-white hover:text-amber-400 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


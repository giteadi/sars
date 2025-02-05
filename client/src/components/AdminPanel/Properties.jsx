import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Edit, Trash2 } from "lucide-react"
import { fetchProducts, deleteProduct } from "../../Redux/propertySlice"

function Properties() {
  const dispatch = useDispatch()
  const properties = useSelector((state) => state.property.properties)
  const loading = useSelector((state) => state.property.loading)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      dispatch(deleteProduct(id))
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Properties</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="px-6 py-4 whitespace-nowrap">{property.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{property.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">${property.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(property.id)}>
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Properties


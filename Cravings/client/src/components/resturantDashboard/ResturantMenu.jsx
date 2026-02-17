import { useState } from "react";
import AddMenuItemModal from "./modals/AddMenuItemModal";

const ResturantMenu = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useState([]);
  const [showAddMenuItemModal, setShowAddMenuItemModal] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Menu</h1>
            <p className="text-sm text-gray-500">
              Manage your restaurant items
            </p>
          </div>

          <button
            onClick={() => setShowAddMenuItemModal(true)}
            className="bg-(--primary) text-white px-6 py-2 rounded-xl font-medium hover:bg-(--secondary) transition"
          >
            + Add Item
          </button>
        </div>

        <div className="max-w-6xl mx-auto bg-white p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-[60%] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-[35%] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non Veg</option>
            <option value="vegan">Vegan</option>
            <option value="jain">Jain</option>
            <option value="gluten-free">Gluten Free</option>
            <option value="contains-nuts">Contains Nuts</option>
            <option value="dairy">Dairy</option>
          </select>
        </div>

        <div className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Description
                </th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No menu items found
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-gray-800">₹{item.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:underline">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddMenuItemModal && (
        <AddMenuItemModal onClose={() => setShowAddMenuItemModal(false)} />
      )}
    </>
  );
};

export default ResturantMenu;

import React, { useCallback, useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import toast from 'react-hot-toast';
import api from '../Api/Axios_Instance';

const Modal = ({isOpen, onClose, title, children}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition"
          >
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

const Products = () => {

  const [products,setProducts] = useState([])
  const [showAdd,setShowAdd] = useState(false)
  const [showEdit,setShowEdit] = useState(false)
  const [editProduct,setEditProduct] = useState(null)
  const [newProduct,setNewProduct]= useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  })

  const fetchProducts= async () => {
    try {
      const res = await api.get("/products")
      setProducts(res.data)
    }catch (err) {
      console.error("error fetching products :", err)
      toast.error("Failed to fetch products.");
    }
  }
  useEffect(() => {
    fetchProducts()
  },[])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product? ")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id))
      toast.success("Product deleted successfully!")
    } catch (err) {
      console.error("Error deleting product:" , err);
      toast.error("Failed to delete product. ")
    }
  }

  const handleAddProduct =async (e) => {
    e.preventDefault();
  
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Please fill in required fields!");
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: Date.now().toString(),
      rating: 0,
      reviews: 0,
      inStock: true,
    }
    try {
      const res = await api.post("/products", productToAdd);
      setProducts((prev) => [...prev, res.data]);
      toast.success("Product added successfully!");
      setShowAdd(false);
      setNewProduct({ name: "", price: "", category: "", image: "", description: "" });
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Failed to add product.");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product)
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
    });
    setShowEdit(true)
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Please fill in required fields!");
      return;
    }

    try {
      const res = await api.put(`/products/${editProduct.id}`, {
        ...editProduct,
        ...newProduct,
      });
      
      setProducts(prev => prev.map(p => 
        p.id === editProduct.id ? res.data : p
      ));
      
      toast.success("Product updated successfully!");
      setShowEdit(false);
      setEditProduct(null);
      setNewProduct({ name: "", price: "", category: "", image: "", description: "" });
    } catch (err) {
      console.error("Error updating product:" ,err);
      toast.error("Failed to update product.")
    }
  }

  const resetForm = () => {
    setNewProduct({ name: "", price: "", category: "", image: "", description: "" });
    setEditProduct(null);
  };

  const ProductForm = ({ onSubmit, onCancel, title, submitText }) => (
    <Modal isOpen={true} onClose={onCancel} title={title}>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name *"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="number"
          placeholder="Price *"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          min="0"
          step="0.01"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Image URL *"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
        ></textarea>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            {submitText}
          </button>
        </div>
      </form>
    </Modal>
  );

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <SideBar/>
      
      {/* Main Content Area - Adjusted for 60px sidebar */}
      <div className='flex-1 ml-60 flex flex-col'>
        <main className='flex-1 overflow-y-auto p-6 lg:p-8'>
          {/* Header Section */}
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900'>📦 All Products</h2>
              <p className='text-gray-600 mt-2'>Manage your product inventory and details</p>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-sm hover:shadow-md"
            > 
              ➕ Add Product
            </button>
          </div>

          {/* Modals */}
          {showAdd && (
            <ProductForm 
              onSubmit={handleAddProduct}
              onCancel={() => {
                setShowAdd(false)
                resetForm()
              }}
              title="Add New Product"
              submitText="Add Product"
            />
          )}

          {showEdit && (
            <ProductForm
              onSubmit={handleUpdateProduct}
              onCancel={() => {
                setShowEdit(false);
                resetForm();
              }}
              title="Edit Product"
              submitText="Update Product"
            />
          )}

          {/* Products Table */}
          {products.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-6">Get started by adding your first product to the inventory.</p>
              <button
                onClick={() => setShowAdd(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                ➕ Add Your First Product
              </button>
            </div>
          ) : (
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
              <div className="overflow-x-auto">
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="py-4 px-6 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((p) => (
                      <tr key={p.id} className='hover:bg-gray-50 transition-colors duration-150'>
                        <td className="py-4 px-6">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/48?text=No+Image';
                            }}
                          />
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-900">{p.name}</div>
                          {p.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {p.description}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                            {p.category || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-900">₹{p.price}</td>
                        <td className="py-4 px-6">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleEdit(p)}
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-sm flex items-center"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium text-sm flex items-center"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Products
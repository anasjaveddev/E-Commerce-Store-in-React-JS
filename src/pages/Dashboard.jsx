import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { productItems } from "../data/products";

const Dashboard = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  const filteredProducts = productItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="flex flex-wrap justify-between items-center border-b border-cyan-500/30 pb-5 mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            NEBULA MARKET
          </h1>
          <div className="flex gap-4 items-center">
            <div className="text-sm bg-slate-800 px-3 py-1.5 rounded-full">
              🔹 {currentUser.email}
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-full transition-all hover:scale-105"
            >
              EXIT
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="🔍 Search gadgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
          />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1.5 border border-slate-700 hover:border-cyan-500/50"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-xs px-2 py-1 rounded-full">
                  {product.tag}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-cyan-400 mb-1">
                  {product.name}
                </h3>
                <p className="text-teal-300 font-medium text-lg mb-3">
                  {product.price}
                </p>
                <button
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="w-full py-2.5 bg-slate-700 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-600 hover:text-white transition-colors"
                >
                  QUICK VIEW
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            No products found. Try another search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
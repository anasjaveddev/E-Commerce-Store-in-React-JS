import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { productItems } from "../data/products";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  if (!currentUser) {
    navigate("/");
    return null;
  }

  const product = productItems.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">404 | Not Found</h2>
        <Link
          to="/dashboard"
          className="bg-cyan-600 px-6 py-2 rounded-xl font-semibold hover:bg-cyan-500"
        >
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
        >
          ← BACK TO ALL ITEMS
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-slate-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm border border-slate-700">
          <div className="rounded-2xl overflow-hidden bg-slate-700">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover min-h-[350px]"
            />
          </div>

          <div className="space-y-5">
            <span className="text-cyan-400 text-sm font-mono tracking-wider bg-slate-700/50 px-3 py-1 rounded-full inline-block">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-teal-300">{product.price}</p>
            <div className="w-12 h-1 bg-cyan-500 rounded-full my-4"></div>
            <p className="text-slate-300 text-lg leading-relaxed">
              {product.description}
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
                ADD TO CART
              </button>
              <button className="px-8 py-3 bg-slate-800 border border-cyan-500/50 rounded-xl font-semibold hover:bg-slate-700">
                WISHLIST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
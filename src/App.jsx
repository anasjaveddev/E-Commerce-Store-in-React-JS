import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const [products, setProducts] = useState([]);




  function addProduct() {

    if (name === "" || price === "") {
      alert("Name aur Price required hai");
      return;
    }

    const newProduct = {
      name: name,
      image: image,
      desc: desc,
      price: price
    };

    const updatedProducts = [...products, newProduct];

    setProducts(updatedProducts);

  
    console.log("Added Product:", newProduct);
    console.log("All Products:", updatedProducts);

  
    setName("");
    setImage("");
    setDesc("");
    setPrice("");
  }

  function deleteProduct(index) {
    const updated = products.filter((item, i) => i !== index);
    setProducts(updated);

    console.log("After Delete:", updated);
  }

  return (
    <div>

      <h1>E-Commerce Store</h1>

      {/* FORM */}
      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br /><br />

      <button onClick={addProduct}>Add Product</button>

      <hr />


      <h2>Products List</h2>

      {
        products.length === 0 ? (
          <p>No products added yet</p>
        ) : (
          products.map((item, index) => (
            <div key={index}>

            
              <h3>{item.name}</h3>

              {item.image && (
                <img src={item.image} alt="product" width="100" />
              )}

              <p>{item.desc}</p>
              <p>Price: {item.price}</p>

              <button onClick={() => deleteProduct(index)}>
                Delete
              </button>

              <hr />

            </div>
          ))
        )
      }

    </div>
  );
}

export default App;
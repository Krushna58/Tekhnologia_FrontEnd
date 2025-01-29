import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    const cartItem = {
      appDTO: {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
      },
      quantity: quantity,
    };

    axios
      .post("http://localhost:8080/cart", cartItem)
      .then((response) => {
        console.log("Product added to cart:", response.data);
        alert("Product added to cart!");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Failed to add product to cart");
      });
  };

  useEffect(() => {
    console.log(id);

    axios
      .get(`http://localhost:8080/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid rounded-start"
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="h4 text-success">${product.price}</p>
                  <p>Category: <strong>{product.category}</strong></p>
                  <p>Brand: <strong>{product.brand}</strong></p>
                  <div className="d-flex align-items-center">
                    <label htmlFor="quantity" className="me-2">Quantity:</label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="form-select w-auto"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10+</option>
                    </select>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary mt-3"
                  >
                    Add To Cart
                  </button>
                  <Link to="/" className="btn btn-secondary mt-3 ms-2">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

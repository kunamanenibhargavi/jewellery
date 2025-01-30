import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = React.useState(location.state?.cart || []);

  const incrementQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.Price.INR * item.quantity, 0);
  };

  return (
    <div className="container mt-4">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <img
                  src={item.Img_Url}
                  alt={item.Product_Name}
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                {item.Product_Name} - ₹{item.Price.INR}
              </span>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => decrementQuantity(item.id)}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => incrementQuantity(item.id)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h4>Total: ₹{calculateTotal()}</h4>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
        Continues Shopping
      </button>
    </div>
  );
};

export default CartPage;

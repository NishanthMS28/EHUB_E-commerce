import React, { useState, useEffect } from "react";
import Products from "./Components/Products/products";
import Navbar from "./Components/Navbar/navbar";
import { commerce } from "./Components/lib/commerce";
import Cart from "./Components/Cart/cart";
import { Routes, Route } from "react-router-dom";
import Checkout from "./Components/CheckoutForm/Checkout/checkout";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response);
  };

  //qty is written in {}i.e in an object because qty is only one of the things that we
  // want to update.

  const handleRemoveFromCart = async productId => {
    const response = await commerce.cart.remove(productId);
    setCart(response);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  //try...catch is for handling exceptions or errors that might occur during code execution.
  //if...else is for making decisions based on conditions, directing the flow of the program based on whether a condition is true or false.

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route
          path="/"
          element={
            <Products products={products} onAddToCart={handleAddToCart} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleEmptyCart={handleEmptyCart}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

// This line uses the useState hook to create a piece of state called products and a corresponding function setProducts to update the state. The initial value of the products state is an empty array ([]).
// This block of code defines an asynchronous function called fetchProducts. The function is declared using the async keyword, which means it can use await inside it.

// Inside the function, await commerce.products.list() is used. This line awaits the result of a promise returned by commerce.products.list(). It seems that the commerce object is being used to fetch a list of products from some commerce-related library or API. The await keyword pauses the function's execution until the promise is resolved (data is received from the API).

// The result of the await expression is destructured to extract the data property. It seems that the data variable will hold the list of products received from the API.

// Finally, the setProducts function is called with data as an argument to update the products state with the fetched list of products.
// This block of code uses the useEffect hook to execute the fetchProducts function after the component has rendered. The useEffect hook runs the function inside it (in this case, fetchProducts) after the initial rendering of the component.

// The dependency array [] is passed as the second argument to useEffect, indicating that this effect should only run once, after the component has mounted. Since the dependency array is empty, the effect doesn't depend on any props or state changes, so it runs only once.

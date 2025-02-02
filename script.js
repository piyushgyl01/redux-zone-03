import { createStore } from "https://cdn.skypack.dev/redux";
import cartReducer from "./cartReducer.js";
import { ADD_TO_CART } from "./actions.js";
import { REMOVE_FROM_CART } from "./actions.js";
import { CALCULATE_TOTAL } from "./actions.js";

const store = createStore(
  cartReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const productsList = document.querySelector("#productsList");
const cartList = document.querySelector("#cartList");
const totalCost = document.querySelector("#totalCost");

const products = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 15 },
];

function renderProducts() {
  productsList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    const addButton = document.createElement("button");

    li.textContent = `${product.name} - $${product.price}`;
    addButton.textContent = "Add to Cart";

    addButton.addEventListener("click", () => {
      store.dispatch({ type: ADD_TO_CART, payload: product });
      store.dispatch({ type: CALCULATE_TOTAL });
    });

    li.appendChild(addButton);
    productsList.appendChild(li);
  });
}

function updateCart() {
  const state = store.getState();
  cartList.innerHTML = "";

  state.cartItems.forEach((item) => {
    const li = document.createElement("li");
    const removeButton = document.createElement("button");

    li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
      store.dispatch({ type: REMOVE_FROM_CART, payload: { id: item.id } });
      store.dispatch({ type: CALCULATE_TOTAL });
    });

    li.appendChild(removeButton);
    cartList.appendChild(li);
  });

  totalCost.textContent = state.total;
}

store.subscribe(() => {
  console.log(store.getState());
  updateCart();
});

renderProducts();

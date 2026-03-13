import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");

  if (!productList) {
    console.error("No element with class 'product-list' found in the DOM.");
    return;
  }

  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image || 'default.jpg'}" alt="${item.Name || 'Product'}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name || 'Unnamed Product'}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || 'No color'}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice ?? 0}</p>
  </li>`;
}

renderCartContents();
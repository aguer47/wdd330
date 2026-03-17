import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // the product details are needed before rendering the HTML
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // Move this function from product.js. Make any changes necessary to make it work.
    let cart = getLocalStorage("so-cart");
    // Ensure cart is always an array
    if (!Array.isArray(cart)) {
      cart = [];
    }
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
    alert("Product added to cart!");
  }

  renderProductDetails() {
    // Use the HTML in the /product_pages/index.html as a guide to the HTML that needs to be generated.
    const product = this.product;
    const html = `
      <section class="product-detail">
        <h3>${product.Brand?.Name || 'Brand'}</h3>
        <h2 class="divider">${product.NameWithoutBrand || 'Product Name'}</h2>
        <img
          class="divider"
          src="${product.Image || 'default.jpg'}"
          alt="${product.Name || 'Product'}"
        />
        <p class="product__price">$${product.SuggestedRetailPrice ?? 0}</p>
        <p class="product__color">${product.Colors?.[0]?.ColorName || 'No color'}</p>
        <p class="product__description">${product.DescriptionHtmlSimple || 'No description'}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>
    `;
    document.querySelector('main').innerHTML = html;
  }
}
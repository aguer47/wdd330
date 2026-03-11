// ProductList.mjs

import { renderListWithTemplate, productCardTemplate } from "./utils.mjs";

export default class ProductList {
  /**
   * @param {string} category - product category, e.g., "tents"
   * @param {Object} dataSource - instance of ProductData class
   * @param {HTMLElement} listElement - container to render products into
   */
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  /**
   * Initialize the product list
   * - fetches the data from the data source
   * - filters by category
   * - renders the products
   */
  async init() {
    try {
      // Fetch all products
      const allProducts = await this.dataSource.getData();

      // Filter by category (optional, depends on JSON structure)
      const products = allProducts.filter(
        (product) => product.category === this.category
      );

      // Render the products using the reusable utility function
      this.render(products);
    } catch (error) {
      console.error("Error loading product data:", error);
    }
  }

  /**
   * Render products into the container
   * @param {Array} products - array of product objects
   */
  render(products) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      products,
      "afterbegin",
      true // clear container before rendering
    );
  }
}
import ProductData from "./ProductData.mjs";

// Create the data source
const dataSource = new ProductData("tents");

// Select the HTML container
const listElement = document.getElementById("product-list");

// Create the product list instance
const productList = new ProductList("tents", dataSource, listElement);

// Initialize (fetch data and render)
productList.init();
const axios = require("axios");
const url = "http://127.0.0.1:3000";

const main = async () => {
  const createProduct = await axios.post(`${url}/products`, {
    name: "Cặp sách siêu nhân",
    price: 100000,
    description: "Cặp sách siêu nhân cho bé",
  });
  console.log("create-product-status:", createProduct.status);

  setTimeout(async () => {
    const products = await axios.get(`${url}/products`);
    console.log("data:", products.data);
  }, 2000);
};
main();

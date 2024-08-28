const axios = require("axios");
const url = "http://127.0.0.1:3000";

const main = async () => {
  //   const product = await axios.post(`${url}/products`, {
  //     name: "Cặp sách siêu nhân",
  //     price: 100000,
  //     description: "Cặp sách siêu nhân cho bé",
  //   });
  //   console.log(product.data);

  const productsGet = await axios.get(`${url}/products`);
  console.log(productsGet.data);
};
main();

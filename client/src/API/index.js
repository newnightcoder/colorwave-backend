import Commerce from "@chec/commerce.js";
let key;

(async () => {
  let { key } = await fetch("http://localhost:4242/commerce", { method: "get" }).then((res) => res.json());
  console.log("key", key);
  return key;
})();
const commerce = new Commerce(key);
const listing = async () => {
  try {
    let { data } = await commerce.products.list({
      category_slugs: ["gaming", "sound"],
      limit: 200,
    });
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default listing;

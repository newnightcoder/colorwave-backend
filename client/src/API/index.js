import Commerce from "@chec/commerce.js";

const listing = async () => {
  try {
    const { key } = await fetch("http://localhost:4242/commerce").then((res) => res.json());
    console.log(key);
    if (key !== undefined) {
      const commerce = new Commerce(key);
      let { data } = await commerce.products.list({
        category_slugs: ["gaming", "sound"],
        limit: 200,
      });
      console.log("data", data);
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default listing;

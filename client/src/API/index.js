import Commerce from "@chec/commerce.js";

const listing = async () => {
  const { key } = await fetch("/commerce", { method: "get" }).then((res) => res.json());
  try {
    if (key !== undefined) {
      console.log("commerce key", key);
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

import Commerce from "@chec/commerce.js";

const getKey = async () => {
  const { key } = await fetch("/commerce").then((res) => res.json());
  console.log(key);
  return key;
};

const listing = async () => {
  const key = await getKey();
  try {
    console.log(key);
    const commerce = new Commerce(key);

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

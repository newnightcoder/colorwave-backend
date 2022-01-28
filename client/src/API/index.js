import Commerce from "@chec/commerce.js";

const commerce = new Commerce(process.env.REACT_APP_CHEC_KEY);

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

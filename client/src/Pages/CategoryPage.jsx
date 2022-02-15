import React, { useEffect, useState } from "react";
import { ChevronLeft } from "react-bootstrap-icons";
import { use100vh } from "react-div-100vh";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Footer, LoaderGaming, Navbar, ProductCard } from "../Components";
import "../Styles/_variables.css";
import useWindowSize from "../utils/useWindowSize";

const CategoryPage = () => {
  const location = useLocation();
  const { pathname } = useLocation();
  const item = location.state?.item || undefined;
  const variants = location.state?.variants || undefined;
  const categoryName = location.pathname.split("/")[2];
  const shop = useSelector((state) => state.shop.shop);
  const items = useSelector((state) => state?.shop.shop);
  const limitedItems = shop.filter((item) => item?.categories?.find((cat) => cat.name === "limited"));
  const [isLoading, setIsLoading] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [itemVariants, setItemVariants] = useState([]);
  let subCategoriesArray = [];
  const { heght, width } = useWindowSize();
  const responsiveHeight = use100vh();

  const findProductVariants = () => {
    if (variants === undefined) return;
    let variantsArray = item?.variant_groups[0]?.options;
    let variantItems = variantsArray.map((variant) => {
      return variant.name;
    });
    return variantItems;
  };

  const filterItemsOfCategory = () => {
    const filteredItems = items
      .map((item) => {
        const categories = item.categories;
        const matchingCategory = categories.find((category) => category.name === categoryName);
        if (matchingCategory) return { ...item };
      })
      .filter((item) => item !== undefined);
    return setCategoryItems(filteredItems);
  };

  const createSubCategoriesArray = () => {
    categoryItems.forEach((item) => {
      const { categories } = item;
      const subCategory = categories.filter((category) => {
        if (categoryName === "gaming") return category.name !== categoryName && category.name !== "accessories";
        if (categoryName === "accessories") return category.name !== categoryName && category.name !== "gaming";
        return category.name !== categoryName;
      });
      const [{ name }, _] = subCategory;
      subCategoriesArray.push(name);
    });
    return subCategoriesArray;
  };

  const getSubCategories = () => {
    return setSubCategories([...new Set(subCategoriesArray)]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (items.length !== 0) setIsLoading(false);
    if (variants) {
      const products = findProductVariants();
      setItemVariants(products);
    }
    filterItemsOfCategory();
    createSubCategoriesArray();
    getSubCategories();
    return () => {
      setIsLoading(true);
    };
  }, [isLoading, items, item, variants]);

  const pageConditionalStyle = {
    colors: {
      backgroundColor:
        categoryName === "gaming"
          ? "#333"
          : categoryName === "sound"
          ? "lightgray"
          : categoryName === "limited"
          ? "#171717"
          : "#ebebeb",
      color:
        categoryName === "gaming"
          ? "#ebebeb"
          : categoryName === "sound"
          ? "black"
          : categoryName === "limited"
          ? "#ebebeb"
          : "black",
    },
    titleAfterElement: {
      backgroundColor:
        categoryName === "gaming"
          ? "#ebebeb"
          : categoryName === "sound"
          ? "black"
          : categoryName === "limited"
          ? "#ebebeb"
          : "black",
    },
  };

  return (
    <div
      className="pt-16 min-h-screen h-max w-full flex flex-col items-center justify-start font-cabin space-y-6 pb-12"
      style={pageConditionalStyle.colors}
    >
      <Navbar />
      <div className="w-full relative flex items-center justify-center md:justify-start relative pt-4 md:pt-10 mb-4">
        <Link
          to={{ pathname: location.state?.from?.includes("shop") ? "/shop" : "/" }}
          className="absolute left-5 md:left-10 top-50"
        >
          <ChevronLeft size={38} className="fw-bold" />
        </Link>
        <span className="w-min max-w-64 relative text-2xl font-bold px-4 md:px-6 md:ml-32 md:whitespace-nowrap">
          {categoryName.toUpperCase()}
          <span
            style={pageConditionalStyle.titleAfterElement}
            className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-1 md:bottom-0.5"
          ></span>
        </span>
      </div>

      <div className="w-full h-full">
        {!variants && location.pathname.includes("limited") ? (
          <div className="h-full w-full grid place-items-center gap-3 md:gap-8 grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 px-2 md:px-6 py-12">
            {isLoading ? (
              <LoaderGaming />
            ) : (
              limitedItems.map((item, i) => (
                <ProductCard key={i + 1} item={item} variants={item.variant_groups} bgColor={"rgba(0,0,0,1)"} />
              ))
            )}
          </div>
        ) : !variants ? (
          isLoading ? (
            <div
              style={{ height: width < 768 ? responsiveHeight - 300 : "calc(100vh - 200px)" }}
              className="w-full flex flex-col items-center justify-center"
            >
              <span className="uppercase text-lg">{`loading ${categoryName.toUpperCase()} category`}</span>
            </div>
          ) : (
            subCategories.map((cat, i) => (
              <div id={cat} className="h-full flex flex-col items-center justify-center py-3 md:py-8" key={i + 1}>
                <div className="h-min w-max relative text-center text-2xl capitalize px-4 md:px-8 mb-6 md:mb-8">
                  <h2 className="text-xl md:text-3xl relative z-10 whitespace-nowrap">{cat}</h2>
                  <span className="h-0.5 md:h-1 w-full absolute inset-x-0 mx-auto left-0 bottom-1 md:bottom-0.5 bg-yellow-300"></span>
                </div>
                <div className="h-max w-full grid place-items-center gap-3 md:gap-8 grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 px-3 md:px-6">
                  {categoryItems.map((item, i) => {
                    const { categories } = item;
                    if (categories.find((category) => category.name === cat)) {
                      return (
                        <ProductCard
                          item={item}
                          variants={item.variant_groups}
                          key={i + 1}
                          bgColor={
                            categoryName === "sound" ? "white" : categoryName === "gaming" ? "rgba(0,0,0,1)" : "white"
                          }
                        />
                      );
                    }
                  })}
                </div>
              </div>
            ))
          )
        ) : (
          <div className="h-full w-full grid place-items-center gap-4 md:gap-10 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-6">
            {isLoading ? (
              <LoaderGaming />
            ) : (
              itemVariants.map((variant, i) => {
                let matchingItem = items.find((item) => item.name === variant);
                return <ProductCard item={matchingItem} key={i + 1} variants={undefined} parentProduct={item} />;
              })
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;

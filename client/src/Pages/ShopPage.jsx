import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Footer, LoaderGaming, LoaderSound, Navbar, ProductCard } from "../Components";
import "../Styles/_variables.css";
const ShopPage = () => {
  const shop = useSelector((state) => state?.shop?.shop);
  const { pathname } = useLocation();
  const open = useSelector((state) => state?.shop.searchModalOpen);

  const scrollWidthOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -40;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = {
    limited: "limited",
    gaming: "gaming",
    headphones: "headphones",
    mics: "mics",
    skins: "skins",
    accessories: "accessories",
  };

  const limitedItems = shop?.filter((item) => item?.categories?.find((cat) => cat.name === "limited"));
  const gamingItems = shop?.filter((item) => item?.categories?.find((cat) => cat.name === "gaming"));
  const headphonesItems = shop?.filter((item) => item?.categories?.find((cat) => cat.name === "headphones"));
  const micsItems = shop?.filter((item) => item?.categories?.find((cat) => cat.name === "mics"));
  const accessoriesItems = shop?.filter((item) => item?.categories?.find((cat) => cat.name === "accessories"));
  const skinsItems = shop?.filter((item) => item?.categories?.find((cat) => cat.name === "skins"));

  return (
    <div className="pt-16 h-full w-full font-cabin" style={{ overflow: open ? "hidden" : "auto" }}>
      <Navbar />
      <header className="h-full flex flex-col items-center justify-center space-y-6 bg-white text-black pt-4 md:pt-10 pb-4">
        <div className="w-max relative">
          <h1 className="text-center text-xl md:text-3xl font-bold uppercase px-6">Products</h1>
          <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 bg-black"></span>
        </div>
        <ul className="hidden md:flex items-center justify-center space-x-2 whitespace-nowrap text-sm">
          <li className="w-16 px-1 text-center">
            <Link
              className="capitalize hover:underline hover:font-bold"
              to={{ pathname: "/categories/gaming", state: { from: pathname } }}
            >
              gaming
            </Link>
          </li>
          <span>|</span>
          <li className="w-20 px-1 text-center">
            <Link
              className="capitalize hover:underline hover:font-bold"
              to={{ pathname: "/categories/sound", state: { from: pathname } }}
            >
              headphones
            </Link>
          </li>
          <span>|</span>
          <li className="w-10 px-1 text-center">
            <HashLink
              className="capitalize hover:underline hover:font-bold"
              to="/categories/sound#mics"
              scroll={scrollWidthOffset}
            >
              mics
            </HashLink>
          </li>
          <span>|</span>
          <li className="w-20 px-1 text-center">
            <Link
              className="capitalize hover:underline hover:font-bold"
              to={{ pathname: "/categories/skins", state: { from: pathname } }}
            >
              iPhone skins
            </Link>
          </li>
          <span>|</span>
          <li className="w-20 px-1 text-center">
            <Link
              className="capitalize hover:underline hover:font-bold"
              to={{ pathname: "/categories/accessories", state: { from: pathname } }}
            >
              accessories
            </Link>
          </li>
        </ul>
      </header>
      <main className="h-full w-full flex flex-col items-center justify-center">
        <section
          style={{ backgroundColor: "#171717" }}
          className="h-full w-full text-gray-300 flex flex-col items-center justify-center space-y-4 md:space-y-8 py-6 md:px-2"
        >
          <div className="h-full w-max relative">
            <h2 className="relative capitalize text-center text-2xl md:text-3xl px-5 md:px-8">
              ColorWave {categories.limited}
            </h2>
            <span className="h-0.5 md:h-1 w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 md:bottom-px bg-yellow-300"></span>
          </div>
          <div className="h-full w-full grid place-items-center gap-3 md:gap-8 grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 p-4">
            {limitedItems.length === 0 ? (
              <LoaderGaming />
            ) : (
              limitedItems.map((item, i) => (
                <ProductCard key={i + 1} item={item} variants={item.variant_groups} bgColor={"rgba(0,0,0,1)"} />
              ))
            )}
          </div>
        </section>
        <section className="h-full w-full text-gray-900 flex flex-col items-center justify-center space-y-4 md:space-y-8 bg-sound py-6 md:px-2">
          <div className="h-full w-max relative">
            <h2 className="relative capitalize text-center text-2xl md:text-3xl px-5 md:px-8 z-10">
              {categories.gaming}
            </h2>
            <span className="h-0.5 md:h-1 w-full absolute inset-x-0 mx-auto left-0 bottom-1 md:bottom-px bg-blue-400"></span>
          </div>
          <div className="h-full w-full grid place-items-center gap-3 md:gap-8 grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 p-4">
            {gamingItems.length === 0 ? (
              <LoaderGaming />
            ) : (
              gamingItems.map((item, i) => (
                <ProductCard key={i + 1} item={item} variants={item.variant_groups} bgColor={"rgba(250,250,250,1)"} />
              ))
            )}
          </div>
        </section>
        <section
          style={{ backgroundColor: "#171717" }}
          className="h-full w-full text-gray-300 flex flex-col items-center justify-center space-y-4 md:space-y-8 py-6 md:px-2"
        >
          <div className="h-full w-max relative">
            <h2 className="relative capitalize text-center text-2xl md:text-3xl px-5 md:px-8 z-10">
              {categories?.headphones}
            </h2>
            <span className="h-0.5 md:h-1 w-full absolute inset-x-0 mx-auto left-0 bottom-1 md:bottom-px  bg-yellow-300"></span>
          </div>
          <div className="h-full w-full grid place-items-center gap-3 md:gap-8 grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 p-4">
            {headphonesItems.length === 0 ? (
              <LoaderSound />
            ) : (
              headphonesItems.map((item, i) => (
                <ProductCard key={i + 1} item={item} variants={item.variant_groups} bgColor={"rgba(250,250,250,1)"} />
              ))
            )}
          </div>
        </section>
        <section
          style={{ backgroundColor: "#171717" }}
          className="h-full w-full text-gray-300 flex flex-col items-center justify-center space-y-4 md:space-y-8 pb-6 md:px-2"
        >
          <div className="h-full w-max relative">
            <h2 className="relative capitalize text-center text-2xl md:text-3xl px-5 md:px-8 z-10">
              {categories.mics}
            </h2>
            <span className="h-0.5 md:h-1 w-full absolute inset-x-0 mx-auto left-0 bottom-1 md:bottom-px  bg-yellow-300"></span>
          </div>
          <div className="h-full w-full grid place-items-center gap-3 md:gap-8 grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 p-4">
            {micsItems.length === 0 ? (
              <LoaderSound />
            ) : (
              micsItems.map((item, i) => (
                <ProductCard key={i + 1} item={item} variants={item.variant_groups} bgColor={"rgba(250,250,250,1)"} />
              ))
            )}
          </div>
        </section>
        <section className="h-full w-full text-gray-900 flex flex-col items-center justify-center bg-sound space-y-4 md:space-y-8 py-6 md:px-2">
          <div className="h-full w-max relative">
            <h2 className="relative capitalize text-center text-2xl md:text-3xl px-5 md:px-8">{categories.skins}</h2>
            <span className="h-0.5 md:h-1 w-full absolute inset-x-0 mx-auto left-0 bottom-1 md:bottom-px  bg-blue-400"></span>
          </div>
          <div className="h-full w-full grid place-items-center gap-3 md:gap-8 grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 p-4">
            {skinsItems.map((item, i) => (
              <ProductCard key={i + 1} item={item} variants={item.variant_groups} bgColor={"rgba(250,250,250,1)"} />
            ))}
          </div>
        </section>
        <section className="h-full w-full text-gray-900 flex flex-col items-center justify-center bg-sound space-y-4 md:space-y-8 pb-12 md:px-2">
          <div className="h-full w-max relative">
            <h2 className="relative capitalize text-center text-2xl md:text-3xl px-5 md:px-8">
              {categories.accessories}
            </h2>
            <span className="h-0.5 md:h-1 w-full absolute inset-x-0 mx-auto left-0 bottom-1 md:bottom-px bg-blue-400"></span>
          </div>
          <div className="h-full w-full grid place-items-center gap-3 md:gap-8 grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 p-4">
            {accessoriesItems.map((item, i) => (
              <ProductCard key={i + 1} item={item} variants={item.variant_groups} bgColor={"rgba(250,250,250,1)"} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;

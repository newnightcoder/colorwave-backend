import React, { useEffect } from "react";
import { ChevronDoubleRight } from "react-bootstrap-icons";
import ImageGallery from "react-image-gallery";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Footer } from "../Components";
import { addToCart, toggleCartDrawer } from "../Redux/Actions/cart.action";
import "../Styles/_variables.css";
import useWindowSize from "../utils/useWindowSize";

const ProductPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const shop = useSelector((state) => state.shop.shop);
  const { item } = location?.state || undefined;
  const { parentProduct } = location?.state || undefined;
  const { height, width } = useWindowSize();

  const itemImages = item.assets
    .filter((asset) => !asset.filename.includes("product"))
    .map((asset) => ({
      original: asset.url,
      thumbnail: asset.url,
    }));

  const onlyOneImg = [
    {
      original: item.assets[0].url,
      thumbnail: item.assets[0].url,
    },
  ];

  const getRelatedItem = (id) => {
    const relatedProduct = shop.find((product) => product.id === id);
    console.log("relatedItem", relatedProduct);
    return relatedProduct;
  };

  const getFullVersionRelatedProduct = (product) => {
    let relatedProduct = shop.find((item) => item.id === product.id);
    return relatedProduct;
  };

  const linkToRelatedProduct = (related) => {
    if (getFullVersionRelatedProduct(related).variant_groups.length !== 0) {
      history.push({
        pathname: `/categories/${getRelatedItem(related.id).name}`,
        state: { variants: true, item: getFullVersionRelatedProduct(related) },
      });
      return;
    }
    history.push({
      pathname: `/product/${getRelatedItem(related.id).name}`,
      state: { item: getFullVersionRelatedProduct(related) },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [getRelatedItem]);

  const handleAddToCart = () => {
    const qty = 1;
    dispatch(addToCart(item, qty));
    dispatch(toggleCartDrawer());
  };

  const bgColor = item?.categories[0]?.name === "gaming" ? "black" : "#fefefe";
  const descriptionBgColor = item?.categories[0]?.name === "gaming" ? "rgb(40,40,40)" : "rgba(240,240,240,.99)";
  const textColor = item?.categories[0]?.name === "gaming" ? "rgba(250,250,250,.99)" : "rgb(40,40,40)";

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="font-cabin overflow-x-hidden relative">
      <div className="breadcrumb w-full flex items-center justify-start gap-1 whitespace-nowrap text-gray-900 bg-white px-2 md:pl-10 pt-3 md:pt-8 pb-3">
        <Link to="/" className="w-max flex items-center justify-center gap-1 capitalize hover:underline">
          home <ChevronDoubleRight size={12} className="transform translate-y-px" />
        </Link>
        <Link
          to={{
            pathname: `/categories/${parentProduct !== undefined ? parentProduct.name : item.categories[0]?.name}`,
            state: {
              variants: parentProduct !== undefined && true,
              item: parentProduct !== undefined && parentProduct,
            },
          }}
          className="w-max flex items-center justify-center gap-1 capitalize hover:underline"
        >
          <span>{parentProduct !== undefined ? parentProduct.name : item.categories[0]?.name}</span>
          <ChevronDoubleRight size={12} className="transform translate-y-px" />
        </Link>
        <span className="w-max capitalize underline truncate">{item?.name}</span>
      </div>

      <div
        className="product w-full max-w-8xl mx-auto flex flex-col lg:flex-row justify-start items-center gap-8 md:gap-2 lg:justify-center bg-black pb-16 md:pb-0 2xl:px-10"
        style={{
          minHeight: "calc(100vh - 112px)",
          background: bgColor,
          color: textColor,
        }}
      >
        <div className="h-max w-full lg:w-2/3 flex flex-col items-center justify-center px-2">
          <ImageGallery
            items={item.assets.length > 1 ? itemImages : onlyOneImg}
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={false}
            showNav={false}
            slideInterval={3000}
            showThumbnails={true}
            thumbnailPosition={"bottom"}
          />
        </div>

        <div className="product-info h-full w-full lg:w-1/3 flex flex-col items-center lg:justify-start border-l border-gray-600 border-opacity-60 text-left px-3 md:px-6 gap-6">
          <div className="h-max w-11/12 lg:w-full max-w-lg flex items-center justify-between md:pt-2">
            <h2 className="w-1/2 lg:w-2/3 text-lg md:text-xl text-bold">{item?.name}</h2>
            <span className="text-bold text-md md:text-lg whitespace-nowrap">{item?.price.formatted}&nbsp;€ </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-11/12 max-w-lg bg-blue-500 text-white whitespace-nowrap uppercase py-2"
          >
            add to cart
          </button>
          <div className="w-full flex flex-col items-center justify-center gap-4 self-center">
            <div className="w-max relative px-3">
              <span className="capitalize text-lg md:text-xl">product info</span>
              <span
                style={{ backgroundColor: textColor }}
                className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-1"
              ></span>
            </div>

            <div
              style={{ backgroundColor: descriptionBgColor, color: textColor }}
              className="scrollbar-description h-max max-h-56 w-full max-w-lg md:h-auto overflow-auto p-4 rounded-sm"
              //❌ DOMPURIFY OR SANITIZER NEEDED!!! OR REACT-HTML-PARSER!!
              dangerouslySetInnerHTML={{ __html: item?.description }}
            ></div>
          </div>
        </div>
      </div>
      <div className="related-product border-t border-gray-600 border-opacity-60 bg-black text-gray-300 text-center py-5">
        <div className="w-max relative mx-auto">
          <h2 className="whitespace-nowrap text-lg md:text-xl uppercase px-3">Related Products</h2>
          <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-1 bg-gray-300"></span>
        </div>

        <Carousel responsive={responsive} infinite={true} className="pb-8">
          {item?.related_products.map((related, i) => (
            <div key={i + 1} className="h-36 md:h-60 cursor-pointer" onClick={() => linkToRelatedProduct(related)}>
              <img className="object-contain h-full w-full" src={related.media.source} alt={related.name} />
              <div>{related.name}</div>
            </div>
          ))}
        </Carousel>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

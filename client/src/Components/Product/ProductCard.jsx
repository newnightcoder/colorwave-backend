import React from "react";
import { EyeFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToCart, toggleCartDrawer } from "../../Redux/Actions/cart.action";
import { toggleSearchModal } from "../../Redux/Actions/shop.action";
import "../../Styles/_variables.css";
import useWindowSize from "../../utils/useWindowSize";
import "./product.css";

const ProductCard = ({ item, variants, bgColor, parentProduct }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const searchModalOpen = useSelector((state) => state?.shop.searchModalOpen);
  const limitedItem = item?.categories?.find((cat) => cat.name === "limited");
  const { height, width } = useWindowSize();

  const linkPage = () => {
    if (searchModalOpen) dispatch(toggleSearchModal());
    if (variants !== undefined && variants?.length !== 0) {
      return history.push({
        pathname: `/categories/${item.name}`,
        state: { item, variants: true },
      });
    }
    history.push({
      pathname: `/product/${item.name}`,
      state: { item, parentProduct },
    });
  };

  const handleAddToCart = () => {
    const qty = 1;
    dispatch(addToCart(item, qty));
    dispatch(toggleCartDrawer());
  };

  return (
    <div className="h-52 w-full md:h-64 2xl:h-68 font-cabin group">
      <div
        className="h-44 md:h-56 w-full cursor-pointer relative overflow-hidden"
        style={{ backgroundColor: `${bgColor}` }}
      >
        <img
          // style={{ objectFit: width > 1536 || width < 640 ? "cover" : "contain" }}
          className="h-full w-full relative object-contain transition duration-300 transform group-hover:scale-125"
          src={item && item.media.source}
          alt={item.name}
          onClick={linkPage}
        />
        <div
          style={{ backgroundColor: limitedItem ? "rgba(250,250,250,.5)" : "rgba(0,0,0,.5)" }}
          className="hidden z-10 h-1/4 w-full md:flex items-center justify-between px-2 absolute bottom-0 bg-white transform translate-y-full transition duration-300 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
        >
          <button
            style={{ backgroundColor: limitedItem ? "black" : "white", color: limitedItem ? "white" : "black" }}
            className="flex items-center justify-center space-x-1 uppercase py-2 px-3 rounded-sm text-white text-sm whitespace-nowrap"
            onClick={linkPage}
          >
            <EyeFill size={16} className="text-white" /> <span>view more</span>
          </button>
          <button
            style={{ backgroundColor: limitedItem ? "black" : "white", color: limitedItem ? "white" : "black" }}
            className="uppercase py-2 px-3 rounded-sm text-sm"
            onClick={handleAddToCart}
          >
            buy now
          </button>
        </div>
      </div>
      <div className="w-full h-8 flex items-center justify-center">
        <p className="text-sm md:text-md text-center transition-color duration-300 group-hover:text-blue-500">
          {item && item.name}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

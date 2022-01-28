import React from "react";
import img1 from "../../Assets/categories/banner-1000-controller.png";
import img3 from "../../Assets/categories/banner-1000-iphone.png";
import img2 from "../../Assets/categories/banner-1000-mic.png";
import img4 from "../../Assets/categories/banner-1000-mouse.png";
import useWindowSize from "../../utils/useWindowSize";
import CategoryCard from "./CategoryCard";

const CategoriesGrid = () => {
  const { height, width } = useWindowSize();
  return (
    <div className="h-max w-screen grid grid-cols-1 md:grid-cols-2	bg-sound">
      <CategoryCard
        categoryTitle="gaming"
        bgColor="#F5F5F5"
        img={img1}
        btnColor="blueviolet"
        btnText="white"
        mirror={false}
      />
      <CategoryCard
        categoryTitle="sound"
        bgColor="#fefefe"
        img={img2}
        btnColor="deepskyblue"
        btnText="black"
        mirror={true}
      />
      <CategoryCard
        categoryTitle="skins"
        bgColor={width > 768 ? "#fefefe" : "#F5F5F5"}
        img={img3}
        btnColor="dimgray"
        btnText="white"
        mirror={false}
      />
      <CategoryCard
        categoryTitle="accessories"
        bgColor={width > 768 ? "#F5F5F5" : "#fefefe"}
        img={img4}
        btnColor="yellow"
        btnText="black"
        mirror={true}
      />
    </div>
  );
};

export default CategoriesGrid;

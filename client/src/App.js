import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import { CartDrawer, Navbar } from "./Components";
import SearchModal from "./Components/SearchModal";
import { CartPage, CategoryPage, ConfirmationPage, HomePage, ProductPage, PromotionalPage, ShopPage } from "./Pages";
import { getShopData } from "./Redux/Actions/shop.action";
import useWindowSize from "./utils/useWindowSize";

// persistor.purge();
const App = () => {
  const dispatch = useDispatch();
  const { height, width } = useWindowSize();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Cabin:400,500,600,700"],
      },
    });
    dispatch(getShopData());
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/cart" component={CartPage} />
        <Route path="/success" component={ConfirmationPage} />
        <>
          {/* <Route path="*" component={NotFound} /> */}
          <Navbar />
          <CartDrawer />
          <SearchModal />
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/categories" component={CategoryPage} />
          <Route path="/product" component={ProductPage} />
          <Route path="/promotional" component={PromotionalPage} />
        </>
      </Switch>
    </Router>
  );
};

export default App;

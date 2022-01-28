import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import { CartDrawer, Navbar } from "./Components";
import SearchModal from "./Components/SearchModal";
import {
  CartPage,
  CategoryPage,
  ConfirmationPage,
  HomePage,
  ProductPage,
  PromotionalPage,
  ShopPage,
  SupportPage,
} from "./Pages";
import { getShopData } from "./Redux/Actions/shop.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Cabin:400,500,600,700"],
      },
    });
    dispatch(getShopData);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <>
          <Navbar />
          <CartDrawer />
          <SearchModal />
          <Route path="/shop" component={ShopPage} />
          <Route path="/categories" component={CategoryPage} />
          <Route path="/product" component={ProductPage} />
          <Route path="/promotional" component={PromotionalPage} />
          <Route path="/support" component={SupportPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/success" component={ConfirmationPage} />
          {/* <Route path="*" component={NotFound} /> */}
        </>
      </Switch>
    </Router>
  );
};

export default App;

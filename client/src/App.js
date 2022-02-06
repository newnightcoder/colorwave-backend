import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import { persistor } from "../src/Redux/storeConfig.js";
import { CartDrawer, Navbar } from "./Components";
import SearchModal from "./Components/SearchModal";
import { CartPage, CategoryPage, ConfirmationPage, HomePage, ProductPage, PromotionalPage, ShopPage } from "./Pages";
import { getShopData } from "./Redux/Actions/shop.action";
import useWindowSize from "./utils/useWindowSize";
persistor.purge();

const RefreshRoute = ({ component: Component, redirectionPath, ...rest }) => {
  redirectionPath = redirectionPath ?? "/";
  const perf = performance.getEntriesByType("navigation")[0].toJSON();
  const reloadType = perf.type !== "reload";

  const handler = useCallback((e) => {
    e.preventDefault();
    e.returnValue = "";
    return true;
  }, []);

  useEffect(() => {
    window.onbeforeunload = handler;
    return () => {
      window.onbeforeunload = null;
    };
  });
  return <>{reloadType ? <Route component={ConfirmationPage} /> : <Redirect to={redirectionPath} />}</>;
};

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
        <RefreshRoute path="/success" redirectionPath="/" />
        <>
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
{
  /* <Route path="*" component={NotFound} /> */
}

export default App;

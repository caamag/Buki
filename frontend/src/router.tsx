import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/home";
import ProductPage from "./pages/product/product";

//components
import Header from "./components/molecules/header/header";
import Footer from "./components/atoms/footer/footer";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;

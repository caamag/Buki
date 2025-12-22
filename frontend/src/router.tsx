import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/home";

//components
import Header from "./components/molecules/header/header";
import Footer from "./components/atoms/footer/footer";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;

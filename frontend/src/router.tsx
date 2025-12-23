import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/home";
import ProductPage from "./pages/product/product";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

//components
import Header from "./components/molecules/header/header";
import Footer from "./components/atoms/footer/footer";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <DefaultLayout>
              <ProductPage />
            </DefaultLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

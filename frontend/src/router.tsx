import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/authContext";

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
  const { token } = useAuthContext();

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
        <Route path="/login" element={token ? <Home /> : <Login />} />
        <Route path="/register" element={token ? <Home /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

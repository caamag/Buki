import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/home";

//components
import Header from "./components/molecules/header/header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

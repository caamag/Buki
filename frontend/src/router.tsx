import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages

//components
import Header from "./components/molecules/header/header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={""} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

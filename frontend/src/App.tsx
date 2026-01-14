import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Router from "./router";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router />
    </AuthProvider>
  );
};

export default App;

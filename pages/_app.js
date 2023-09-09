import { store } from "@/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import Navigation from "./component/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navigation />
      <Component {...pageProps} />;
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Provider>
  );
}

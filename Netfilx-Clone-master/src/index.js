import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { DarkModeContextProvider } from './components/context/darkModeContext';
import { AuthContextProvider } from './components/context/authContext';
// import "./scss/volt.scss";
// import "react-datetime/css/react-datetime.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>
);

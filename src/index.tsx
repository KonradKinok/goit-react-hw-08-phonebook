import './globalStyles/index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { store, persistor } from "./components/redux/store";
import { App } from './components/App';

const rootElement = document.getElementById("root");

if (rootElement) {
ReactDOM.createRoot(rootElement).render(
   <React.StrictMode>
   <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
       <BrowserRouter basename="/goit-react-hw-08-phonebook">
         <App />
       </BrowserRouter>
     </PersistGate>
   </Provider>
   </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
};

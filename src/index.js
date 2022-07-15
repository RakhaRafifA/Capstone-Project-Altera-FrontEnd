import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./utils/reportWebVitals";
import axios from "axios";

/** GraphQL Apollo Client */
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";

/** Bootstrap */
import "bootstrap/dist/css/bootstrap.css";

/** Styles */
import "./index.css";

/** Components */
import App from "./App";

axios.defaults.baseURL = "https://api.rafdev.my.id";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

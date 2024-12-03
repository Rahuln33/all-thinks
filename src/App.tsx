import React from "react";
import { Provider } from "react-redux";
import MapContainer from "./pages/map/MapContainer";
import { store } from "./redux/store";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => (
  <Provider store={store}>
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A4D8E8",
      }}
    >
      <MapContainer />
    </div>
  </Provider>
);

export default App;

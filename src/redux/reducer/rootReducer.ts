import { combineReducers } from "redux";
import mapSlice from "./slices/mapSlice";
import geojsonSlice from "./slices/geojsonSlice";
import shapeSlice from "./slices/shapeSlice";

const rootReducer = combineReducers({
  map: mapSlice,
  geojson: geojsonSlice,
  shape: shapeSlice,
});

export default rootReducer;

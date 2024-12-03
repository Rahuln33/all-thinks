import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Shape } from "./geojsonSlice";

type Mode = "Add" | "Update";

interface InitialState {
  type: Shape;
  show: boolean;
  mode: Mode;
  geojson: any;
  uGeojson: any;
}

const initialState: InitialState = {
  type: "Polygon",
  show: false,
  mode: "Add",
  geojson: null,
  uGeojson: null,
};

const shapeSlice = createSlice({
  name: "shape",
  initialState,
  reducers: {
    updateShapeType: (state, action: PayloadAction<Shape>) => {
      state.type = action.payload;
    },
    updateShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    updateGeojson: (state, action: PayloadAction<any>) => {
      state.geojson = action.payload;
      state.mode = "Add";
    },
    updateUGeojson: (state, action: PayloadAction<any>) => {
      state.uGeojson = action.payload;
      state.mode = "Update";
    },
  },
});

export const { updateShapeType, updateShow, updateGeojson, updateUGeojson } =
  shapeSlice.actions;
export default shapeSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../../axios/axiosInstance";
import URLs from "../../../utils/URLs";

export type Shape = "Polygon" | "Circle" | "LineString";

interface UpdateGeoJsonPayload {
  id: string | number;
  data: object;
}

interface GeoJsonState {
  isLoading: boolean;
  show: boolean;
  type: Shape;
  geoJson: object | null;
  addGeoJson: {
    isLoading: boolean;
    data: any;
    error: any;
  };
  updateGeoJson: {
    isLoading: boolean;
    data: any;
    error: any;
  };
  deleteGeoJson: {
    isLoading: boolean;
    data: any;
    error: any;
  };
}

const initialState: GeoJsonState = {
  isLoading: false,
  show: false,
  type: "Polygon",
  geoJson: null,
  addGeoJson: {
    isLoading: false,
    data: null,
    error: null,
  },
  updateGeoJson: {
    isLoading: false,
    data: null,
    error: null,
  },
  deleteGeoJson: {
    isLoading: false,
    data: null,
    error: null,
  },
};

export const getGeojson = createAsyncThunk<AxiosResponse<any>>(
  "api/geojson/get",
  async (_, thunkApi) => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `${URLs.GEO_JSON}`,
      });
      return response?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addGeoJson = createAsyncThunk<AxiosResponse, object>(
  "api/geojson/add",
  async (data, thunkApi) => {
    console.log("data", data);
    return;

    try {
      const response = await axiosInstance({
        method: "POST",
        url: URLs.ADD_GEO_JSON,
        data,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateGeoJson = createAsyncThunk<
  AxiosResponse,
  UpdateGeoJsonPayload
>("api/geojson/update", async ({ id, data }, thunkApi) => {
  try {
    const response = await axiosInstance({
      method: "PATCH",
      url: `${URLs.UPDATE_GEO_JSON}${id}`,
      data,
    });
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteGeoJson = createAsyncThunk<AxiosResponse, string | number>(
  "api/geojson/delete",
  async (id, thunkApi) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: `${URLs.DELETE_GEO_JSON}${id}`,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const geoJsonSlice = createSlice({
  name: "geoJson",
  initialState,
  reducers: {
    setGeoJson(state, action: PayloadAction<object | null>) {
      state.geoJson = action.payload;
    },
    setShow(state, action: PayloadAction<boolean>) {
      state.show = action.payload;
    },
    updateShape(state, action: PayloadAction<Shape>) {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGeojson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGeojson.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.geoJson = action.payload;
      })
      .addCase(getGeojson.rejected, (state) => {
        state.isLoading = false;
        state.geoJson = null;
      })
      .addCase(addGeoJson.pending, (state) => {
        state.addGeoJson.isLoading = true;
        state.addGeoJson.data = null;
      })
      .addCase(addGeoJson.fulfilled, (state, action: PayloadAction<any>) => {
        state.addGeoJson.isLoading = false;
        state.addGeoJson.data = action.payload;
        state.addGeoJson.error = null;
      })
      .addCase(addGeoJson.rejected, (state, action: PayloadAction<any>) => {
        state.addGeoJson.isLoading = false;
        state.addGeoJson.data = null;
        state.addGeoJson.error = action.payload;
      })
      .addCase(updateGeoJson.pending, (state) => {
        state.updateGeoJson.isLoading = true;
        state.updateGeoJson.data = null;
      })
      .addCase(updateGeoJson.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateGeoJson.isLoading = false;
        state.updateGeoJson.data = action.payload;
        state.updateGeoJson.error = null;
      })
      .addCase(updateGeoJson.rejected, (state, action: PayloadAction<any>) => {
        state.updateGeoJson.isLoading = false;
        state.updateGeoJson.data = null;
        state.updateGeoJson.error = action.payload;
      })
      .addCase(deleteGeoJson.pending, (state) => {
        state.deleteGeoJson.isLoading = true;
        state.deleteGeoJson.data = null;
      })
      .addCase(deleteGeoJson.fulfilled, (state, action: PayloadAction<any>) => {
        state.deleteGeoJson.isLoading = false;
        state.deleteGeoJson.data = action.payload;
        state.deleteGeoJson.error = null;
      })
      .addCase(deleteGeoJson.rejected, (state, action: PayloadAction<any>) => {
        state.deleteGeoJson.isLoading = false;
        state.deleteGeoJson.data = null;
        state.deleteGeoJson.error = action.payload;
      });
  },
});

export const { setGeoJson, setShow, updateShape } = geoJsonSlice.actions;
export default geoJsonSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinate } from "ol/coordinate";

interface Details {
  unit_name: string;
  subtype: string;
  epoch: number;
  course: number;
  speed: number;
  height: number;
  depth: number;
}

export interface Marker {
  id: string;
  position: Coordinate;
  type: "Aircraft" | "Submarine";
  details: Details;
}

interface MapState {
  center: Coordinate;
  zoom: number;
  markers: Marker[];
}

const initialState: MapState = {
  center: [68.4924, 20.8902],
  zoom: 6,
  markers: [],
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapCenter: (state, action: PayloadAction<Coordinate>) => {
      state.center = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    setMarkers: (state, action: PayloadAction<Marker[]>) => {
      state.markers = action.payload;
    },
    setMarkerById: (state, action: PayloadAction<Marker>) => {
      const { id, position, details } = action.payload;
      const markerIndex = state.markers.findIndex((marker) => marker.id === id);
      if (markerIndex !== -1) {
        state.markers[markerIndex].position = position;
        state.markers[markerIndex].details = details;
      } else {
        state.markers.push(action.payload);
      }
    },
    removeMarker: (state, action: PayloadAction<string>) => {
      state.markers = state.markers.filter(
        (marker) => marker.id !== action.payload
      );
    },
  },
});

export const {
  setMapCenter,
  setZoom,
  setMarkers,
  setMarkerById,
  removeMarker,
} = mapSlice.actions;
export default mapSlice.reducer;

import React from "react";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import { RLayerVector, RFeature, ROverlay, RPopup } from "rlayers";
import { useAppSelector } from "../../redux/store";
import { Marker as MarkerI } from "../../redux/reducer/slices/mapSlice";
import aircraft from "../../assets/aircraft.png";
import submarine from "../../assets/submarine.png";

const Marker: React.FC = () => {
  const { markers } = useAppSelector((state) => state.map);

  const aircraftH = 48,
    aircraftW = 48,
    submarineH = 48,
    submarineW = 28;

  return (
    <RLayerVector zIndex={10}>
      {markers?.map((marker: MarkerI) => (
        <RFeature<Point>
          geometry={new Point(fromLonLat(marker.position))}
          key={marker.id}
        >
          <ROverlay className="no-interaction">
            <img
              src={marker.type == "Submarine" ? submarine : aircraft}
              style={{
                position: "relative",
                top: -aircraftH / 2,
                left: -aircraftW / 2,
                userSelect: "none",
                pointerEvents: "none",
              }}
              width={marker.type === "Submarine" ? submarineW : aircraftW}
              height={marker.type === "Submarine" ? submarineH : aircraftH}
              alt="marker"
            />
          </ROverlay>
          <RPopup trigger="hover">
            <div
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                width: "200px",
                fontSize: "8px",
                color: "#000",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <p>Unit name: {marker?.details?.unit_name}</p>
              <p>Subtype: {marker?.details?.subtype}</p>
              <p>Speed: {marker?.details?.speed}</p>
              <p>Course: {marker?.details?.course}</p>
              <p>Depth: {marker?.details?.depth}</p>
            </div>
          </RPopup>
        </RFeature>
      ))}
    </RLayerVector>
  );
};

export default Marker;

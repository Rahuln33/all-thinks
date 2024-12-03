import React, { useEffect, useMemo, useState } from "react";
import {
  RMap,
  RLayerVectorTile,
  RLayerVector,
  ROverlay,
  RFeature,
  RStyle,
} from "rlayers";
import { fromLonLat, toLonLat } from "ol/proj";
import { Fill, Stroke, Style } from "ol/style";
import { MVT, GeoJSON } from "ol/format";
import "ol/ol.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
// import useWebSocket from "../../hooks/useWebSocket";
import Marker from "./Marker";
import {
  getGeojson,
  setShow,
  Shape,
  updateShape,
} from "../../redux/reducer/slices/geojsonSlice";
import { Point } from "ol/geom";
import { Coordinate } from "ol/coordinate";
import {
  updateShapeType,
  updateShow,
  updateUGeojson,
} from "../../redux/reducer/slices/shapeSlice";
import locationIcon from "../../assets/location.png";
import { bearing, distance } from "@turf/turf";
import CircleDrawer from "./circle/CircleDrawer";
import PolygonDrawer from "./polygon/PolygonDrawer";
import LineDrawer from "./line/LineDrawer";
import CircleForm from "./circle/CircleForm";
import PolygonForm from "./polygon/PolygonForm";
import LineForm from "./line/LineForm";
import ParrallelForm from "./rectangle/ParrallelForm";
import ParallelTrackDrawer from "./rectangle/ParallelTrackDrawer";
import ExpandingDrawer from "./expaning/ExpaningDrawer";
import ExpaningForm from "./expaning/ExpaningForm";
import ExpandingForm from "./expanding/ExpandingForm";
// import {
//   Coordinate,
//   GeoJson

const format = new MVT();

interface Data {
  location: { lat: number; lng: number };
  bearing: number;
  time: string;
  range: number;
}

interface HoveredFeature {
  location: Coordinate;
  name: string;
  desc: string;
}

const MapContainer: React.FC = () => {
  const { center, zoom } = useAppSelector((state) => state.map);
  const { show, geoJson, isLoading } = useAppSelector((state) => state.geojson);
  const { type } = useAppSelector((state) => state.shape);
  const dispatch = useAppDispatch();

  const [features, setFeatures] = useState<any>(undefined);
  const [parrallelShapes, setParrallelShapes] = useState<any[]>([]);


  

  const [data, setData] = useState<Data>({
    location: { lat: 0, lng: 0 },
    bearing: 0,
    time: new Date().toLocaleTimeString(),
    range: 0,
  });
  const [hoveredFeature, setHoveredFeature] = useState<HoveredFeature | null>(
    null
  );
  const [showPin, setShowPin] = useState<boolean>(false);
  const [loc, setLoc] = useState<Coordinate | null>(null);

  // useWebSocket();

  const style = useMemo(() => {
    return () => {
      return new Style({
        fill: new Fill({
          color: "rgba(245, 232, 39, 0.8)",
        }),
        stroke: new Stroke({ color: "#000000", width: 0.5 }),
      });
    };
  }, []);

  useEffect(() => {
    dispatch(getGeojson());
    dispatch(setShow(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({ ...prev, time: new Date().toLocaleTimeString() }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (geoJson) {
      const filteredFeatures = geoJson.features.filter(
        (feature) => feature.type === "Parrallel"
      );
      // setFeatures(new GeoJSON().readFeatures(filteredFeatures));
    }
  }, [geoJson]);

  useEffect(() => {
    console.log("geoJson", geoJson);

    const x = [
      {
        geometry: {
          coordinates: [
            [
              [8706306.00672304, 2613487.401631483],
              [8092231.035066989, 2601253.004923777],
              [8334435.904365592, 2038470.75636931],
              [8919152.710046055, 2246455.5004003085],
              [8706306.00672304, 2613487.401631483],
            ],
          ],
          type: "Polygon",
        },
        properties: {
          created_at: "2024-12-02T18:59:24.403049",
          description: "xcvxc",
          id: 33,
          name: "xcvzx",
        },

        // radius: null,
        type: "Polygon",
      },
    ];

    // if (geoJson) setFeatures(new GeoJSON().readFeatures(x));
  }, [geoJson]);

  const onClick = (type: Shape) => {
    if (!show) {
      dispatch(setShow(true));
      dispatch(updateShapeType(type));
      dispatch(updateShape(type));
      setShowPin(false);
    }
  };

  const onDblClick = (event: any) => {
    const feature = event.target;
    const geojson = new GeoJSON();
    let geoJson = geojson.writeFeatureObject(feature);
    dispatch(updateUGeojson(geoJson));
    dispatch(updateShow(true));
  };

  const onPointerMove = (e: any) => {
    const { map } = e;
    const [mapLng, mapLat] = map.getCoordinateFromPixel(e.pixel);
    const [longitude, latitude] = toLonLat([mapLng, mapLat]);

    setData((prev) => ({
      ...prev,
      location: { lat: latitude, lng: longitude },
    }));

    if (showPin && loc) {
      setData((prev) => ({
        ...prev,
        range: distance(fromLonLat([longitude, latitude]), loc, {
          units: "nauticalmiles",
        }),
        bearing: bearing(fromLonLat([longitude, latitude]), loc),
      }));
    }
  };

  const onMapClick = (event: any) => {
    const { coordinate } = event;
    const clickedLocation = toLonLat(coordinate);

    const range = distance(fromLonLat(center), clickedLocation),
      _bearing = bearing(fromLonLat(center), clickedLocation);

    setData((prev) => ({
      ...prev,
      location: { lat: clickedLocation[1], lng: clickedLocation[0] },
      range,
      bearing: _bearing,
    }));

    if (showPin) setLoc(clickedLocation);
  };

  useEffect(() => {
    if (!showPin) {
      setData((prev) => ({ ...prev, range: 0, bearing: 0 }));
      setLoc(null);
    }
  }, [showPin]);

  const [showParallelForm, setShowParallelForm] = useState<boolean>(false);
  const onHide = () => setShowParallelForm(false);

  const [showExpandingForm, setShowExpandingForm] =useState<boolean>(false);
  const Hide = () => setShowExpandingForm(false)

  return (
    <div className="map-container">
      <RMap
        initial={{ center: fromLonLat(center), zoom }}
        className="r-map"
        onPointerMove={onPointerMove}
        onClick={onMapClick} 
        >
        <div className="drawing-manager">
          <button
            onClick={() => onClick("LineString")}
            className="drawing-manager-icon"
            aria-label="Circle Shape"
          >
            <i className="bi bi-slash" />
          </button>

          <button
            onClick={() => onClick("Circle")}
            className="drawing-manager-icon"
            aria-label="Circle Shape"
          >
            <i className="bi bi-circle" />
          </button>

          <button
            onClick={() => onClick("Polygon")}
            className="drawing-manager-icon"
            aria-label="Polygon Shape"
          >
            <i className="bi bi-pentagon" />
          </button>
          


          <button
            onClick={() => {
              setShowParallelForm(true);
            }}
            className="drawing-manager-icon"
            aria-label="Parrallel Shape"
          >
            <i className="bi bi-bar-chart-line" />
          </button>

          <button
            onClick={() => {
              setShowPin((prev) => !prev);
            }}
            className="drawing-manager-icon"
            aria-label="Polygon Shape"
          >
            <i className="bi bi-binoculars" />
          </button>
          <button
            onClick={() => {
              setShowExpandingForm(true);
            }}
            className="drawing-manager-icon"
            aria-label="Expanding Shape"
          >
            <i className="bi bi-chevron-expand" />
          </button>

        </div>

        <div className="navigation-param">
          <h4>{`Latitude: ${data.location.lat?.toFixed(2)}`}</h4>
          <p>|</p>
          <h4>{`Longitude: ${data.location.lng.toFixed(2)}`}</h4>
          <p>|</p>
          <h4>{`Bearing: ${data?.bearing.toFixed(2)}°`}</h4>
          <p>|</p>
          <h4>{`Range: ${data.range.toFixed(2)} nm`}</h4>
          <p>|</p>
          <h4>{`Time: ${data.time}`}</h4>
        </div>

        {!isLoading && (
          <RLayerVectorTile
            // url="http://192.168.0.105:5173/coasttile/{z}/{x}/{y}.pbf"
            url={`${window.location}coasttile/{z}/{x}/{y}.pbf`}
            format={format}
            style={style}
          >
            {features && (
              <RLayerVector
                zIndex={10}
                features={features}
                onClick={onDblClick}
                // onPointerMove={onPointerMove}
              >
                {hoveredFeature?.location && (
                  <RFeature
                    geometry={new Point(fromLonLat(hoveredFeature?.location!))}
                  >
                    <ROverlay className="overlay">
                      <h1>{hoveredFeature?.name}</h1>
                      <h2>{hoveredFeature?.desc}</h2>
                    </ROverlay>
                  </RFeature>
                )}
              </RLayerVector>
            )}

            {showPin && loc && (
              <RLayerVector>
                <RFeature geometry={new Point(fromLonLat(loc))}>
                  <RStyle.RStyle>
                    <RStyle.RIcon
                      src={locationIcon}
                      anchor={[0.5, 0.8]}
                      scale={0.05}
                    />
                  </RStyle.RStyle>
                </RFeature>
              </RLayerVector>
            )}

            {show && type === "Circle" && <CircleDrawer />}

            {show && type === "Polygon" && <PolygonDrawer />}

            {show && type === "LineString" && <LineDrawer />}

            {/* {show && type === "Parrallel" && <ParallelTrackDrawer />} */}
          </RLayerVectorTile>
        )}

        <Marker />
      </RMap>

      {type === "Circle" && <CircleForm />}

      {type === "Polygon" && <PolygonForm />}

      {type === "LineString" && <LineForm />}

      {/* {type === "Parrallel" && <ParrallelFrom />} */}

      <ParrallelForm show={showParallelForm} onHide={onHide} />
      <ExpandingForm show={showExpandingForm} onHide={Hide} />
    </div>
  );
};

export default MapContainer;

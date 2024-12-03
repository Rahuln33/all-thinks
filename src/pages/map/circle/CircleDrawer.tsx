import { RInteraction, RLayerVector, RStyle } from "rlayers";
import Circle from "ol/geom/Circle";
import { toLonLat } from "ol/proj";
import { altShiftKeysOnly, shiftKeyOnly } from "ol/events/condition";
import { useAppDispatch } from "../../../redux/store";
import {
  updateGeojson,
  updateShow,
} from "../../../redux/reducer/slices/shapeSlice";
import { setShow } from "../../../redux/reducer/slices/geojsonSlice";

const CircleDrawer = () => {
  const dispatch = useAppDispatch();

  const onDrawEnd = (event: any) => {
    const feature = event.feature;

    if (feature.getGeometry().getType() === "Circle") {
      const circle = feature.getGeometry() as Circle;

      const center = circle.getCenter();
      const radius = circle.getRadius();

      const centerLatLng = toLonLat(center);

      const geoJson = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [[centerLatLng]],
        },
        properties: {
          radius,
        },
      };

      dispatch(updateShow(true));
      dispatch(updateGeojson(geoJson));
      dispatch(setShow(false));
    }
  };

  return (
    <RLayerVector zIndex={1}>
      <RStyle.RStyle>
        <RStyle.RStroke color="#0000FF" width={2} />
        <RStyle.RFill color="rgba(0, 0, 255, 0.1)" />
      </RStyle.RStyle>

      <RInteraction.RDraw
        type="Circle"
        condition={shiftKeyOnly}
        freehandCondition={altShiftKeysOnly}
        onDrawEnd={onDrawEnd}
      />
    </RLayerVector>
  );
};

export default CircleDrawer;

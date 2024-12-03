import { RInteraction, RLayerVector, RStyle } from "rlayers";
import GeoJSON from "ol/format/GeoJSON";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setShow } from "../../../redux/reducer/slices/geojsonSlice";
import {
  updateGeojson,
  updateShow,
} from "../../../redux/reducer/slices/shapeSlice";
import { altShiftKeysOnly, shiftKeyOnly } from "ol/events/condition";

const DrawingManager = () => {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector((state) => state.geojson);

  const onDrawEnd = async (event: any) => {
    const geojson = new GeoJSON();
    const feature = event.feature;

    let geoJson = geojson.writeFeatureObject(feature);

    dispatch(updateShow(true));
    dispatch(updateGeojson(geoJson));
    dispatch(setShow(false));
  };

  return (
    <RLayerVector zIndex={1}>
      <RStyle.RStyle>
        <RStyle.RStroke color="#859F3D" width={2} />
        <RStyle.RFill color="#C4E1F6" />
      </RStyle.RStyle>

      <RInteraction.RDraw
        type={type}
        condition={shiftKeyOnly}
        freehandCondition={altShiftKeysOnly}
        onDrawEnd={onDrawEnd}
      />
    </RLayerVector>
  );
};

export default DrawingManager;

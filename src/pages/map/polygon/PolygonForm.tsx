import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table, Spinner } from "react-bootstrap";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  addGeoJson,
  deleteGeoJson,
  getGeojson,
  updateGeoJson,
} from "../../../redux/reducer/slices/geojsonSlice";
import { updateShow } from "../../../redux/reducer/slices/shapeSlice";
import { toLonLat } from "ol/proj";
import { Feature } from "ol";
import { Polygon } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const PolygonForm: React.FC = () => {
  const { type, show, mode, geojson, uGeojson } = useAppSelector(
    (state) => state.shape
  );
  const {
    deleteGeoJson: { isLoading },
  } = useAppSelector((state) => state.geojson);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [coordinates, setCoordinates] = useState<Array<[number, number]>>([]);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const onClose = () => {
    reset();
    dispatch(updateShow(false));
    setCoordinates([]);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (properties) => {
    const geoJsonData = {
      type: "Feature",
      properties: properties,
      geometry: {} as any,
    };
    const transformedCoordinates = [...coordinates];

    if (transformedCoordinates.length > 0) {
      let feature: Feature = new Feature({
        geometry: new Polygon([transformedCoordinates]),
      });
      const geojsonFormat = new GeoJSON();
      const geoJsonObject = geojsonFormat.writeFeatureObject(feature);

      if (mode === "Update") {
        const updatedGeoJson = {
          ...uGeojson,
          geometry: geoJsonObject.geometry,
        };
        updatedGeoJson.properties = {
          ...properties,
        };
        await dispatch(
          updateGeoJson({ data: updatedGeoJson, id: uGeojson?.properties?.id })
        );
      } else {
        geoJsonData.geometry = geoJsonObject.geometry;
        geoJsonData.properties = properties;
        await dispatch(addGeoJson(geoJsonData));
      }
      setTimeout(() => {
        dispatch(getGeojson());
      }, 1000);
    } else {
      console.error("Invalid coordinates");
    }
    onClose();
  };

  const addCoordinate = () => {
    setCoordinates([...coordinates, [0, 0]]);
  };

  const removeCoordinate = (index: number) => {
    const newCoordinates = coordinates.filter((_, i) => i !== index);
    setCoordinates(newCoordinates);
  };

  const handleCoordinateChange = (
    index: number,
    type: "lat" | "lng",
    value: number
  ) => {
    const updatedCoordinates = [...coordinates];
    if (type === "lng") {
      updatedCoordinates[index][0] = value;
    } else {
      updatedCoordinates[index][1] = value;
    }
    setCoordinates(updatedCoordinates);
  };

  const onDelete = async () => {
    await dispatch(deleteGeoJson(uGeojson?.properties?.id));
    setShowDelete(false);
    onClose();
  };

  useEffect(() => {
    if (mode === "Update" && uGeojson) {
      reset({
        name: uGeojson.properties?.name || "",
        description: uGeojson.properties?.description || "",
      });
      const geoCoordinates =
        uGeojson.geometry?.coordinates?.[0]?.map((coord: number[]) => [
          coord[0],
          coord[1],
        ]) || [];
      setCoordinates(geoCoordinates);
    } else if (mode === "Add" && geojson) {
      reset({
        name: "",
        description: "",
      });
      const geoCoordinates =
        geojson.geometry?.coordinates?.[0]?.map((coord: number[]) => [
          coord[0],
          coord[1],
        ]) || [];
      setCoordinates(geoCoordinates);
    }

    return () => {
      reset();
      setCoordinates([]);
    };
  }, [mode, geojson, uGeojson, reset]);

  return (
    <>
      <Modal show={show} centered onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>{mode === "Add" ? "Add polygon" : "Update polygon"}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formName">
              <Form.Label className="m-0">
                <h3>Name</h3>
              </Form.Label>
              <Form.Control
                type="text"
                {...register("name")}
                placeholder="Enter name"
                isInvalid={!!errors.name}
                size="lg"
                style={{ fontSize: "11px" }}
              />
              <Form.Control.Feedback type="invalid">
                <h4>{errors.name?.message}</h4>
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label className="m-0">
                <h3>Description</h3>
              </Form.Label>
              <Form.Control
                type="text"
                {...register("description")}
                placeholder="Enter description"
                isInvalid={!!errors.description}
                size="lg"
                style={{ fontSize: "11px" }}
              />
              <Form.Control.Feedback type="invalid">
                <h4>{errors.description?.message}</h4>
              </Form.Control.Feedback>
            </Form.Group>

            <div className="mt-3">
              <h3>Coordinates</h3>
              <Table bordered size="sm">
                <thead>
                  <tr className="text-center">
                    <th>
                      <h3>Latitude</h3>
                    </th>
                    <th>
                      <h3>Longitude</h3>
                    </th>
                    <th>
                      <h3>Actions</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coordinates.map((coord, index) => {
                    const [lng, lat] = toLonLat(coord);
                    return (
                      <tr key={index}>
                        <td>
                          <Form.Control
                            type="number"
                            value={lat}
                            onChange={(e) =>
                              handleCoordinateChange(
                                index,
                                "lat",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            size="sm"
                            style={{ fontSize: "10px" }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={lng}
                            onChange={(e) =>
                              handleCoordinateChange(
                                index,
                                "lng",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            size="sm"
                            style={{ fontSize: "10px" }}
                          />
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeCoordinate(index)}
                            style={{ fontSize: "10px" }}
                          >
                            <i className="bi bi-trash" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={addCoordinate}
                  style={{ fontSize: "10px" }}
                >
                  Add Coordinate
                </Button>

                <div className="ms-auto">
                  <Button
                    variant="danger"
                    size="sm"
                    className="me-2"
                    style={{ fontSize: "10px" }}
                    onClick={() => setShowDelete(true)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    style={{ fontSize: "10px" }}
                    type="submit"
                  >
                    {mode === "Add" ? "Add" : "Update"}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showDelete}
        centered
        backdrop
        size="sm"
        onHide={() => setShowDelete(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Confirm Delete</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Are you sure you want to delete this shape?</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDelete(false)}
            size="sm"
            style={{ fontSize: "10px" }}
          >
            Cancel
          </Button>
          {isLoading ? (
            <Spinner animation="border" variant="danger" />
          ) : (
            <Button
              variant="danger"
              onClick={onDelete}
              size="sm"
              style={{ fontSize: "10px" }}
            >
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PolygonForm;

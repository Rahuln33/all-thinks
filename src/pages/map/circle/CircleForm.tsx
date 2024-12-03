import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
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

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const CircleForm: React.FC = () => {
  const { show, mode, geojson, uGeojson } = useAppSelector(
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

  const [circleData, setCircleData] = useState<{
    center: [number, number];
    radius: number;
  } | null>(null);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const onClose = () => {
    reset();
    dispatch(updateShow(false));
    setCircleData(null);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (properties) => {
    if (!circleData) {
      console.error("No circle data available.");
      return;
    }

    const geoJson = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: circleData.center,
      },
      properties: {
        ...properties,
        radius: circleData.radius,
      },
    };

    if (mode === "Update" && uGeojson) {
      await dispatch(
        updateGeoJson({
          data: {
            ...uGeojson,
            geometry: geoJson.geometry,
            properties: geoJson.properties,
          },
          id: uGeojson.properties.id,
        })
      );
    } else {
      await dispatch(addGeoJson(geoJson));
    }

    setTimeout(() => {
      dispatch(getGeojson());
    }, 1000);

    onClose();
  };

  useEffect(() => {
    if (mode === "Update" && uGeojson) {
      reset({
        name: uGeojson.properties?.name || "",
        description: uGeojson.properties?.description || "",
      });

      if (uGeojson.properties?.radius && uGeojson.geometry?.coordinates) {
        setCircleData({
          center: uGeojson.geometry.coordinates,
          radius: uGeojson.properties.radius,
        });
      }
    } else if (mode === "Add" && geojson) {
      reset({ name: "", description: "" });
      setCircleData({
        center: geojson?.geometry?.coordinates?.[0]?.[0],
        radius: geojson?.properties?.radius,
      });
    }

    return () => {
      reset();
      setCircleData(null);
    };
  }, [mode, geojson, uGeojson, reset]);

  const onDelete = async () => {
    if (uGeojson) {
      await dispatch(deleteGeoJson(uGeojson.properties.id));
      setShowDelete(false);
      onClose();
    }
  };

  return (
    <>
      <Modal show={show} centered onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>{mode === "Add" ? "Add circle" : "Update circle"}</h1>
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

            <Form.Group controlId="formLatitude">
              <Form.Label className="m-0">
                <h3>Latitude</h3>
              </Form.Label>
              <Form.Control
                type="number"
                value={circleData?.center?.[1]}
                readOnly
                size="lg"
                style={{ fontSize: "11px" }}
              />
            </Form.Group>

            <Form.Group controlId="formLongitude">
              <Form.Label className="m-0">
                <h3>Longitude</h3>
              </Form.Label>
              <Form.Control
                type="number"
                value={circleData?.center?.[0]}
                readOnly
                size="lg"
                style={{ fontSize: "11px" }}
              />
            </Form.Group>

            <Form.Group controlId="formRadius">
              <Form.Label className="m-0">
                <h3>Radius (meters)</h3>
              </Form.Label>
              <Form.Control
                type="number"
                value={circleData?.radius}
                readOnly
                size="lg"
                style={{ fontSize: "11px" }}
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
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
          <h2>Are you sure you want to delete this circle?</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDelete(false)}
            size="sm"
          >
            Cancel
          </Button>
          {isLoading ? (
            <Spinner animation="border" variant="danger" />
          ) : (
            <Button variant="danger" onClick={onDelete} size="sm">
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CircleForm;

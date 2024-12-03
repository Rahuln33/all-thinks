import React, { useState } from "react";
import imagePath from "../expanding/Screenshot (14).png";

import { Modal } from "react-bootstrap";

interface SearchPatternState {
  initialCourse: number | string;
  Legspacing: number | string;
  numberOfLegs: number | string;
  searchSpeed: number | string;
  name: string;
  color: string;
  altitude: number | string;
  latitude: number | string;
  longitude: number | string;
  searchDistance: number | string;
  searchTime: number | string;
}

interface ExpandingFormp {
  show: boolean;
  Hide: () => void;
}

const ExpandingForm = ({ show, Hide }: ExpandingFormp) => {
  const [formState, setFormState] = useState<SearchPatternState>({
    initialCourse: "",
    Legspacing: "",
    numberOfLegs: "",
    searchSpeed: "",
    name: "Expanding Square",
    color: "#000000",
    altitude: 0,
    latitude: "",
    longitude: "",
    searchDistance: "",
    searchTime: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validate each field
    Object.entries(formState).forEach(([key, value]) => {
      if (!value && key !== "color") {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]:
        name === "color" ||
        name === "name"
          ? value
          : parseFloat(value),
    });
    setErrors({ ...errors, [name]: "" }); // Clear errors on change
  };

  const handleCalculate = () => {
    // Add logic to calculate search distance/time based on latitude and longitude
    if (formState.latitude && formState.longitude) {
      const calculatedDistance = Number(formState.latitude) * 0.1; // Example calculation
      const calculatedTime = Number(formState.longitude) * 0.05; // Example calculation
      setFormState({
        ...formState,
        searchDistance: calculatedDistance.toFixed(2),
        searchTime: calculatedTime.toFixed(2),
      });
      alert("Calculation completed!");
      console.log(handleCalculate)
    } else {
      alert("Please enter valid Latitude and Longitude values.");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(formState).forEach((key) => {
      const value = formState[key as keyof SearchPatternState];
      if (
        !value &&
        value !== 0 &&
        key !== "searchDistance" &&
        key !== "searchTime"
      ) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formState);
      alert("Form submitted successfully!");
    }
    console.log("Form submitted:", formState);
  };

  return (
    <Modal show={show} centered onHide={Hide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1>{"Add search pattern"}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container mt-4">
          <form
            className="border p-4 rounded shadow-sm"
            style={{ fontSize: "11px" }}
            onSubmit={handleSubmit}
          >
            <h1 className="text-center mb-4">Expending Search </h1>

            <div className="row">
              {/* Left Side - Form Fields */}
              <div className="col-md-6">
                {/* Row for Initial Leg Course */}
                <div className="mb-3">
                  <label className="form-label">
                    <h2>Initial Leg Course</h2>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="initialCourse"
                    value={formState.initialCourse}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
                  />
                </div>

                {/* Row for Search Leg Length */}
                <div className="mb-3">
                  <label className="form-label">
                    <h2>Search Leg Length</h2>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="Legspacing"
                    value={formState.Legspacing}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
                  />
                </div>


                {/* Row for Number of Legs */}
                <div className="mb-3">
                  <label className="form-label">
                    <h2>Number of Legs</h2>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="numberOfLegs"
                    value={formState.numberOfLegs}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
                  />
                </div>

                {/* Row for Search Speed */}
                <div className="mb-3">
                  <label className="form-label">
                    <h2>Search Speed</h2>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="searchSpeed"
                    value={formState.searchSpeed}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
                  />
                </div>

                {/* Row for Name */}
                <div className="mb-3">
                  <label className="form-label">
                    <h2>Name</h2>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
                  />
                </div>

                {/* Row for Color */}
                <div className="mb-3">
                  <label className="form-label">
                    <h2>Color</h2>
                  </label>
                  <input
                    type="color"
                    className="form-control form-control-color"
                    name="color"
                    value={formState.color}
                    onChange={handleInputChange}
                    style={{ fontSize: "20px", width:"190px" }}
                  />
                </div>

                {/* Row for Altitude */}
                <div className="mb-3">
                  <label className="form-label">
                    <h4>Altitude</h4>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="altitude"
                    value={formState.altitude}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
                  />
                </div>
              </div>
              {/* Right Side - Image & Checkboxes */}
              <div className="col-md-6">
                <div>
                  <img
                    src={imagePath}
                    alt="Description"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>


                {/* Checkboxes for Icons */}
                <div className="mt-3 d-flex flex-row">
                  
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="waypoint"
                    />
                    <div className="form-check">
                    <label className="form-check-label" htmlFor="waypoint">
                     <h2> Waypoint Name </h2></label>
                  </div>
                  <div className="form-check">
                    
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="icons"
                    />
                    <label className="form-check-label" htmlFor="icons">
                      <h2> Icons</h2>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Row for Latitude, Longitude, and Calculate Button */}
            <div className="d-flex flex-row" style={{ width :"350px" }} >
              {/* Left side: Latitude and Longitude */}
              <div className="col-md-6">
                <label className="form-label"> <h2> Latitude </h2></label>
                <input
                  type="number"
                  className="form-control"
                  name="latitude"
                  value={formState.latitude}
                  onChange={handleInputChange}
                />
                <label className="form-label mt-2"> <h2> Longitude </h2></label>
                <input
                  type="number"
                  className="form-control"
                  name="longitude"
                  value={formState.longitude}
                  onChange={handleInputChange}
                />
                 <label className="form-label"> <h2> Search Distance (NM) </h2></label>
                  <input
                    type="number"
                    className="form-control mb-2"
                    name="searchDistance"
                    value={formState.searchDistance}
                    readOnly
                  />
                  <label className="form-label"> <h2>Search Time (hr) </h2></label>
                  <input
                    type="number"
                    className="form-control"
                    name="searchTime"
                    value={formState.searchTime}
                    readOnly
                  />
                  

              </div>
              <div className="">
              <button
                    type="button"
                    className="btn btn-primary button"
                    onClick={handleCalculate}
                  >
                    Calculate
                  </button>
              </div>

              

              {/* Right side: Calculate Button, Search Distance, and Search Time */}
              <div className="col-md-6">
                <div className="d-flex flex-row" style={{ width : "100px"}}>

                                  </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="reset"
                className="btn btn-secondary btn-sm"
                style={{ fontSize: "10px" }}
                onClick={() =>
                  setFormState({
                    initialCourse: "",
                    Legspacing: "",
                    numberOfLegs: "",
                    searchSpeed: "",
                    name: "Expanding Square",
                    color: "#000000",
                    altitude: "",
                    latitude: "",
                    longitude: "",
                    searchDistance: "",
                    searchTime: "",
                  })
                }
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn btn-success btn-sm"
                style={{ fontSize: "10px" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ExpandingForm;

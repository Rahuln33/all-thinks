// import React, { useState } from "react";
// import imagePath from "./parallel.png";

// interface SearchPatternState {
//   initialLegCourse: number;
//   searchLegLength: number;
//   trackSpace: number;
//   numberOfLegs: number;
//   searchSpeed: number;
//   routeForShip: string;
//   firstTurn: string;
//   name: string;
//   color: string;
//   altitude: number;
// }

// const SearchPatterns: React.FC = () => {
//   const [formState, setFormState] = useState<SearchPatternState>({
//     initialLegCourse: 0,
//     searchLegLength: 0,
//     trackSpace: 0,
//     numberOfLegs: 0,
//     searchSpeed: 0,
//     routeForShip: "1 unit only",
//     firstTurn: "STARBOARD",
//     name: "Parallel Track",
//     color: "#000000",
//     altitude: 0,
//   });

//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = event.target;
//     setFormState({
//       ...formState,
//       [name]:
//         name === "color" ||
//         name === "routeForShip" ||
//         name === "firstTurn" ||
//         name === "name"
//           ? value
//           : parseFloat(value),
//     });
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     console.log("Form submitted:", formState);
//   };

//   return (
//     <div className="container mt-4">
//       <form
//         className="border p-4 rounded shadow-sm"
//         style={{ fontSize: "11px" }}
//         onSubmit={handleSubmit}
//       >
//         <h3 className="text-center mb-4">Search Patterns</h3>

//         {/* Row for Initial Leg Course, Search Leg Length, and Track Space */}
//         <div className="row mb-3">
//           <div className="col">
//             <label className="form-label">
//               <h4>Initial Leg Course</h4>
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               name="initialLegCourse"
//               value={formState.initialLegCourse}
//               onChange={handleInputChange}
//               style={{ fontSize: "10px" }}
//             />
//           </div>

//           <div className="col">
//             <label className="form-label">
//               <h4>Search Leg Length</h4>
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               name="searchLegLength"
//               value={formState.searchLegLength}
//               onChange={handleInputChange}
//               style={{ fontSize: "10px" }}
//             />
//           </div>

//           <div className="col">
//             <label className="form-label">
//               <h4>Track Space</h4>
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               name="trackSpace"
//               value={formState.trackSpace}
//               onChange={handleInputChange}
//               style={{ fontSize: "10px" }}
//             />
//           </div>
//         </div>
//         {/* Image */}
//         <div>
//           <img
//             src={imagePath}
//             alt="Description"
//             style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
//           />
//         </div>
//         {/* Row for Number of Legs, Search Speed */}
//         <div className="row mb-3">
//           <div className="col">
//             <label className="form-label">
//               <h4>Number of Legs</h4>
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               name="numberOfLegs"
//               value={formState.numberOfLegs}
//               onChange={handleInputChange}
//               style={{ fontSize: "10px" }}
//             />
//           </div>

//           <div className="col">
//             <label className="form-label">
//               <h4>Search Speed</h4>
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               name="searchSpeed"
//               value={formState.searchSpeed}
//               onChange={handleInputChange}
//               style={{ fontSize: "10px" }}
//             />
//           </div>
//         </div>

//         {/* Row for Route for Ship, First Turn */}
//         <div className="row mb-3">
//           <div className="col">
//             <label className="form-label">
//               <h4>Route for Ship</h4>
//             </label>
//             <select
//               className="form-select"
//               name="routeForShip"
//               value={formState.routeForShip}
//               onChange={handleInputChange}
//               style={{ fontSize: "10px" }}
//             >
//               <option value="1 unit only">1 unit only</option>
//               <option value="2 units">2 units</option>
//             </select>
//           </div>

//           <div className="col">
//             <label className="form-label">
//               <h4>First Turn</h4>
//             </label>
//             <select
//               className="form-select"
//               name="firstTurn"
//               value={formState.firstTurn}
//               onChange={handleInputChange}
//               style={{ fontSize: "10px" }}
//             >
//               <option value="STARBOARD">Starboard</option>
//               <option value="PORT">Port</option>
//             </select>
//           </div>
//         </div>

//         {/* Input for Name, Color */}
//         <div className="row mb-3">
//           <div className="col">
//             <label className="form-label">
//               <h4>Name</h4>
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               value={formState.name}
//               onChange={handleInputChange}
//               style={{ fontSize: "10px" }}
//             />
//           </div>

//           <div className="col">
//             <label className="form-label">
//               <h4>Color</h4>
//             </label>
//             <input
//               type="color"
//               className="form-control form-control-color"
//               name="color"
//               value={formState.color}
//               onChange={handleInputChange}
//               style={{ fontSize: "10px" }}
//             />
//           </div>
//         </div>

//         {/* Input for Altitude */}
//         <div className="mb-3">
//           <label className="form-label">
//             <h4>Altitude</h4>
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             name="altitude"
//             value={formState.altitude}
//             onChange={handleInputChange}
//             style={{ fontSize: "10px" }}
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="d-flex justify-content-between mt-4">
//           <button
//             type="reset"
//             className="btn btn-secondary btn-sm"
//             style={{ fontSize: "10px" }}
//             onClick={() =>
//               setFormState({
//                 initialLegCourse: 45,
//                 searchLegLength: 200,
//                 trackSpace: 40,
//                 numberOfLegs: 5,
//                 searchSpeed: 25,
//                 routeForShip: "1 unit only",
//                 firstTurn: "STARBOARD",
//                 name: "Parallel Track",
//                 color: "#000000",
//                 altitude: 0,
//               })
//             }
//           >
//             Reset
//           </button>
//           <button
//             type="submit"
//             className="btn btn-success btn-sm"
//             style={{ fontSize: "10px" }}
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchPatterns;

import React, { useState } from "react";
import imagePath from "./parallel.png";
import ParallelTrackDrawer from ".ParallelTrackDrawer";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface SearchPatternState {
  initialLegCourse: number | string;
  searchLegLength: number | string;
  trackSpace: number | string;
  numberOfLegs: number | string;
  searchSpeed: number | string;
  routeForShip: string;
  firstTurn: string;
  name: string;
  color: string;
  altitude: number | string;
  latitude: number | string;
  longitude: number | string;
  searchDistance: number | string;
  searchTime: number | string;
}

interface ParrallelFormP {
  show: boolean;
  onHide: () => void;
}

const ParrallelForm = ({ show, onHide }: ParrallelFormP) => {
  const [formState, setFormState] = useState<SearchPatternState>({
    initialLegCourse: "",
    searchLegLength: "",
    trackSpace: "",
    numberOfLegs: "",
    searchSpeed: "",
    routeForShip: "1 unit only",
    firstTurn: "STARBOARD",
    name: "Parallel Track",
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
        name === "routeForShip" ||
        name === "firstTurn" ||
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
    <Modal show={show} centered onHide={onHide}>
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
            <h3 className="text-center mb-4">Parrallel</h3>

            <div className="row">
              {/* Left Side - Form Fields */}
              <div className="col-md-6">
                {/* Row for Initial Leg Course */}
                <div className="mb-3">
                  <label className="form-label">
                    <h5>Initial Leg Course</h5>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="initialLegCourse"
                    value={formState.initialLegCourse}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
                  />
                </div>

                {/* Row for Search Leg Length */}
                <div className="mb-3">
                  <label className="form-label">
                    <h4>Search Leg Length</h4>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="searchLegLength"
                    value={formState.searchLegLength}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
                  />
                </div>

                {/* Row for Track Space */}
                <div className="mb-3">
                  <label className="form-label">
                    <h4>Track Space</h4>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="trackSpace"
                    value={formState.trackSpace}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
                  />
                </div>

                {/* Row for Number of Legs */}
                <div className="mb-3">
                  <label className="form-label">
                    <h4>Number of Legs</h4>
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
                    <h4>Search Speed</h4>
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
                    <h4>Name</h4>
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
                    <h4>Color</h4>
                  </label>
                  <input
                    type="color"
                    className="form-control form-control-color"
                    name="color"
                    value={formState.color}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
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
                {/* Row for Route for Ship */}
                <div className="mb-3">
                  <label className="form-label">
                    <h4>Route for Ship</h4>
                  </label>
                  <select
                    className="form-select"
                    name="routeForShip"
                    value={formState.routeForShip}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
                  >
                    <option value="1 unit only">1 unit only</option>
                    <option value="2 units">2 units</option>
                  </select>
                </div>

                {/* Row for First Turn */}
                <div className="mb-3">
                  <label className="form-label">
                    <h4>First Turn</h4>
                  </label>
                  <select
                    className="form-select"
                    name="firstTurn"
                    value={formState.firstTurn}
                    onChange={handleInputChange}
                    style={{ fontSize: "10px" }}
                  >
                    <option value="STARBOARD">Starboard</option>
                    <option value="PORT">Port</option>
                  </select>
                </div>

                {/* Checkboxes for Icons */}
                <div className="mt-3 d-flex flex-row">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="waypoint">
                      Waypoint Name
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="waypoint"
                    />
                  </div>
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="icons">
                      Icons
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="icons"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Row for Latitude, Longitude, and Calculate Button */}
            <div className="row mb-3 align-items-center">
              {/* Left side: Latitude and Longitude */}
              <div className="col-md-6">
                <label className="form-label">Latitude</label>
                <input
                  type="number"
                  className="form-control"
                  name="latitude"
                  value={formState.latitude}
                  onChange={handleInputChange}
                />
                <label className="form-label mt-2">Longitude</label>
                <input
                  type="number"
                  className="form-control"
                  name="longitude"
                  value={formState.longitude}
                  onChange={handleInputChange}
                />
              </div>

              {/* Right side: Calculate Button, Search Distance, and Search Time */}
              <div className="col-md-6">
                <div className="d-flex flex-column">
                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={handleCalculate}
                  >
                    Calculate
                  </button>
                  <label className="form-label">Search Distance (NM)</label>
                  <input
                    type="number"
                    className="form-control mb-2"
                    name="searchDistance"
                    value={formState.searchDistance}
                    readOnly
                  />
                  <label className="form-label">Search Time (hr)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="searchTime"
                    value={formState.searchTime}
                    readOnly
                  />
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
                    initialLegCourse: "",
                    searchLegLength: "",
                    trackSpace: "",
                    numberOfLegs: "",
                    searchSpeed: "",
                    routeForShip: "1 unit only",
                    firstTurn: "STARBOARD",
                    name: "Parallel Track",
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

export default ParrallelForm;

import React from "react";

interface ParallelTrackProps {
  initialLegCourse: number;
  searchLegLength: number;
  trackSpace: number;
  numberOfLegs: number;
  color: string;
}

const ParallelTrackDrawer: React.FC<ParallelTrackProps> = ({
  initialLegCourse,
  searchLegLength,
  trackSpace,
  numberOfLegs,
  color,
}) => {
  const renderTrack = () => {
    const tracks = [];
    const angleInRadians = (initialLegCourse * Math.PI) / 180;
    const xOffset = Math.cos(angleInRadians) * searchLegLength;
    const yOffset = Math.sin(angleInRadians) * searchLegLength;

    for (let i = 0; i < numberOfLegs; i++) {
      const xStart = i * trackSpace;
      const yStart = 0;
      const xEnd = xStart + xOffset;
      const yEnd = yStart + yOffset;

      tracks.push(
        <line
          key={i}
          x1={xStart}
          y1={yStart}
          x2={xEnd}
          y2={yEnd}
          stroke={color}
          strokeWidth="2"
        />
      );
    }
    return tracks;
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h4>Parallel Track Visualization</h4>
      <svg
        width="500"
        height="500"
        viewBox="-50 -50 500 500"
        style={{
          background: "#f9f9f9",
          display: "block",
          margin: "0 auto",
        }}
      >
        <g>{renderTrack()}</g>
      </svg>
    </div>
  );
};

export default ParallelTrackDrawer;

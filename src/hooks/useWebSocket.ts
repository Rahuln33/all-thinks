import { useEffect } from "react";
import { setMarkerById } from "../redux/reducer/slices/mapSlice";
import { useAppDispatch } from "../redux/store";

const WS_URL = "ws://192.168.0.104:5001";

const useWebSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      try {
        const data = event.data.trim();
        if (data && data[0] === "{" && data[data.length - 1] === "}") {
          const parsedData = JSON.parse(data);
          console.log("parsedData", parsedData);
          if (
            parsedData?.unit_name &&
            parsedData?.latitude &&
            parsedData?.longitude
          ) {
            dispatch(
              setMarkerById({
                id: parsedData.unit_name,
                position: [parsedData.longitude, parsedData.latitude],
                type:
                  parsedData.subtype === "Passenger Plane"
                    ? "Aircraft"
                    : "Submarine",
                details: {
                  unit_name: parsedData.unit_name,
                  subtype: parsedData.subtype,
                  epoch: parsedData.epoch,
                  course: parsedData.course,
                  speed: parsedData.speed,
                  height: parsedData.height,
                  depth: parsedData.depth,
                },
              })
            );
          }
        } else {
          console.error("Invalid JSON format:", data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  return null;
};

export default useWebSocket;

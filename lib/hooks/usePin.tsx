import { PinContext } from "../context/pin/PinContext";
import { useContext } from "react";

export const usePin = () => {
  const context = useContext(PinContext);

  if (!context) {
    throw new Error("usePin must be used within a PinProvider");
  }

  return context;
};

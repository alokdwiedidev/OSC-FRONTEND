import React from "react";
import "./Status.css";
import { useSelector } from "react-redux";

const Status = ({className}) => {
  const {isSocketConnected: connected} = useSelector(state => state.dashboardSlice)
  return (
    <div
      className={`status-root ${connected ? "connected" : ""} ${
        className || ""
      }`}
    >
      <h4>{connected ? "Live" : "Connecting"}</h4>
    </div>
  );
};

export default Status;

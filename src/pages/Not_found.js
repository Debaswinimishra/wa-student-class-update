import React from "react";
import defaultNotFound from "../assests/not_found.jpg";

const NotFound = () => {
  return (
    <div style={{ maxHeight: "40%", maxWidth: "40%", margin: "auto" }}>
      <img
        src={defaultNotFound}
        alt="Not Found"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default NotFound;

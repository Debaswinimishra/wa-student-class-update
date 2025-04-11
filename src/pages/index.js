import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    const isGridPath = location.pathname.startsWith("/grid=");

    if (!isGridPath && path) {
      const uniqueId = Math.floor(100000 + Math.random() * 900000);
      navigate(`/grid=${uniqueId}&grname="${encodeURIComponent(path)}"`, {
        replace: true,
      });
    }
  }, [location, navigate]);

  const match = location.pathname.match(/grid=(\d+)&grname=(.+)/);
  const grid = match?.[1];
  const grname = match?.[2];

  return (
    <div style={{ padding: "20px" }}>
      {/* {grid && grname ? (
        <>
          <h2>Unique ID: {grid}</h2>
          <h3>You are viewing: {decodeURIComponent(grname)}</h3>
        </>
      ) : ( */}
      <h3>Hello World</h3>
      {/* )} */}
    </div>
  );
};

export default Page;

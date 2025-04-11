import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../pages/Not_found";

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

  // Validate expected pattern: grid=123456&grname=something
  const { id } = useParams();
  const isValid = id?.match(/^grid=\d{6}&grname=.+$/);

  if (isValid) {
    return <div>hye</div>;
  }
  //--------------------------------------------------------

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
      <h3>
        <NotFound />
      </h3>
      {/* )} */}
    </div>
  );
};

export default Page;

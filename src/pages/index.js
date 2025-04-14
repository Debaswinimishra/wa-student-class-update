import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../pages/Not_found";

const Page = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(window.location.search);
  console.log("params=============>", params);

  const groupId = params.get("groupId");
  console.log("groupId=============>", groupId);

  const participants = JSON.parse(params.get("participants"));
  console.log("participants=============>", participants);

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    const isGridPath = location.pathname.startsWith("/grid=");

    if (!isGridPath && path) {
      // const uniqueId = Math.floor(100000 + Math.random() * 900000);
      const uniqueId = "120363418298125186@g.us";
      // navigate(`/grid=${uniqueId}&grname="${encodeURIComponent(path)}"`, {
      navigate(`/grid=${uniqueId}`, {
        replace: true,
      });
    }
  }, [location, navigate]);

  const match = location.pathname.match(/grid=(\d+)&grname=(.+)/);

  // Validate expected pattern: grid=123456&grname=something
  const { id } = useParams();
  const isValid = id?.match(/^grid=\d{6}&grname=.+$/);

  if (isValid) {
    return (
      <div>
        {" "}
        <NotFound />
      </div>
    );
  }
  //--------------------------------------------------------

  const grid = match?.[1];
  const grname = match?.[2];

  return (
    <div style={{ padding: "20px" }}>
      {participants?.map((participant, index) => {
        return (
          <div key={index}>
            <h1>
              {index}. Participant {index + 1}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Page;

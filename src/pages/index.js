import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../pages/Not_found";

const Page = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(window.location.search);
  const groupId = params.get("groupId");
  const participants = JSON.parse(params.get("participants") || "[]");

  const [childName, setChildName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchParticipant, setSearchParticipant] = useState("");

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    const isGridPath = location.pathname.startsWith("/grid=");

    if (!isGridPath && path) {
      const uniqueId = "120363418298125186@g.us";
      navigate(`/grid=${uniqueId}`, {
        replace: true,
      });
    }
  }, [location, navigate]);

  const match = location.pathname.match(/grid=(\d+)&grname=(.+)/);
  const { id } = useParams();
  const isValid = id?.match(/^grid=\d{6}&grname=.+$/);

  if (isValid) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  useEffect(() => {
    if (searchParticipant.trim() === "") {
      setFilteredParticipants([]);
    } else {
      const filtered = participants.filter((p) =>
        p.toLowerCase().includes(searchParticipant.toLowerCase())
      );
      setFilteredParticipants(filtered);
    }
  }, [searchParticipant, participants]);

  const grid = match?.[1];
  const grname = match?.[2];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <label>Enter your child name:</label>
        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder="Child Name"
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Select your class: </label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="">-- Select Class --</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Class {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Search participant: </label>
        <input
          type="text"
          value={searchParticipant}
          onChange={(e) => setSearchParticipant(e.target.value)}
          placeholder="Type to search..."
          style={{ marginLeft: "10px", padding: "5px" }}
        />
        {filteredParticipants.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              marginTop: "10px",
              border: "1px solid #ccc",
              maxHeight: "100px",
              overflowY: "auto",
            }}
          >
            {filteredParticipants.map((p, index) => (
              <li
                key={index}
                style={{ padding: "5px", cursor: "pointer" }}
                onClick={() => setSearchParticipant(p)}
              >
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>All Participants</h2>
        {participants.map((participant, index) => (
          <div key={index}>
            <h4>
              {index + 1}. Participant No. {participant}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

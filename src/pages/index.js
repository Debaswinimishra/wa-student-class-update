import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../pages/Not_found";
import { AutoComplete, Input, Select } from "antd";

const { Option } = Select;

const Page = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(window.location.search);
  const groupId = params.get("groupId");
  const participants = JSON.parse(params.get("participants") || "[]");

  console.log("participants----------->", participants);

  const [childName, setChildName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
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

  const autoCompleteOptions = participants.map((p) => ({
    value: p,
    label: `Participant No. ${p}`,
  }));
  const handleSave = () => {
    console.log("Child Name:", childName);
    console.log("Class:", selectedClass);
    console.log("Selected Participant:", searchParticipant);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <label>Enter your child name:</label>
        <Input
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder="Child Name"
          style={{ width: "300px", marginLeft: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Select your class: </label>
        <Select
          value={selectedClass}
          onChange={(value) => setSelectedClass(value)}
          style={{ width: 200, marginLeft: "10px" }}
          placeholder="-- Select Class --"
        >
          {[...Array(10)].map((_, i) => (
            <Option key={i + 1} value={i + 1}>
              Class {i + 1}
            </Option>
          ))}
        </Select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Search Participant:</label>
        <AutoComplete
          options={autoCompleteOptions}
          style={{ width: 300, marginLeft: "10px" }}
          placeholder="Type participant number..."
          value={searchParticipant}
          onChange={setSearchParticipant}
          filterOption={(inputValue, option) =>
            option?.value?.toLowerCase().includes(inputValue.toLowerCase())
          }
        />
      </div>
      <button
        onClick={handleSave}
        style={{
          padding: "8px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Save
      </button>

      {/* <div>
        {participants.map((participant, index) => (
          <div key={index}>
            <h4>
              {index + 1}. Participant No. {participant}
            </h4>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Page;

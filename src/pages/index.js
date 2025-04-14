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
  const fetchData = JSON.parse(params.get("data") || "[]");
  console.log("fetchData---------------------->", fetchData);

  console.log("participants----------->", participants);

  const [childName, setChildName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [searchParticipant, setSearchParticipant] = useState("");

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    const isGridPath = location.pathname.startsWith("/data=");

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

  const autoCompleteOptions = (fetchData?.participants || [])?.map((p) => ({
    value: String(p.user),
    label: String(p.user),
  }));

  console.log("autoCompleteOptions===============?>", autoCompleteOptions);

  const handleSave = () => {
    console.log("Child Name:", childName);
    console.log("Class:", selectedClass);
    console.log("Selected Participant:", searchParticipant);
    window.location.href = "https://www.whatsapp.com";
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Child Registration</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>District name:</label>
          <Input
            value={fetchData.district}
            // onChange={(e) => setChildName(e.target.value)}
            // placeholder="Child Name"
            style={styles.input}
            disabled={true}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category:</label>
          <Input
            value={fetchData.groupCategory}
            // onChange={(e) => setChildName(e.target.value)}
            // placeholder="Child Name"
            style={styles.input}
            disabled={true}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>GroupName:</label>
          <Input
            value={fetchData.groupName}
            // onChange={(e) => setChildName(e.target.value)}
            // placeholder="Child Name"
            style={styles.input}
            disabled={true}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Enter your child name:</label>
          <Input
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="Child Name"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Select your class:</label>
          <Select
            value={selectedClass}
            onChange={(value) => setSelectedClass(value)}
            style={styles.input}
            placeholder="-- Select Class --"
          >
            {[...Array(10)].map((_, i) => (
              <Option key={i + 1} value={i + 1}>
                Class {i + 1}
              </Option>
            ))}
          </Select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Search Participant:</label>
          <AutoComplete
            options={autoCompleteOptions}
            style={styles.input}
            placeholder="Type participant number..."
            value={searchParticipant}
            onChange={(e) => searchParticipant(e)}
            onSearch={(val) => setSearchParticipant(val)} // to enable search filtering
            filterOption={(inputValue, option) =>
              option?.label?.toLowerCase().includes(inputValue.toLowerCase())
            }
          />
        </div>

        <button onClick={handleSave} style={styles.button}>
          Save
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "green",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "lightgreen",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
    fontSize: "22px",
    color: "#333",
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "500",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    width: "100%",
    height: "40px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

// Responsive styles using media query
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @media (max-width: 600px) {
      .ant-select, .ant-input, .ant-select-selector {
        font-size: 14px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Page;

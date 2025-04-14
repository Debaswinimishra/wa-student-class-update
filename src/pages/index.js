import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../pages/Not_found";
import { AutoComplete, Input, Select } from "antd";
import backgroundImg from "../assests/peakpx.jpg";
import axios from "axios";

const { Option } = Select;

const Page = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(window.location.search);
  const groupId = params.get("groupId");
  const fetchData = JSON.parse(params.get("data") || "[]");
  console.log("fetchData---------------------->", fetchData);

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
    value: String(p),
    label: String(p),
  }));

  console.log("autoCompleteOptions===============?>", autoCompleteOptions);

  const handleSave = async () => {
    // console.log("Child Name:", childName);
    // console.log("Class:", selectedClass);
    // console.log("Selected Participant:", searchParticipant);
    // window.location.href = "whatsapp://";

    // setTimeout(function () {
    //   window.location.href = "https://wa.me";
    // }, 500);

    if (!selectedClass || !searchParticipant) {
      alert("Please select a class and participant number before saving.");
      return;
    }

    try {
      const body = {
        anganwadi: fetchData.anganwadi,
        block: fetchData.block,
        cluster: fetchData.cluster,
        district: fetchData.district,
        groupCategory: fetchData.groupCategory,
        groupId: fetchData.groupId,
        groupName: fetchData.groupName,
        participants: fetchData.participants,
        project: fetchData.project,
        school: fetchData.school,
        sector: fetchData.sector,
        studentId: new Date().getTime(),
        studentName: childName,
        class: selectedClass,
        phoneNumber: searchParticipant,
        academicType: fetchData.groupCategory,
        parentsName: "",
      };

      console.log("body sent in API-------------->", body);

      const response = await axios.post(
        "https://tatvagyan.in/tz/saveWaValidatedClass",
        body
      );
      console.log("response------------------->", response);

      if (
        response.status === 200 ||
        response.payload.status === 200 ||
        response.data.statusCode === 200
      ) {
        window.location.href =
          "intent://send/#Intent;package=com.whatsapp;scheme=whatsapp;end;";

        alert("");
      }
    } catch (error) {
      console.error("error is-------->", error);
    }
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

        {/* <div style={styles.formGroup}>
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
        </div> */}

        <Select
          value={selectedClass}
          onChange={(value) => setSelectedClass(value)}
          style={styles.input}
          placeholder="-- Select Class --"
        >
          {Array.from(
            {
              length: fetchData?.groupCategory?.toLowerCase().includes("school")
                ? 10
                : 3,
            },
            (_, i) => (
              <Option key={i + 1} value={i + 1}>
                Class {i + 1}
              </Option>
            )
          )}
        </Select>

        <div style={styles.formGroup}>
          <label style={styles.label}>Search Participant:</label>
          <AutoComplete
            options={autoCompleteOptions}
            style={styles.input}
            placeholder="Type participant number..."
            value={searchParticipant}
            onChange={(e) => setSearchParticipant(e.target.value)}
            onSearch={(val) => setSearchParticipant(val)}
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
    minHeight: "90vh",
    // backgroundImage: `url(${backgroundImg})`,
    backgroundColor: "rgb(152,251,152)",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxHeight: "84%",
    backgroundImage: `url(${backgroundImg})`,
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
    border: "solid black 1px",
    color: "",
  },
  button: {
    width: "40%",
    padding: "10px",
    backgroundColor: " rgb(60,179,113)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "10px",
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

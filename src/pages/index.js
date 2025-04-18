import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../pages/Not_found";
import { AutoComplete, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import backgroundImg from "../assests/peakpx.jpg";
import axios from "axios";
// import Swal from "sweetalert2";

const { Option } = Select;

const Page = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(window.location.search);
  const fetchData = JSON.parse(params.get("data") || "[]");

  const [children, setChildren] = useState([
    { childName: "", selectedClass: "", gender: "" },
  ]);

  const [searchedParticipant, setSearchedParticipant] = useState("");

  console.log("searched Participants------------>", searchedParticipant);

  const autoCompleteOptions = (fetchData?.participants || []).map((p) => ({
    value: String(p),
    label: String(p),
  }));

  const participantOnChange = (value) => {
    console.log("value---------->>", value);
    setSearchedParticipant(value);
  };

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    const isGridPath = location.pathname.startsWith("/data=");

    if (!isGridPath && path) {
      const uniqueId = "120363418298125186@g.us";
      navigate(`/grid=${uniqueId}`, { replace: true });
    }
  }, [location, navigate]);

  const { id } = useParams();
  const isValid = id?.match(/^grid=\d{6}&grname=.+$/);
  if (isValid) return <NotFound />;

  const handleChildChange = (index, field, value) => {
    const updated = [...children];
    updated[index][field] = value;
    console.log("field----------->", field);
    console.log("value------------->", value);
    setChildren(updated);
  };

  console.log("params--------------->", params);
  console.log("fetchData---------->", fetchData);

  const addChild = () => {
    setChildren([
      ...children,
      { childName: "", selectedClass: "", gender: "" },
    ]);
  };

  const handleSave = async () => {
    if (!searchedParticipant) {
      alert("ଦୟା କରି ନିଜର ୧୦ ଡିଜିଟ ବାଲା ବୈଧ ନମ୍ବର ଦିଅନ୍ତୁ।");
      return;
    }
    const incompleteChild = children.find((child) => !child.selectedClass);

    console.log("incompleteChild---------->", incompleteChild);
    if (incompleteChild) {
      alert("ଦୟା କରି ନିଜ ପିଲା ର ଶ୍ରେଣୀ ଚୟନ କରନ୍ତୁ।");
      return;
    }
    try {
      const responses = await Promise.all(
        children.map((child) => {
          console.log("child data received--------->", child);
          const body = {
            anganwadi: fetchData.anganwadi,
            block: fetchData.block,
            cluster: fetchData.cluster,
            district: fetchData.district,
            groupCategory: "school",
            groupId: fetchData.groupId,
            groupName: fetchData.groupName,
            participants: fetchData.participants,
            project: fetchData.project,
            school: fetchData.school,
            sector: fetchData.sector,
            studentId: new Date().getTime() + Math.floor(Math.random() * 1000),
            studentName: child.childName,
            class: child.selectedClass,
            phoneNumber: searchedParticipant,
            academicType: "school",
            parentsName: "",
          };

          return axios.post(
            "https://tatvagyan.in/osepa/saveWaValidatedClass",
            body
          );
        })
      );

      console.log("Saved Responses:", responses);
      window.location.href = "https://wa.me/";
    } catch (error) {
      console.error("Save Error:", error);
      alert("Something went wrong while saving.");
    }
  };

  // const handleSave = () => {
  //   if (searchedParticipant.length < 12) {
  //     alert("ଦୟା କରି ନିଜର ୧୦ ଡିଜିଟ ବାଲା ବୈଧ ନମ୍ବର ଦିଅନ୍ତୁ।");
  //   } else {
  //     setLoading(true); // Show loader

  //     alert("ଆପଣଙ୍କ ତଥ୍ୟ ସେଭ ହେଇଯାଇଛି।");

  //     // Try to open WhatsApp directly
  //     window.location.href = "whatsapp://";

  //     // Fallback after delay
  //     setTimeout(() => {
  //       window.location.href = "https://wa.me/";
  //       setLoading(false); // Optional: hide loader after redirect attempt
  //     }, 2000);
  //   }
  // };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>ଶ୍ରେଣୀ ଚୟନ</h2>

        {/* <div style={styles.formGroup}>
          <label style={styles.label}>District Name:</label>
          <Input value={fetchData.district} style={styles.input} disabled />
        </div> */}

        {/* <div style={styles.formGroup}>
          <label style={styles.label}>Category:</label>
          <Input
            value={fetchData.groupCategory}
            style={styles.input}
            disabled
          />
        </div> */}

        {/* <div style={styles.formGroup}>
          <label style={styles.label}>Group Name:</label>
          <Input value={fetchData.groupName} style={styles.input} disabled />
        </div> */}

        <div style={styles.formGroup}>
          <label style={styles.label}>ନିଜ ନମ୍ବର ଚୟନ କରନ୍ତୁ :</label>
          {/* <AutoComplete
            options={autoCompleteOptions}
            placeholder="ନିଜ ନମ୍ବର ଚୟନ କରନ୍ତୁ..."
            style={styles.input}
            value={searchedParticipant}
            onChange={participantOnChange}
            filterOption={(inputValue, option) =>
              option?.label?.toLowerCase().includes(inputValue.toLowerCase())
            }
          > */}
          <Input
            addonBefore="+91"
            value={
              searchedParticipant.startsWith("91")
                ? searchedParticipant.slice(2)
                : searchedParticipant
            }
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, "").slice(0, 10);
              participantOnChange("91" + input);
            }}
            maxLength={10}
            placeholder="ନିଜ ନମ୍ବର ଚୟନ କରନ୍ତୁ..."
          />
          {/* </AutoComplete> */}
        </div>

        {children.map((child, index) => (
          <div key={index} style={styles.childCard}>
            <h3 style={styles.childTitle}>Child {index + 1}</h3>
            <div style={{ marginBottom: 10 }}>
              <label style={styles.label}>ପିଲାର ନାମ</label>
              <Input
                placeholder="ପିଲାର ନାମ ଲେଖନ୍ତୁ"
                value={child.childName}
                onChange={(e) =>
                  handleChildChange(index, "childName", e.target.value)
                }
                style={styles.input}
              />
            </div>
            <div>
              <label style={styles.label}>ପିଲାର ଶ୍ରେଣୀ ଚୟନ କରନ୍ତୁ:</label>
              <Select
                placeholder="-- ପିଲାର ଶ୍ରେଣୀ ଚୟନ କରନ୍ତୁ --"
                value={child.selectedClass}
                style={styles.input}
                onChange={(value) =>
                  handleChildChange(index, "selectedClass", value)
                }
              >
                {[
                  { label: "ପ୍ରଥମ", value: 1 },
                  { label: "ଦ୍ୱିତୀୟ", value: 2 },
                  { label: "ତୃତୀୟ", value: 3 },
                  { label: "ଚତୁର୍ଥ", value: 4 },
                  { label: "ପଞ୍ଚମ", value: 5 },
                  { label: "ଷଷ୍ଠ", value: 6 },
                  { label: "ସପ୍ତମ", value: 7 },
                  { label: "ଅଷ୍ଟମ", value: 8 },
                  { label: "ନବମ", value: 9 },
                  { label: "ଦଶମ", value: 10 },
                ].map((item, i) => (
                  <Option key={i + 1} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </div>

            {/* <div style={{ marginTop: 10 }}>
              <label style={styles.label}>Select Gender:</label>
              <Select
                placeholder="-- Select Gender --"
                value={child.gender}
                style={styles.input}
                onChange={(value) => handleChildChange(index, "gender", value)}
              >
                <Option value="male">Boy</Option>
                <Option value="female">Girl</Option>
              </Select>
            </div> */}
          </div>
        ))}

        <button onClick={addChild} style={styles.addButton}>
          <PlusOutlined /> ଆଉ ଏକ ପିଲାର ପଞ୍ଜୀକରଣ କରନ୍ତୁ
        </button>
        <button onClick={handleSave} style={styles.button} disabled={loading}>
          {loading ? "Saving..." : "ସେଭ୍ କରନ୍ତୁ"}
          {loading && <span style={styles.loader}>⏳</span>}
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
    backgroundColor: "rgb(152,251,152)",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundImage: `url(${backgroundImg})`,
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
    fontSize: "22px",
    color: "#333",
  },
  formGroup: {
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
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "16px",
    backgroundColor: "rgb(60,179,113)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  addButton: {
    width: "100%",
    padding: "8px",
    marginBottom: "16px",
    backgroundColor: "#1890ff",
    color: "white",
    fontSize: "14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  loader: {
    marginLeft: "10px",
  },
  childCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ccc",
    marginTop: "12px",
  },
  childTitle: {
    marginBottom: "12px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
  },
};

export default Page;

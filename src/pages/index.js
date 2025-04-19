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

  const autoCompleteOptions = (fetchData?.participants || []).map((p) => ({
    value: String(p),
    label: String(p),
  }));

  const participantOnChange = (value) => {
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
    setChildren(updated);
  };

  console.log("searched Participants------------>", searchedParticipant);

  console.log("fetchData---------->", fetchData);

  const addChild = () => {
    setChildren([
      ...children,
      { childName: "", selectedClass: "", gender: "" },
    ]);
  };

  const removeChild = (indexToRemove) => {
    setChildren(children.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
    const validWANumber = fetchData?.participants?.filter((num) => {
      return num === searchedParticipant;
    });

    console.log("validWANumber------------>", validWANumber);

    if (!searchedParticipant || searchedParticipant.length < 12) {
      alert("ଦୟା କରି ନିଜର ୧୦ ଡିଜିଟ ବାଲା ବୈଧ ନମ୍ବର ଦିଅନ୍ତୁ।");
      return;
    } else if (!validWANumber || validWANumber.length < 1) {
      alert(
        "ଆପଣ ଦେଇଥିବା ନମ୍ବରଟି WhatsApp ଗ୍ରୁପରେ ନାହିଁ, ଦୟାକରି ନିଜର WhatsApp ନମ୍ବରଟି ଦିଅନ୍ତୁ।"
      );
      return;
    } else {
      const incompleteChild = children.find((child) => !child.selectedClass);

      if (incompleteChild) {
        alert("ଦୟା କରି ନିଜ ପିଲା ର ଶ୍ରେଣୀ ଚୟନ କରନ୍ତୁ।");
        return;
      }
      try {
        const responses = await Promise.all(
          children.map((child) => {
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
              studentId:
                new Date().getTime() + Math.floor(Math.random() * 1000),
              studentName: child.childName,
              class: child.selectedClass,
              phoneNumber: searchedParticipant,
              academicType: "school",
              parentsName: "",
            };

            console.log("body sent----------->", body);
            return axios.post(
              "https://tatvagyan.in/osepa/saveWaValidatedClass",
              body
            );
          })
        );

        console.log("Saved Responses:", responses);
        window.location.href = "https://wa.me/";
      } catch (error) {
        if (error.response.status === 406) {
          console.error("Save Error:", error);
          alert("କ୍ଷମା କରିବେ, ଆପଣ ପୂର୍ବରୁ ଏହି ତଥ୍ୟ ଦେଇ ସାରିଛନ୍ତି।");
        } else {
          console.error("Save Error:", error);
          alert("Something went wrong while saving.");
        }
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>ଶ୍ରେଣୀ ଚୟନ</h2>

        <div style={styles.formGroup}>
          <label
            style={{
              marginBottom: "6px",
              fontWeight: "500",
              fontSize: "1.4rem",
              color: "black",
              // marginTop: "3px",
            }}
          >
            ନିଜ ନମ୍ବର ଚୟନ କରନ୍ତୁ :
          </label>
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
              }}
            >
              <span
                style={{
                  padding: "13px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  border: "2px solid black",
                }}
              >
                +91
              </span>
              <input
                type="tel"
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
                placeholder="ନିଜ ନମ୍ବର ଲେଖନ୍ତୁ..."
                style={{
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid black",
                  width: "100%",
                  fontSize: "1rem",
                  letterSpacing: "3px",
                }}
              />
            </div>
          </div>

          {/* </AutoComplete> */}
        </div>

        {children.map((child, index) => {
          const classNameOdiaArray = [
            "୧",
            "୨",
            "୩",
            "୪",
            "୫",
            "୬",
            "୭",
            "୮",
            "୯",
            "୧୦",
          ];

          return (
            <div key={index} style={styles.childCard}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h3 style={styles.childTitle}>
                  ପିଲା {classNameOdiaArray[index]}
                </h3>
                {index > 0 && (
                  <button
                    onClick={() => removeChild(index)}
                    style={{
                      backgroundColor: "#ff4d4f",
                      color: "white",
                      border: "none",
                      borderRadius: "10%",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      fontSize: "10px",
                      lineHeight: "10px",
                      textAlign: "center",
                      marginTop: "25.5px",
                    }}
                  >
                    −
                  </button>
                )}
              </div>

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
          );
        })}

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
    alignItems: "center", // optional: center vertically too
    padding: "20px",
    minHeight: "100vh", // makes it responsive to full device height
    backgroundColor: "#25D366", // WhatsApp green
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover", // optional: ensures image scales nicely
    backgroundPosition: "center",
  },

  title: {
    textAlign: "center",
    marginBottom: "22px",
    fontSize: "50px",
    color: "#333",
    marginTop: "-3%",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "500",
    fontSize: "25px",
    color: "black",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    height: "50px",
    fontSize: "15px",
    border: "solid black 1px",
    marginTop: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    letterSpacing: "2px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "16px",
    backgroundColor: "rgb(60,179,113)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  addButton: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    backgroundColor: "#1890ff",
    color: "white",
    fontSize: "18px",
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
    marginTop: "20px",
  },
  childTitle: {
    marginBottom: "12px",
    fontSize: "21px",
    fontWeight: "600",
    color: "#333",
    marginLeft: "44%",
  },
};

export default Page;

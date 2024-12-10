import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Account.css";

export const Account = () => {
  const [editable, setEditable] = useState({
    input1: false,
    input2: false,
    input3: false,
  });
  const [userDetails, setUserDetails] = useState({});
  const inputRef = useRef([null, null, null]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await axios.get("http://localhost:5000/account", {
          withCredentials: true,
        });
        setUserDetails(result.data.user);
      } catch (error) {
        console.log("Error in fetching Account Details : ", error);
      }
    };
    fetchDetails();
  }, []);

  const handleEditClick = (index) => {
    setEditable((prevEditable) => ({
      ...prevEditable,
      [`input${index + 1}`]: true,
    }));
    inputRef.current[index].focus();
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/account",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token")
        console.log("Account deleted successfully");
        navigate('/');
      } else {
        console.log(response.data.message || "Failed to delete account");
      }
    } catch (error) {
      console.log("Failed to delete account : ",error)
    }
  };

  const handleLogout = async()=>{
    try {
      const response = await axios.post(
        "http://localhost:5000/logout",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token")
        console.log("Account logout successfully");
        navigate('/');
      } else {
        console.log(response.data.message || "Failed to logout account");
      }
    } catch (error) {
      console.log("Failed to logout account : ",error)
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/')
  };
  const handleSave = async (e) => {
    e.preventDefault();
    const fields = {
      username: inputRef.current[0].value,
      email: inputRef.current[1].value,
      password: inputRef.current[2].value,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/update-account",
        { fields },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Account updated successfully");
      } else {
        console.log(response.data.message || "Failed to update account");
      }
    } catch (error) {
      console.log("Error in updating account details:", error);
    }
  };
  return (
    <div className="settings-page">
      <div className="settings-content">
        <h1>Account Settings</h1>
        <p>Edit your name, avatar, etc.</p>
        {userDetails ? (
          <div className="settings-card">
            <div className="profile-section">
              <div className="profile-picture">
                <div className="avatar-icon">👤</div>
                <button className="upload-button">Upload a picture</button>
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <div className="coolinput">
                  <label htmlFor="input1" className="text">
                    Name:
                  </label>
                  <input
                    type="text"
                    value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails((prevDetails) => ({
                        ...prevDetails,
                        username: e.target.value,
                      }))
                    }
                    name="input1"
                    className="input"
                    ref={(el) => (inputRef.current[0] = el)}
                    //el represent actual dom element and for current the actual element get assigned
                    disabled={!editable.input1}
                  />
                </div>
                <button className="edit-btn" onClick={() => handleEditClick(0)}>
                  <svg
                    className="css-i6dzq1"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                    strokeWidth="2"
                    stroke="#FFFFFF"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg>
                </button>
              </div>

              <div className="form-group">
                <div className="coolinput">
                  <label htmlFor="input3" className="text">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails((prevDetails) => ({
                        ...prevDetails,
                        email: e.target.value,
                      }))
                    }
                    name="input2"
                    className="input"
                    ref={(el) => (inputRef.current[1] = el)}
                    disabled={!editable.input2}
                  />
                </div>
                <button className="edit-btn" onClick={() => handleEditClick(1)}>
                  <svg
                    className="css-i6dzq1"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                    strokeWidth="2"
                    stroke="#FFFFFF"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg>
                </button>
              </div>

              <div className="form-group">
                <div className="coolinput">
                  <label htmlFor="input3" className="text">
                    Password:
                  </label>
                  <input
                    type="password"
                    value={userDetails?.password?.slice(0, 8) || "********"}
                    onChange={(e) =>
                      setUserDetails((prevDetails) => ({
                        ...prevDetails,
                        password: e.target.value,
                      }))
                    }
                    name="input3"
                    className="input"
                    ref={(el) => (inputRef.current[2] = el)}
                    disabled={!editable.input3}
                  />
                </div>
                <button className="edit-btn" onClick={() => handleEditClick(2)}>
                  <svg
                    className="css-i6dzq1"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                    strokeWidth="2"
                    stroke="#FFFFFF"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg>
                </button>
              </div>

              <div className="delete-account">
                <a href="#" onClick={handleDelete}>Delete Your Account</a>
                <p>
                  You will receive an email to confirm your decision.
                  <br />
                  Please note, that all boards you have created will be
                  permanently erased.
                </p>
              </div>
              <div className="bottom-btns">
                <button className="logout" onClick={handleLogout}>
                  <div className="sign">
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>

                  <div className="text">Logout</div>
                </button>

                <div
                  className={`action-buttons ${
                    editable.input1 || editable.input2 || editable.input3
                      ? "show"
                      : null
                  }`}
                >
                  <button className="cancel-button" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="save-button" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

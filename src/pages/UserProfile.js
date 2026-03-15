import React, { useState } from "react";
import ProfileAvatar from "../components/ProfileAvatar";
import "../styles/UserProfile.css";

function UserProfile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    bio: "",
  });

  const [addresses, setAddresses] = useState([
    {
      name: "",
      phone: "",
      city: "",
      state: "",
      pincode: ""
    }
  ]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressChange = (index, e) => {
    const newAddresses = [...addresses];
    newAddresses[index][e.target.name] = e.target.value;
    setAddresses(newAddresses);
  };

  const addAddress = () => {
    setAddresses([
      ...addresses,
      {
        name: "",
        phone: "",
        city: "",
        state: "",
        pincode: ""
      }
    ]);
  };

  const handleSave = () => {

    const profileData = {
      ...user,
      addresses
    };

    console.log("Saved Profile:", profileData);

    alert("Profile saved successfully!");
  };

  return (
    <div className="profile-page">

      <h1 className="profile-title">MY PROFILE</h1>

      {/* PROFILE CARD */}
      <div className="profile-card">

        <ProfileAvatar name={user.name} />

        <div className="profile-basic">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={user.phone}
            onChange={handleChange}
          />

        </div>

      </div>


      {/* PERSONAL INFO */}
      <div className="profile-section">

        <h3>Personal Information</h3>

        <div className="profile-grid">

          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={user.dob}
              onChange={handleChange}
            />
          </div>

          <div className="full">
            <label>Bio</label>
            <textarea
              name="bio"
              rows="3"
              value={user.bio}
              onChange={handleChange}
            />
          </div>

        </div>

      </div>


      {/* ADDRESS SECTION */}
      <div className="profile-section">

        <h3>Addresses</h3>

        {addresses.map((addr, index) => (

          <div key={index} className="address-card">

            <input
              name="name"
              placeholder="Name"
              value={addr.name}
              onChange={(e) => handleAddressChange(index, e)}
            />

            <input
              name="phone"
              placeholder="Phone"
              value={addr.phone}
              onChange={(e) => handleAddressChange(index, e)}
            />

            <input
              name="city"
              placeholder="City"
              value={addr.city}
              onChange={(e) => handleAddressChange(index, e)}
            />

            <input
              name="state"
              placeholder="State"
              value={addr.state}
              onChange={(e) => handleAddressChange(index, e)}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={addr.pincode}
              onChange={(e) => handleAddressChange(index, e)}
            />

          </div>

        ))}

        <button className="profile-btn" onClick={addAddress}>
          Add Address
        </button>

      </div>


      {/* SAVE BUTTON */}
      <div className="profile-save">

        <button className="profile-btn" onClick={handleSave}>
          SAVE PROFILE
        </button>

      </div>

    </div>
  );
}

export default UserProfile;
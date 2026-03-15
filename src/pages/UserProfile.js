import React, { useState, useEffect } from "react";
import ProfileAvatar from "../components/ProfileAvatar";
import "../styles/UserProfile.css";

function UserProfile() {

  const [userId, setUserId] = useState(null);

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

  // Fetch logged-in user data
  useEffect(() => {

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedUser) return;

    const fetchUser = async () => {

      try {

        const res = await fetch("http://localhost:5000/users");
        const users = await res.json();

        const foundUser = users.find(
          (u) => u.email === loggedUser.email
        );

        if (foundUser) {

          setUserId(foundUser.id);

          setUser({
            name: foundUser.name || "",
            email: foundUser.email || "",
            phone: foundUser.phone || "",
            gender: foundUser.gender || "",
            dob: foundUser.dob || "",
            bio: foundUser.bio || "",
          });

          if (foundUser.addresses) {
            setAddresses(foundUser.addresses);
          }

        }

      } catch (error) {
        console.error(error);
      }

    };

    fetchUser();

  }, []);


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

  const handleSave = async () => {

    const profileData = {
      ...user,
      addresses
    };

    try {

      await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData)
      });

      alert("Profile saved successfully!");

    } catch (error) {
      console.error(error);
    }

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
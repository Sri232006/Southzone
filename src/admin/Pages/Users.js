import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  const deleteUser = (id) => {
    if (!window.confirm("Delete this user?")) return;

    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setUsers(users.filter(u => u.id !== id));
    });
  };

  const changeRole = (user, role) => {
    const updatedUser = {
      ...user,
      role
    };

    fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    })
      .then(res => res.json())
      .then(data => {
        const updated = users.map(u =>
          u.id === user.id ? data : u
        );
        setUsers(updated);
      });
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="header-section">
          <h2>USER MANAGEMENT</h2>
          <div className="header-line"></div>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-label">TOTAL USERS</span>
            <span className="stat-value">{users.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">ADMIN USERS</span>
            <span className="stat-value">{users.filter(u => u.role === 'admin').length}</span>
          </div>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>ROLE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="user-row">
                  <td>
                    <div 
                      className="user-name-cell"
                      onClick={() => setSelectedUser(user)}
                    >
                      <span className="user-initial">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="user-name">{user.name}</span>
                    </div>
                  </td>
                  <td className="email-cell">{user.email}</td>
                  <td className="phone-cell">{user.phone || "—"}</td>
                  <td>
                    <div className="role-container">
                      <select
                        value={user.role}
                        onChange={(e) => changeRole(user, e.target.value)}
                        className={`role-select ${user.role === 'admin' ? 'admin-role' : 'user-role'}`}
                      >
                        <option value="user">USER</option>
                        <option value="admin">ADMIN</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user.id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* USER DETAILS MODAL */}
        {selectedUser && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>USER PROFILE</h3>
                <button 
                  className="modal-close"
                  onClick={() => setSelectedUser(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="profile-header">
                  <div className="profile-initial">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="profile-role">
                    <span className={`role-badge ${selectedUser.role}`}>
                      {selectedUser.role.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="info-section">
                  <div className="info-row">
                    <span className="info-label">NAME</span>
                    <span className="info-value">{selectedUser.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">EMAIL</span>
                    <span className="info-value">{selectedUser.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">PHONE</span>
                    <span className="info-value">{selectedUser.phone || "Not provided"}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">GENDER</span>
                    <span className="info-value">{selectedUser.gender || "Not specified"}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">DATE OF BIRTH</span>
                    <span className="info-value">{selectedUser.dob || "Not provided"}</span>
                  </div>
                  <div className="info-row bio-row">
                    <span className="info-label">BIO</span>
                    <span className="info-value bio-value">{selectedUser.bio || "No bio available"}</span>
                  </div>
                </div>

                {selectedUser.addresses && selectedUser.addresses.length > 0 && (
                  <div className="addresses-section">
                    <h4>ADDRESSES</h4>
                    <div className="addresses-list">
                      {selectedUser.addresses.map((addr, i) => (
                        <div key={i} className="address-card">
                          <p className="address-name">{addr.name}</p>
                          <p className="address-phone">{addr.phone}</p>
                          <p className="address-location">
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
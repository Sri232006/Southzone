import React from "react";

function ProfileAvatar({ name }) {

  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div className="profile-avatar">
      {firstLetter}
    </div>
  );
}

export default ProfileAvatar;
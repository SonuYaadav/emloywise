import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../services/api";
import "../styles/edituser.css"; 

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: ""
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const data = await getUserById(id);
    setUser(data.data);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(id, user);
    navigate("/users"); // Redirect to user list after editing
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="first_name" value={user.first_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="last_name" value={user.last_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Profile Image URL</label>
          <input type="text" name="avatar" value={user.avatar} onChange={handleChange} required />
        </div>
        <img src={user.avatar} alt="User Avatar" className="preview-avatar" />
        <div className="form-actions">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={() => navigate("/users")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;

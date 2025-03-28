import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/userlist.css"; // Import CSS file

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    console.log("Fetched Users:", data);
    setUsers(data.data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <img src={user.avatar} alt={user.first_name} className="user-avatar" />
            <div className="user-details">
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
              <div className="user-actions">
                <button className="edit-btn" onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

import { useState } from "react";

export default function UserManagement({ users, setUsers }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const addUser = () => {
    if (email) {
      setUsers([...users, { email, role }]);
      setEmail("");
    }
  };

  const removeUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="card p-3">
      <h4>User Management</h4>
      <div className="mb-2">
        <input
          type="email"
          className="form-control mb-2"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select className="form-control mb-2" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="engineer">Engineer</option>
        </select>
        <button className="btn btn-success" onClick={addUser}>Add User</button>
      </div>

      <h5 className="mt-3">Existing Users</h5>
      {users.length === 0 ? <p>No users added.</p> : (
        users.map((user, index) => (
          <div key={index} className="d-flex justify-content-between p-2 border mb-2">
            <span>{user.email} - <strong>{user.role}</strong></span>
            <button className="btn btn-danger btn-sm" onClick={() => removeUser(index)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}
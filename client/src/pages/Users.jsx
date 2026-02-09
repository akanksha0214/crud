import { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../api/userApi";
import {
  successToast,
  errorToast,
} from "../utils/toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // FETCH USERS ON LOAD
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await createUser(data);
      setUsers((prev) => [res.data.data, ...prev]);
      successToast("User created successfully ");
      setShowModal(false);
    } catch (err) {
      errorToast(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleUpdate = async (data) => {
    try {
      const res = await updateUser(editingUser._id, data);
      setUsers((prev) =>
        prev.map((u) => (u._id === editingUser._id ? res.data.data : u))
      );
      successToast("User updated successfully ");
      setEditingUser(null);
      setShowModal(false);
    } catch (err) {
      errorToast(err.response?.data?.message || "Failed to update user ");
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setShowModal(true); // 🔥 THIS WAS MISSING
  };


  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      successToast("User deleted successfully ");
    } catch (err) {
      errorToast("Failed to delete user ");
    }
  };


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>User Management</h4>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add User
        </button>
      </div>

      <UserList users={users} onEdit={openEditModal}   loading={loading} onDelete={handleDelete} />

      <UserForm
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        loading={loading}
        onSubmit={editingUser ? handleUpdate : handleCreate}
        editingUser={editingUser}
      />
    </div>
  );
};

export default Users;

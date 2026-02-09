import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const UserForm = ({ show, onClose, onSubmit, editingUser, loading }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  /* ---------- Handle open / close ---------- */
  useEffect(() => {
    if (modalRef.current && !modalInstance.current) {
      modalInstance.current = new Modal(modalRef.current, {
        backdrop: "static",
        keyboard: false,
      });
    }
  }, []);

  useEffect(() => {
    if (!modalInstance.current) return;

    if (show) {
      modalInstance.current.show();
    } else {
      modalInstance.current.hide();
    }
  }, [show]);

  /* ---------- Populate edit data ---------- */
  useEffect(() => {
    if (editingUser) {
      setForm(editingUser);
    } else {
      setForm(initialState);
    }
  }, [editingUser, show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.phoneNumber) {
      return setError("All fields are required");
    }

    if (!/^\d{10}$/.test(form.phoneNumber)) {
      return setError("Phone number must be 10 digits");
    }

    setError("");

    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError("Failed to save user");
    }
  };

  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            {/* HEADER */}
            <div className="modal-header">
              <h5 className="modal-title">
                {editingUser ? "Edit User" : "Add User"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />
            </div>

            {/* BODY */}
            <div className="modal-body">
              {error && <p className="text-danger">{error}</p>}

              <input
                name="firstName"
                placeholder="First Name"
                className="form-control mb-2"
                value={form.firstName}
                onChange={handleChange}
              />

              <input
                name="lastName"
                placeholder="Last Name"
                className="form-control mb-2"
                value={form.lastName}
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Email"
                className="form-control mb-2"
                value={form.email}
                onChange={handleChange}
              />

              <input
                name="phoneNumber"
                placeholder="Phone Number"
                className="form-control mb-2"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit"
                disabled={loading}
                className="btn btn-primary">
                {editingUser ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;

import Spinner from "./Spinner";
const UserList = ({ users, onEdit, onDelete, loading }) => {
  if (loading) {
    return <Spinner />;
  }

  /* ---------- EMPTY STATE ---------- */
  if (!loading && users.length === 0) {
    return (
      <div className="text-center text-muted my-4">
        No users found
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive d-none d-md-block">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td className="text-break">{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-block d-md-none">
        {users.map((user) => (
          <div key={user._id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold">
                {user.firstName} {user.lastName}
              </h6>

              <p className="mb-1 small text-muted text-break">
                📧 {user.email}
              </p>

              <p className="mb-3 small text-muted">
                📞 {user.phoneNumber}
              </p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-warning flex-fill"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger flex-fill"
                  onClick={() => onDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;

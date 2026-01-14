import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserDashboard;

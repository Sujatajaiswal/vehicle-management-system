import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const [vehicles, setVehicles] = useState([]);
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [type, setType] = useState("");

  // Fetch vehicles
  const fetchVehicles = async () => {
    const res = await API.get("/vehicles");
    setVehicles(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Add vehicle
  const handleAddVehicle = async (e) => {
    e.preventDefault();

    await API.post("/vehicles", {
      vehicleName,
      vehicleNumber,
      type,
    });

    setVehicleName("");
    setVehicleNumber("");
    setType("");

    fetchVehicles();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome {user?.name}</p>
      <button onClick={logout}>Logout</button>

      <hr />

      {/* ADD VEHICLE */}
      <h3>Add Vehicle</h3>
      <form onSubmit={handleAddVehicle}>
        <input
          placeholder="Vehicle Name"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
          required
        />
        <input
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          required
        />
        <input
          placeholder="Type (Car/Bike)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      <hr />

      {/* VEHICLE LIST */}
      <h3>All Vehicles</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Type</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v._id}>
              <td>{v.vehicleName}</td>
              <td>{v.vehicleNumber}</td>
              <td>{v.type}</td>
              <td>{v.assignedTo?.name || "Not Assigned"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

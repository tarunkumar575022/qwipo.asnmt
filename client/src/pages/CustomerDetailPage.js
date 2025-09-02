import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddressForm from "../pages/AddressForm";

function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);

  const fetchData = () => {
    axios.get(`https://qwipo-asnmt-backend.onrender.com/api/customers/${id}`)
      .then(res => setCustomer(res.data))
      .catch(() => setCustomer({}));
    axios.get(`https://qwipo-asnmt-backend.onrender.com/api/customers/${id}/addresses`)
      .then(res => setAddresses(res.data))
      .catch(() => setAddresses([]));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  // Delete customer
  const handleDeleteCustomer = () => {
    if (!window.confirm("Delete this customer and all addresses?")) return;
    axios.delete(`https://qwipo-asnmt-backend.onrender.com/api/customers/${id}`)
      .then(() => navigate("/"))
      .catch(err => alert("Delete failed: " + (err?.response?.data?.error || err.message)));
  };

  // Delete address
  const handleDeleteAddress = (addressId) => {
    if (!window.confirm("Delete this address?")) return;
    axios.delete(`https://qwipo-asnmt-backend.onrender.com/api/addresses/${addressId}`)
      .then(() => fetchData())
      .catch(err => alert("Delete failed: " + (err?.response?.data?.error || err.message)));
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional: bring form into view
  };

  const handleSavedAddress = () => {
    setEditingAddress(null);
    fetchData();
  };

  const handleCancelEdit = () => {
    setEditingAddress(null);
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{customer?.first_name} {customer?.last_name}</h2>
        <div>
          <Link to={`/edit/${id}`} style={{ marginRight: 10 }}>Edit</Link>
          <button className="delete-btn" onClick={handleDeleteCustomer}>Delete Customer</button>
        </div>
      </div>

      <p><strong>Phone:</strong> {customer?.phone_number}</p>

      {/* Address form (add / edit) */}
      <AddressForm
        customerId={id}
        editingAddress={editingAddress}
        onSaved={handleSavedAddress}
        onCancel={handleCancelEdit}
      />

      <h3 style={{ marginTop: 20 }}>Addresses</h3>
      <ul>
        {addresses.length === 0 && <li>No addresses yet.</li>}
        {addresses.map((a) => (
          <li key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div><strong>{a.address_details}</strong></div>
              <div>{a.city}, {a.state} - {a.pin_code}</div>
            </div>

            <div>
              <button className="secondary-btn" onClick={() => handleEditAddress(a)} style={{ marginRight: 8 }}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDeleteAddress(a.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerDetailPage;

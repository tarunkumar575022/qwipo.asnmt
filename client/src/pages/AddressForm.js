import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddressForm({ customerId, editingAddress, onSaved, onCancel }) {
  const [form, setForm] = useState({
    address_details: "",
    city: "",
    state: "",
    pin_code: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingAddress) {
      setForm({
        address_details: editingAddress.address_details || "",
        city: editingAddress.city || "",
        state: editingAddress.state || "",
        pin_code: editingAddress.pin_code || ""
      });
      setError("");
    } else {
      setForm({ address_details: "", city: "", state: "", pin_code: "" });
    }
  }, [editingAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.address_details.trim() || !form.city.trim() || !form.state.trim() || !form.pin_code.trim()) {
      setError("Please fill all fields.");
      return;
    }

    try {
      if (editingAddress && editingAddress.id) {
        // Update existing address
        await axios.put(`http://localhost:5000/api/addresses/${editingAddress.id}`, form);
      } else {
        // Create new address for customer
        await axios.post(`http://localhost:5000/api/customers/${customerId}/addresses`, form);
      }
      setForm({ address_details: "", city: "", state: "", pin_code: "" });
      setError("");
      if (onSaved) onSaved();
    } catch (err) {
      setError(err?.response?.data?.error || "Could not save address.");
    }
  };

  return (
    <div className="container address-form">
      <h3>{editingAddress ? "Edit Address" : "Add Address"}</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Address details (street, building, etc.)"
          value={form.address_details}
          onChange={(e) => setForm({ ...form, address_details: e.target.value })}
        />
        <input
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />
        <input
          placeholder="Pin Code"
          value={form.pin_code}
          onChange={(e) => setForm({ ...form, pin_code: e.target.value })}
        />

        <div className="button-row">
          <button type="submit" className="primary-btn">
            {editingAddress ? "Save Address" : "Add Address"}
          </button>
          {editingAddress && (
            <button type="button" className="secondary-btn" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
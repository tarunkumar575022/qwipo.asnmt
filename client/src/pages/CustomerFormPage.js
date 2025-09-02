import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CustomerFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ first_name: "", last_name: "", phone_number: "" });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/customers/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/api/customers/${id}`, form).then(() => navigate("/"));
    } else {
      axios.post("http://localhost:5000/api/customers", form).then(() => navigate("/"));
    }
  };

 return (
  <div className="container">
    <h2>{id ? "Edit Customer" : "Add Customer"}</h2>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="First Name"
        value={form.first_name}
        onChange={e => setForm({ ...form, first_name: e.target.value })}
      />
      <input
        placeholder="Last Name"
        value={form.last_name}
        onChange={e => setForm({ ...form, last_name: e.target.value })}
      />
      <input
        placeholder="Phone Number"
        value={form.phone_number}
        onChange={e => setForm({ ...form, phone_number: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
  </div>
);

}

export default CustomerFormPage;
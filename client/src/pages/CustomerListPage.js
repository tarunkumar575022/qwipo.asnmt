import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = () => {
    axios.get("http://localhost:5000/api/customers")
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios.delete(`http://localhost:5000/api/customers/${id}`)
        .then(() => fetchCustomers());
    }
  };

  return (
    <div className="container">
      <h2>Customers</h2>
      <ul>
        {customers.map(c => (
          <li key={c.id}>
            <Link to={`/customers/${c.id}`}>
              {c.first_name} {c.last_name}
            </Link>
            <button
              className="delete-btn"
              onClick={() => handleDelete(c.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerListPage;
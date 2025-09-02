import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerFormPage from "./pages/CustomerFormPage";
import "./App.css";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/">Customers</Link> | <Link to="/add">Add Customer</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CustomerListPage />} />
        <Route path="/customers/:id" element={<CustomerDetailPage />} />
        <Route path="/add" element={<CustomerFormPage />} />
        <Route path="/edit/:id" element={<CustomerFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
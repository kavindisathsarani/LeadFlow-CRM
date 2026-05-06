import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-slate-800">LeadFlow CRM</h1>
        <nav className="flex items-center gap-3">
          <Link className={`nav-link ${isActive("/dashboard") ? "nav-active" : ""}`} to="/dashboard">
            Dashboard
          </Link>
          <Link className={`nav-link ${isActive("/leads") ? "nav-active" : ""}`} to="/leads">
            Leads
          </Link>
          <button onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

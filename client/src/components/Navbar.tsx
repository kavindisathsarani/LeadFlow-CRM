import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  Building2,
  Menu,
  X,
  UserCircle
} from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/leads", label: "Leads", icon: Users },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-50"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-1.5">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  LeadFlow CRM
                </h1>
                <p className="text-xs text-slate-500 -mt-0.5">Enterprise CRM</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600"}`} />
                    <span>{item.label}</span>
                    {active && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User Menu & Actions */}
            <div className="flex items-center gap-3">
              {/* User Info - Desktop */}
              <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-slate-700">
                    {user?.name || user?.email?.split('@')[0] || "Admin"}
                  </p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="group relative overflow-hidden px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-slate-600" />
                ) : (
                  <Menu className="h-5 w-5 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-200 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {active && (
                    <div className="ml-auto w-1 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
            
            {/* Mobile User Info */}
            <div className="pt-3 mt-3 border-t border-slate-200">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {user?.name || user?.email?.split('@')[0] || "Admin User"}
                  </p>
                  <p className="text-xs text-slate-500">{user?.email || "admin@example.com"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import { LogIn, CheckCircle2, BookOpen } from "lucide-react";

function Login() {
  // --- KEEPING YOUR EXACT LOGIC ---
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authAPI.login(
        formData.email,
        formData.password
      );

      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        login(data.token, data.user);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server not reachable. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // --- END OF LOGIC SECTION ---

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      
      {/* LEFT SIDE: WELCOME BANNER (Personalized Branding) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 p-12 text-white flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-10 h-10 text-blue-200" />
            <h2 className="text-xl font-semibold tracking-wide uppercase text-blue-100 italic">For Book Lovers</h2>
          </div>
          
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Welcome to <br />
            <span className="text-blue-200">Personalized Book</span> Manager
          </h1>
          
          <p className="text-blue-100 text-lg mb-10 leading-relaxed font-medium italic">
            "The perfect solution for messy books in your book sections and a sanctuary for every book lover."
          </p>

          <ul className="space-y-4">
            {[
              "Secure Login",
              "Add, Edit, Delete Books",
              "Fast Search & Filter",
              "Clean Dashboard Interface"
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-blue-50">
                <CheckCircle2 className="w-5 h-5 text-blue-300" />
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-16 pt-8 border-t border-blue-400/30">
            <p className="text-sm text-blue-200 font-medium tracking-tight">Your personal gateway to an organized library.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10">
            
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-4 transition-transform hover:scale-110">
                <LogIn className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Login to Your Space</h2>
              <p className="text-slate-500 mt-2 font-medium">Access your personalized collection</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl text-sm bg-red-50 text-red-700 border border-red-100 flex items-center gap-3 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300"
                  placeholder="admin@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300"
                  placeholder="admin123"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg shadow-blue-200 transition-all active:scale-[0.98] ${
                  loading 
                    ? "bg-blue-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-300"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Opening your library...
                  </span>
                ) : "Login"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm italic">© 2025 Personalized Book Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
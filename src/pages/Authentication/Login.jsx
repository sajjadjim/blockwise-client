import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
// import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD="admiN123";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const { signIn, signInWithGoogle } = useAuth();
  const { role, loading } = useUserInfo();
  const navigate = useNavigate();
  const axios = useAxios();

  const saveUserToDB = async (user) => {
    try {
      await axios.post("/users", {
        name: user.displayName || "No Name",
        email: user.email,
      });
      console.log("User saved to DB:", user.email);
    } catch (err) {
      console.log("User save failed/skipped:", err.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && !loading && role) {
      if ( adminLoggedIn) {
        navigate("/dashboard/admin/profile");
      } else if (role === "member") {
        navigate("/dashboard/member/profile");
      } else {
        navigate("/dashboard/user/profile");
      }
    }
    console.log({ isLoggedIn, adminLoggedIn, role })
  }, [isLoggedIn, loading, role, adminLoggedIn, navigate]);

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await signIn(email, password); 

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      toast.success("Admin logged in successfully!");
      setAdminLoggedIn(true);
    } else {
      toast.success("User logged in successfully!");
      await saveUserToDB(res.user);
    }

    setIsLoggedIn(true);
  } catch (err) {
    toast.error(err.response?.data?.message || err.message || "Login failed");
    setIsLoggedIn(false);
  }
};



  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithGoogle();
      toast.success("Logged in with Google!");
      await saveUserToDB(res.user);
      setEmail(res.user.email);
      setIsLoggedIn(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="py-10 flex items-center justify-center bg-[#f9fafb] px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-outline w-full">
              Login
            </button>
          </form>


          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn w-full flex items-center gap-2 border border-gray-300"
          >
            <FaGoogle className="text-lg" />
            Continue with Google
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

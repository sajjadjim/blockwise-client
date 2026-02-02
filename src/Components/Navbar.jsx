// import { Link } from "react-router";
// import { FaSignOutAlt } from "react-icons/fa";
// import useAuth from "../hooks/useAuth";
// import useUserInfo from "../hooks/useUserInfo";
// import logo from "../../src/assets/logo.png";

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const { role, loading } = useUserInfo();

//   const handleLogOut = () => {
//     logOut()
//       .then(() => {
//         console.log("Logged out");
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const dashboardPath =
//     role === "admin"
//       ? "/dashboard/admin"
//       : role === "member"
//       ? "/dashboard/member"
//       : "/dashboard/user";

//   return (
//     <div className="navbar sticky top-0 z-50 bg-[#f1f5f9] shadow-md px-4 md:px-26">
//       {/* Left - Logo */}
//       <div className="navbar-start">
//         <Link to="/" className="normal-case text-xl flex items-center gap-2 font-bold">
//           <img className="w-10 h-10" src={logo} alt="Logo" />
//           BloCKWise
//         </Link>
//       </div>

//       {/* Center - Menu */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu-horizontal px-1 gap-10 text-xl font-medium">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/apartments">Apartments</Link></li>
//           <li><Link to="/about">About</Link></li>
//           {user && !loading && (
//             <>
//               <li><Link to="/addReview">Review</Link></li>
//               <li><Link to={dashboardPath}>Dashboard</Link></li>
//             </>
//           )}
//         </ul>
//       </div>

//       {/* Right - Auth */}
//       <div className="navbar-end">
//         {!user ? (
//           <Link to="/login" className="btn btn-outline text-sm">Login</Link>
//         ) : (
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 <img
//                   src={user.photoURL || "/src/assets/user.png"}
//                   alt="Profile"
//                 />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow bg-base-100 rounded-box w-52"
//             >
//               <li className="pr-4 text-gray-700 font-semibold pointer-events-none">
//                 {user.displayName || "User"}
//               </li>
//               {!loading && (
//                 <>
//                   <li><Link to={dashboardPath}>Dashboard</Link></li>
//                   <li><Link to="/addReview">Review</Link></li>
//                 </>
//               )}
//               <li>
//                 <button
//                   onClick={handleLogOut}
//                   className="flex items-center gap-2 text-red-500"
//                 >
//                   <FaSignOutAlt /> Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { Link } from "react-router";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUserInfo from "../hooks/useUserInfo";
import logo from "../../src/assets/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, loading } = useUserInfo();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "member"
      ? "/dashboard/member"
      : "/dashboard/user";

  return (
    <div className="navbar sticky top-0 z-50 bg-[#f1f5f9] shadow-md px-4 md:px-26">
      {/* Left - Logo */}
      <div className="navbar-start">
        <Link
          to="/"
          className="normal-case text-xl flex items-center gap-2 font-bold"
        >
          <img className="w-10 h-10" src={logo} alt="Logo" />
          BloCKWise
        </Link>
      </div>

      {/* Center - Menu (Desktop only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 gap-8 text-lg font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/apartments">Apartments</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {user && !loading && (
            <>
              <li>
                <Link to="/addReview">Review</Link>
              </li>
              <li>
                <Link to={dashboardPath}>Dashboard</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Right - Auth + Mobile Dropdown */}
      <div className="navbar-end flex items-center gap-2">
        {/* Mobile Menu */}
        <div className="dropdown  lg:hidden">
          <div tabIndex={0} role="button" className="btn  btn-ghost">
            <FaBars size={20} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/apartments">Apartments</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {user && !loading && (
              <>
                <li>
                  <Link to="/addReview">Review</Link>
                </li>
                <li>
                  <Link to={dashboardPath}>Dashboard</Link>
                </li>
              </>
            )}
            {!user && (
              <li>
                <Link to="/login" className=" text-blue-600 font-semibold">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Auth (Desktop + Mobile) */}
        {!user ? (
          <Link to="/login" className="btn btn-outline hidden pt-2 lg:block text-sm">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "/src/assets/user.png"}
                  alt="Profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow bg-base-100 rounded-box w-52"
            >
              <li className="pr-4 text-gray-700 font-semibold pointer-events-none">
                {user.displayName || "User"}
              </li>
              {!loading && (
                <>
                  <li>
                    <Link to={dashboardPath}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/addReview">Review</Link>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 text-red-500"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

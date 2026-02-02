import { Outlet, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const DashboardLayout = () => {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await fetch(
          `https://blockwise-server.vercel.app/api/agreements?email=${user?.email}`
        );
        if (res.status === 404) {
          setRole("user");
        } else {
          const data = await res.json();
          setRole(data?.email ? "member" : "user");
        }
      } catch (error) {
        console.error("Error fetching role:", error);
        setRole("user");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchRole();
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex">
      
      <Sidebar role={role} />
      <div className="flex-1 p-4">
        <Outlet context={{ role }} />
      </div>
    </div>
  );
};

export default DashboardLayout;




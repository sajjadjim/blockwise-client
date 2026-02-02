import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const ADMIN_EMAIL = "admin@example.com";


const useUserInfo = (refetchTrigger = 0) => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        if (user.email === ADMIN_EMAIL ) {
          setRole("admin");
        } else {
          const res = await axios.get(`/users/${user.email}`);
          setRole(res.data?.role || "user");
        }
      } catch (err) {
        console.error("Failed to fetch role", err);
        setRole("user");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user?.email, refetchTrigger]);

  return { role, loading };
};

export default useUserInfo;




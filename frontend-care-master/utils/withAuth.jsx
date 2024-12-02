// utils/withAuth.js
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent, allowedRoles) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const router = useRouter();
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token || !allowedRoles.includes(role)) {
        router.push("/login");
      }
    }, [token, role, router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

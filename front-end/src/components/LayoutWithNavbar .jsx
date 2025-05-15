import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

const LayoutWithNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default LayoutWithNavbar;
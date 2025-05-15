import React, { useState } from "react";
import { auth } from "./FireBase";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "../utils/SideBarData.jsx";
import { IconContext } from "react-icons";


function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = async() =>{
    try {
        await auth.signOut();
        window.location.href = "/login";
        console.log("User logged out successfully!");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
  } 



  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar w-[10%]">
          <Link  className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link  className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  {item.title === "exit" ? (
                    // Si el título es "exit", mostrar un botón con acción personalizada
                    <Link
                      onClick={handleLogout} // Aquí tu función para cerrar
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    // Si no es "close", mostrar el Link normal
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

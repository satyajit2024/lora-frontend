import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";


export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Node",
    path: "/device",
    icon: <AiIcons.AiFillMobile />,
    cName: "nav-text",
  },
  {
    title: "GateWay",
    path: "/settings",
    icon: <FaIcons.FaCogs/>,
    cName: "nav-text",
  },
  {
    title: "Brocker",
    path: "/brocker",
    icon: <AiIcons.AiOutlineDatabase />,
    cName: "nav-text",
  },
];

import React from "react";
import useUserAuth from "../Auth/UserAuth";
import AreaChat from "../Charts/AreaChat";
// import MyComponent from "./MyComponent";
import NodeTable from "../AllDetails/NodeTable";
import NavBar from "../SideBar/NavBar";
import Footer from "../Common/Footer";
import { useMediaQuery } from "react-responsive";


const Dashboard = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 756px)" });
  useUserAuth();


  return (
    <>
      <NavBar />
      <div className={isMobile ? "" : "grid md:grid-cols-2 gap-4 mt-1 "} style={{
        width: "100%",
        height: "100%",
        paddingBottom: "40px",
        overflowX: isMobile ?"hidden":""
        
      }}>
        <div className="md:row-span-1" style={{
          width: isMobile ? "100%" : "100%",
          paddingTop: "25px"
        }}>
          <NodeTable />
        </div>
        <div className="md:row-span-1">
          <AreaChat />
        </div >
      </div>

      {/* <div>
        <MyComponent/>
      </div> */}
      <Footer />
    </>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserAuth from "../Auth/UserAuth";
import BaseUrl from "../Common/BaseUrl";
import NodeDetails from "./NodeDetails";
import { useMediaQuery } from "react-responsive";
import "./NodeTable.css";

const NodeTable = () => {
  useUserAuth();
  const user_token = localStorage.getItem("user_token");
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const NewURL = BaseUrl();

  const fetchNodeDetails = async () => {
    setError(null);

    const URL = `${NewURL}nodes/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user_token}`,
    };

    try {
      const response = await axios.get(URL, { headers });
      const result = response?.data?.data;
      setNodes(result);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch node data. Please try again later.");
    }
  };

  const onNodeClick = (node) => {
    setSelectedNode(node);
  };

  const onNodeSelected = (newSelectedNode) => {
    setSelectedNode(newSelectedNode);
  };

  useEffect(() => {
    fetchNodeDetails();
    const intervalId = setInterval(() => {
      fetchNodeDetails();
    }, 10000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  return (
    <>

      <div className="border ml-2 w-auto">
        <div
          className="ml-2 mt-1 mb-5 md:row-span-1"
          style={{
            height: "62vh",
            overflow: "auto",
            position: "relative",
            width: isMobile ?"95%":"auto",
            
          }}


        >
          {error && <p>Error: {error}</p>}
          {!error && (
            <NodeDetails
              selectedNode={selectedNode}
              onNodeSelected={onNodeSelected}
            />
          )}
        </div>

        <div className="md:grid md:grid-cols-1 gap-4 ml-2 p-2 border"
          style={{
            marginTop: isMobile ? "" : "10px",
            width: isMobile ? "95%" : "auto"
          }}>
          <div className={isMobile ? "rounded-md overflow-y-auto border border-gray-300 mb-4" : "rounded-md overflow-hidden border border-gray-300 mb-4"}>
            <h2 className="bg-blue-500 text-black p-4 text-lg font-bold"
              style={{
                width: isMobile ? "105vw" : "",
                margin: isMobile ? "0 auto" : "",
                backgroundColor: isMobile ? "white" : ""
              }}>
              All Nodes
            </h2>
            <table className="w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Node ID</th>
                  <th className="p-2 border">Node Type</th>
                  <th className="p-2 border">Frequency</th>
                  <th className="p-2 border">PDR</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map((node) => (
                  <tr
                    key={node.id}
                    onClick={() => onNodeClick(node)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="p-2 border">{node.id}</td>
                    <td className="p-2 border">{node.node_type_display}</td>
                    <td className="p-2 border">{node.frequency}</td>
                    <td className="p-2 border">{node.p_d_r}</td>
                    <td
                      className={`p-2 border ${node.status ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {node.status ? "Active" : "Inactive"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default NodeTable;

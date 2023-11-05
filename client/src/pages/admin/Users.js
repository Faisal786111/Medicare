import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";
import Translation from '../././././../Translation/Data.json';

const Users = () => {

  //translation
  const [language, setLanguage] = useState("english")
  const [content, setContent] = useState({})
  useEffect(() => {
    if (language == "english") {
      setContent(Translation.english)
    } else if (language == "hindi") {
      setContent(Translation.hindi)
    }
  })

  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  //delete Users....
  const deleteUser = async (record) => {
    try {
      // console.log(record);
      const res = await axios.post("/api/v1/user/deleteUser",
        { doctorId: record._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.alert("User Deleted Successfully.");
      window.location.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger" onClick={() => deleteUser(record)}
            style={{ width: "100px", cursor: "pointer" }}
          >Delete</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="backimg_1" style={{ minHeight: '100%' }}>
        <h1 className="text-center m-2">{'<<<'}{content.userpage}{'>>>'}</h1>
        <Table columns={columns} dataSource={users} bordered style={{ border: '1px solid black', margin: '5px 10px', backgroundColor: 'lightgray' }} />
      </div>
    </Layout>
  );
};

export default Users;

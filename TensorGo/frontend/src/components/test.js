import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getAllStudent() {
      try {
        const students = await axios.get(
          "http://127.0.0.1:8000/api/user/getdata"
        );
        console.log(students.data);
        setStudents(students.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllStudent();
  }, []);

  return (
    <div>
      <h1 className="container1">STUDENT LIST</h1>
      <table className="table table-bordered border-primary ">
        <thead>
          <tr className="">
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">gender</th>
            <th scope="col">status</th>
            <th scope="col">createdAt</th>
            <th scope="col">updatedAt</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.gender}</td>
                <td>{student.status}</td>
                <td>{student.createdAt}</td>
                <td>{student.updatedAt}</td>
                <td className="d-flex">
                  <div className="mr-1"></div>
                  <div className="mr-"></div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const View = () => {
  const { id } = useParams();
  console.log(id);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getStudent() {
      try {
        const students = await axios.get(
          `http://127.0.0.1:8000/api/user/getuser/${id}/`
        );
        console.log(students.data);
        setStudents(students.data);
        console.log(students.name);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getStudent();
  }, []);

  return (
    <div className="viewcontainer m-4 shadow p-3 mb-5 bg-body rounded">
      <h1 className="container1">this is view page</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">gender</th>
            <th scope="col">status</th>
            <th scope="col">createdAt</th>
            <th scope="col">updatedAt</th>
          </tr>
        </thead>
        <tbody>
          <tr className="container4">
            <td>{students.userId}</td>
            <td>{students.name}</td>
            <td>{students.email}</td>
            <td>{students.gender}</td>
            <td>{students.status}</td>
            <td>{students.createdAt}</td>
            <td>{students.updatedAt}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default View;

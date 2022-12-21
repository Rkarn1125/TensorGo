import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
const Edit = () => {
  const { id } = useParams();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    gender: "",
  });
  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://127.0.0.1:8000/api/user/getuser/${id}`);
        // console.log(student.data);
        setStudent(student.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getStudent();
  }, [id]);

  function onTextFieldChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/user/updateuser/${id}`, student);
    } catch (error) {
      console.log("Something is Wrong");
    }
  }
  return (
    <div className="editcontainer m-4 ">
      <h1 className="container2">Edit DATA</h1>
      <div className="container5 shadow p-3 mb-5 bg-body rounded">
        <form action="" onSubmit={onFormSubmit}>
          <TextField
            id="filled-basic"
            label="id"
            required
            variant="filled"
            value={id}
            sx={{ width: 80, mb: 2 }}
            disabled
          />
          <TextField
            autoComplete="name"
            name="name"
            variant="outlined"
            required
            id="name"
            label="Name"
            value={student.name}
            onChange={(e) => onTextFieldChange(e)}
            sx={{ width: 300, mb: 4 }}
          />
          <br />
          <TextField
            autoComplete="email"
            name="email"
            variant="outlined"
            required
            id="email"
            label="Email Address"
            value={student.email}
            onChange={(e) => onTextFieldChange(e)}
            sx={{ width: 380, mb: 4 }}
          />
          <br />
          <TextField
            autoComplete="gender"
            name="gender"
            variant="outlined"
            required
            id="gender"
            label="Email Address"
            value={student.gender}
            onChange={(e) => onTextFieldChange(e)}
            sx={{ width: 380, mb: 4 }}
          />
          <br />
          <Button type="submit" variant="contained" sx={{ width: 380, mb: 4 }}>
            update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Edit;

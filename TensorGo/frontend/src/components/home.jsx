
import "../index.css";
import List from "./list";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
function Home() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    gender: ""
  });
  const [status, setStatus] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();

    async function getAllStudent() {
      try {
        await axios.post(`http://127.0.0.1:8000/api/user/register`, student);
        setStatus(true);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getAllStudent();
  };

  const handleinput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setStudent({ ...student, [name]: value });
    console.log(student);
  };
  if (status) {
    return <Home />;
  }
  return (
    <>
      <div className="m-4">
        <h1 className="container2">TensorGo</h1>
        <div className="row">
          <div className="col container6 shadow rounded m-4">
            <h1 className="header">Add a new data</h1>
            <form action="" onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="name"
                name="name"
                variant="standard"
                fullWidth
                sx={{ m: 1 }}
                onChange={handleinput}
              />
              <br />
              <TextField
                size=""
                name="email"
                id="outlined-basic"
                label="email"
                variant="standard"
                fullWidth
                sx={{ m: 1 }}
                onChange={handleinput}
                required
              />
              <TextField
                size=""
                name="gender"
                id="outlined-basic"
                label="gender"
                variant="standard"
                fullWidth
                sx={{ m: 1 }}
                onChange={handleinput}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ m: 1 }}
                required
              >
                Success
              </Button>
            </form>
            <a href="http://127.0.0.1:8000/api/user/export-data"> <button type="button" class="btn btn-info">GetDataINCsvFormate</button></a>

           
          </div>
          <div className="col shadow pt-4 mb-5 bg-body rounded mt-4 ">
            <List />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

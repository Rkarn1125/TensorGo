import users from "../models/User1.js";
import express from "express";
const router = express.Router();
import Excel from 'exceljs';

router.post("/register", async (req, res) => {
  const { id, name, email, gender, status } = req.body;

  if (!name || !email) {
    res.status(422).json("plz fill the data");
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("this user is already present");
    } else {
      const adduser = new users({
        id,
        name,
        email,
        gender,
        status,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// get userdata

router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

// get individual user

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await users.findOne({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// update user data

router.put("/updateuser/:id", async (req, res) => {
  let user = req.body;

  const editUser = new users(user);
  try {
    await users.updateOne({ _id: req.params.id }, editUser);
    res.status(201).json(editUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await users.deleteOne({ _id: id });
    res.status(201).json("User deleted Successfully");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});
router.get("/export-data", async (req, res) => {
  try {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');

    worksheet.columns = [
      {
        header: "userId",
        key: "userId",
      },
      {
        header: "name",
        key: "name",
      },
      {
        header: "email",
        key: "email",
      },
      {
        header: "gender",
        key: "gender",
      },
      {
        header: "status",
        key: "status",
      },
    ];
    let counter = 1;
    const userData = await users.find({});

    userData.forEach((user) => {
     
      worksheet.addRow(user);
      counter++;
    });
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformates-officedocument.spreadsheatml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment:filename=users.xlsx`);

    return workbook.xlsx.write(res).then(()=>{
      res.status(200);
    })
  } catch (error) {
    console.log(error);
  }
});

export default router;

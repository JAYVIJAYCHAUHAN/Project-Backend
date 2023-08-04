const admins = require("../models/adminModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.getAdmins = async (req, res) => {
  const _data = await admins.find();
  if (_data) {
    return res.send({ code: 200, message: "success", data: _data });
  } else {
    res.send({ code: 500, message: "service error" });
  }
};

module.exports.AddAdmin = async (req, res) => {
  try {
    const { username, password, type, status } = req.body;
    // const newDate = date.toString();
    // console.log(typeof date, date);
    // console.log(newDate);
    await admins.create({
      username,
      password,
      type,
      status,
    //   date: newDate,
    });

    res.send({
      
      code: 201,
      message: "User created!",
      message: alert("User created!")
    });
  } catch (error) {
    res.send({
      code: 500,
      message: error.message,
    });
  }
};

// module.exports.loginAdmins = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await admins.findOne({ username });
//     if (!user   )
//       return res.send({
//         code: 400,
//          alert: "User not found!",
//        message: "User not found!",
//       });

//    if (user.password !== password)
//       return res.send({
//         code: 400,
//         message: "Invalid password!",
//       });

//     const token = jwt.sign({ _id: user._id }, 'this');
//     res.send({
//       code: 201,
//       message: "Login successful!",
//       token,
//       type: user.type,
//     });
//   } catch (error) {
//     res.send({
//       code: 500,
//       message: error.message,
//     });
//   }
// };

module.exports.loginAdmins = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await admins.findOne({ username });

    if (!user) {
      return res.send({
        code: 400,
        alert: "User not found!",
        message: "User not found!",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return res.send({
        code: 400,
        message: "Invalid password!",
      });
    }

    const token = jwt.sign({ _id: user._id }, 'this');
    res.send({
      code: 201,
      message: "Login successful!",
      token,
      type: user.type,
    });
  } catch (error) {
    res.send({
      code: 500,
      message: error.message,
    });
  }
};


// module.exports.loginAdmins = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await admins.findOne({ username });

//     if (!user) {
//       return res.send({
//         code: 400,
//         alert: "User not found!",
//         message: "User not found!",
//       });
//     }

//     // Compare the provided password with the hashed password stored in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.send({
//         code: 400,
//         message: "Invalid password!",
//       });
//     }

//     const token = jwt.sign({ _id: user._id }, "this");
//     res.send({
//       code: 201,
//       message: "Login successful!",
//       token,
//       type: user.type,
//     });
//   } catch (error) {
//     res.send({
//       code: 500,
//       message: error.message,
//     });
//   }
// };

// const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
// const adminSchema = new mongoose.Schema({
//  // _id: mongoose.Schema.Types.ObjectId,
//   type: String,
//   username: String,
//   status: String,
//   password: String,
//   date: String,
// });
// // adminSchema.pre("save", async function (next) {
// //   if (this.isModified("password") || this.isNew) {
// //     try {
// //       const saltRounds = 10; // You can adjust the number of salt rounds as needed (more rounds = stronger encryption but slower hashing)
// //       const hashedPassword = await bcrypt.hash(this.password, saltRounds);
// //       this.password = hashedPassword.replace(/\$/g, "*"); // Replace the '$' character with '*' to make it visually similar
// //       next();
// //     } catch (error) {
// //       return next(error);
// //     }
// //   } else {
// //     return next();
// //   }
// // });
 
// const Admin = mongoose.model("Admins", adminSchema);

// module.exports = Admin;
// // adminModel.create({
// //   type: "admin",
// //   userName: "admin",
// //   password: "admin23",
// //   status: "active",
// //   date: new Date(),
// // });


const mongoose = require("mongoose");

module.exports = mongoose.model("admins", {
  type: String,
  username: String,
    status: String,
     password: String,
  date: String,
});


 

 
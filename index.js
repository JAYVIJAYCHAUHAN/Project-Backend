const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const servicesControllers = require("./controller/servicesControllers");
const adminController = require("./controller/adminController");
const multer = require("multer");
const admins = require("./models/adminModels");
const Services22 = require("./models/servicesModel");
const app = express();
const upload = multer({ dest: "uploads/" });
app.use("/uploads", express.static("uploads"));

app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, { destination: "./uploads" });
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, { fieldName: file.originalname });
//   },
// });

// const upload = multer({ storage });

app.get("/hello", (req, res) => {
  return res.send("Hello");
});

app.post(
  "/api/services",
  upload.single("image"),
  servicesControllers.addServices
);
app.get("/api/services", servicesControllers.getServices);
app.get("/api/slider", servicesControllers.getSlider);
app.get("/admin/admins", adminController.getAdmins);
app.post("/admin/add", adminController.AddAdmin);

app.post("/admin/login", adminController.loginAdmins);
  
 
app.listen(5000, () => {
  console.log("backend Running at Port 5000");
});

const connectionParams = {
  dbName: "Project",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
   // delete event using Id
    
app.delete("/api/data/:id", async (req, res) => {
  const id = req.params.id;
  //console.log(`Received ID:", ${id}`);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid dataId format" });
  }
  try {
    // Find the document with the given ID and delete it
    const deletedData = await Services22.findByIdAndDelete(id);

    if (!deletedData) {
      // console.log("Data not found. ID:", id);
      return res.status(404).json({ message: "Data not found" });
    }
    console.log("Data deleted successfully. ID:", id);
    console.log("status: ", res.statusCode);
    return res.json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
 
// // delete User using Username

app.delete("/api/dataa/:id", async (req, res) => {
  const ids = req.params.id;
  //console.log(`Received ID:", ${id}`);
  if (!mongoose.Types.ObjectId.isValid(ids)) {
    return res.status(400).json({ message: "Invalid dataId format" });
  }
  try {
    // Find the document with the given ID and delete it
    const deletedDataa = await admins.findByIdAndDelete(ids);

    if (!deletedDataa) {
      // console.log("Data not found. ID:", id);
      return res.status(404).json({ message: "Data not found" });
    }
    console.log("Data deleted successfully. ID:", ids);
   // console.log("status: ", res.statusCode);
    return res.json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
  


// fetching data from database
 app.get("/api/data", async (req, res) => {
   try {
     // Fetch services from MongoDB
     const services = await Services22.find({}, { _id: 1, title: 1 }); // Include _id and title fields only
     res.json(services);
    // console.log(services);
   } catch (error) {
     res
       .status(500)
       .json({ message: "Error fetching services from the database" });
   }
 });
mongoose
  .connect(process.env.MONGO_URL, connectionParams)
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log("Error", e);
  });

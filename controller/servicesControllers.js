const express = require("express");
const bodyParser = require("body-parser");
const { crossOriginResourcePolicy } = require("helmet");
const servicesModel = require("../models/servicesModel");
const jwt = require("jsonwebtoken");
module.exports.getServices = async (req, res) => {
  const _data = await servicesModel.find({});
  if (_data) {
    return res.send({ code: 200, message: "success", data: _data });
  } else {
    res.send({ code: 500, message: "service error" });
  }
};

module.exports.addServices = async (req, res) => {
   console.log(req.body, req.file,16);
    
 console.log(req.headers.authorization);
  //console.log(req,17)
     
   const pass = req.headers.authorization;
  if (!pass) {
    return res.send({ code: 403, message: "no token" });
  } 
 
   else {
    const decoded = jwt.verify(pass, 'this');
    console.log(decoded);
    if (!decoded._id ) {
      return res.send({
        code: 403,
        message: "Unauthorized",
      });
    }
  
      if (decoded.iat - new Date().getTime > 3.6e6) {
    return res.send({
      code: 404,
          message: "token Expired",
   });
    }
  }

  function verifyjwt(req, res, next) {
    const token = req.headers["Authorization"];
    if (!token) return res.status(401).json("Unauthorize user");
console.log("Token:", token);
    try {
      const decoded = jwt.verify(token, 'this');
      req.user = decoded;
      next();
    } catch (e) {
       console.log("Error:", e.message);
      res.status(400).json("Token not valid");
    }
  }
      
  const { title, description ,image,place,SetDate} = req.body;
  // const imageUrl =req.file.path
  if (!title || !description) {
    return res.send({ code: 400, message: "Bad Request" });
  }

   
   const imageUrl = req.file.path;
  const newService = new servicesModel({
    SetDate:SetDate,
    place:place,
    title: title,
    description: description,
    imageUrl:imageUrl,
  });

  const success = await newService.save();

  if (success) {
   
    return res.send({ code: 200, message: " add success" });
  } else {
    res.send({ code: 500, message: "service error" });
  }
};

module.exports.getSlider = (req, res) => {
  const url1 = "https://picsum.photos/400/300";
  const url2 = "https://picsum.photos/400/300";
  const url3 = "https://picsum.photos/400/300";
  const url4 = "https://picsum.photos/400/300";
  const arr = [url1, url2, url3, url4];
  res.send({ code: 200, message: "success", data: arr });
};



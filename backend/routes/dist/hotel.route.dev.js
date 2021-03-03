"use strict";

var express = require('express');

var multer = require("multer");

var app = express();
var hotelRoute = express.Router();
/* const HotelCategoryRoute = express.Router(); */
// Hotel model

var Hotel = require('../model/Hotel');
/* let HotelCategory = require('../model/Hotel-category') */


var MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var isValid = MIME_TYPE_MAP[file.mimetype];
    var error = new Error("Invalid mime type");

    if (isValid) {
      error = null;
    }

    cb(error, "./images");
  },
  filename: function filename(req, file, cb) {
    var name = file.originalname.toLowerCase().split(' ').join('-');
    var ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
}); // Add Hotel

hotelRoute.post('/add-hotel', multer({
  storage: storage
}).array("images", 7), function (req, res, next) {
  var url = req.protocol + '://' + req.get('host');
  var hotel = new Hotel({
    // _id: new mongoose.Types.ObjectId(),
    images: url + '/images/' + req.images,
    name: req.body.name,
    style: req.body.style,
    deals: req.body.deals,
    amenities: req.body.amenities,
    rooms: req.body.rooms,
    map: req.body.map,
    "class": req.body["class"],
    Pricedeals: req.body.Pricedeals,
    popular: req.body.popular,
    langaugeSpoken: req.body.langaugeSpoken // image_path: url + '/images/' + req.file.filename,
    // restaurant_features:req.body.restaurant_features,
    // establishment_type:req.body.establishment_type,
    // meals:req.body.meals,
    // price_range:req.body.price_range, 
    // cuisine:req.body.cuisine,
    // dietary_restrictions:req.body.dietary_restrictions,
    // location:req.body.location,
    // phone:req.body.phone

  });
  hotel.save().then(function (result) {
    console.log(result);
    res.status(201).json({
      message: "data saved successfully!",
      id: result._id
    });
  });
}); // hotelRoute.route('/add-hotel').post((req, res, next) => {
//   Hotel.create(req.body, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// });
// Get all hotels

hotelRoute.route('/').get(function (req, res) {
  Hotel.find(function (error, data) {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
/* //Get hotel categories
HotelCategoryRoute.route('/').get((req, res) => { 
  HotelCategory.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
 */
// Get single hotel

hotelRoute.route('/read-hotel/:id').get(function (req, res) {
  Hotel.findById(req.params.id, function (error, data) {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
}); // Update hotel

hotelRoute.route('/update-hotel/:id').put(function (req, res, next) {
  Hotel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, function (error, data) {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
      console.log('Hotel successfully updated!');
    }
  });
}); // Delete hotel

hotelRoute.route('/delete-hotel/:id')["delete"](function (req, res, next) {
  Hotel.findByIdAndRemove(req.params.id, function (error, data) {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  });
});
module.exports = hotelRoute;
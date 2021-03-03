const express = require('express');
const HotelCategoryRoute = express.Router();
let HotelCategory = require('../model/Hotel-category')

//Get hotel categories
HotelCategoryRoute.route('/').get((req, res) => { 
    HotelCategory.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  module.exports = HotelCategoryRoute;
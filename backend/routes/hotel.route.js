const express = require('express');
const multer = require("multer");
const app = express();
const hotelRoute = express.Router();
/* const HotelCategoryRoute = express.Router(); */
// Hotel model
let Hotel = require('../model/Hotel');
/* let HotelCategory = require('../model/Hotel-category') */
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "./images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
// Add Hotel

hotelRoute.post('/add-hotel', multer({
        storage: storage
    }).array("images", 7), (req, res, next) => {
        const url = req.protocol + '://' + req.get('host')
        const hotel = new Hotel({
            // _id: new mongoose.Types.ObjectId(),
            images: url + '/images/' + req.images,
            name: req.body.name,
            style: req.body.style,
            deals: req.body.deals,
            amenities: req.body.amenities,
            rooms: req.body.rooms,
            map: req.body.map,
            class: req.body.class,
            Pricedeals: req.body.Pricedeals,
            popular: req.body.popular,
            langaugeSpoken: req.body.langaugeSpoken



            // image_path: url + '/images/' + req.file.filename,
            // restaurant_features:req.body.restaurant_features,
            // establishment_type:req.body.establishment_type,
            // meals:req.body.meals,
            // price_range:req.body.price_range, 
            // cuisine:req.body.cuisine,
            // dietary_restrictions:req.body.dietary_restrictions,
            // location:req.body.location,
            // phone:req.body.phone

        });
        hotel.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: "data saved successfully!",
                id: result._id

            })
        })
    })
    // hotelRoute.route('/add-hotel').post((req, res, next) => {
    //   Hotel.create(req.body, (error, data) => {
    //     if (error) {
    //       return next(error)
    //     } else {
    //       res.json(data)
    //     }
    //   })
    // });

// Get all hotels
hotelRoute.route('/').get((req, res) => {
    Hotel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

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
hotelRoute.route('/read-hotel/:id').get((req, res) => {
    Hotel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update hotel
hotelRoute.route('/update-hotel/:id').put((req, res, next) => {
    Hotel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Hotel successfully updated!')
        }
    })
})

// Delete hotel
hotelRoute.route('/delete-hotel/:id').delete((req, res, next) => {
    Hotel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = hotelRoute;
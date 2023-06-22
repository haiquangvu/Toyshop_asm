var mongoose = require('mongoose');

var ToySchema = mongoose.Schema(
    {
        name : String,
        stock_quantity : Number, 
        manufacturer : String,
        size : String,
        material : String,
        price : Number,
        image : String    
    }
);
var ToyModel = mongoose.model("TOY", ToySchema, "toy");
module.exports = ToyModel;
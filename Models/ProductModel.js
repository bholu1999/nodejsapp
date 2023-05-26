const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required: [true, "please enter product name"]
        },
        quantity: {
            type : Number,
            required : true,
            default : 0
        },
        price :{
            type : Number,
            required: true
        },
        image : {
            type: String,
            required : false
        }
    },
    {
        timestamps: true
    }
)

const product = mongoose.model('Product',ProductSchema);

module.exports=product;
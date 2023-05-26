const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Product = require('./Models/ProductModel');

//middleware 
app.use(express.json());

//route
app.get('/', (req,res) => {
    res.send("Hello Node Api");
})

//get all products form Mongodb
app.get("/product", async(req,res)=>{
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

//get product data by id
app.get("/product/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).json(product);
        console.log(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

//post data into databse
app.post("/product",async(req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
        console.log(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})

//update data into database by id
app.put("/product/:id", async(req,res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            res.status(404).json({message:`product not found ${id}`});
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

//update data into database by id
app.delete("/product/:id", async(req,res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message:`product not found ${id}`});
        }
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

// make connection between node and mongodb
mongoose.connect("mongodb+srv://kumarbholadas763:763763763@cluster0.tnxkhcx.mongodb.net/Data?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to cluster");
    app.listen(3000, () => {
        console.log("listening in port 3000");
    })
}).catch((error)=>{
    console.log(error);
})
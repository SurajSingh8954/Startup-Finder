const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
    console.log("Contact route hit!");
    console.log(req.body);

    // rest of your code...
});

router.post("/", async (req,res)=>{

    try{

        const {name,email,message}=req.body;

        if(!name || !email || !message){

            return res.status(400).json({
                message:"All fields are required"
            });

        }

        const contact = new Contact({
            name,
            email,
            message
        });

        await contact.save();

        res.status(201).json({
            success:true,
            message:"Message sent successfully"
        });

    }
    catch(err){

        console.log(err);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

module.exports = router;
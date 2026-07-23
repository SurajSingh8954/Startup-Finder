const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");

dotenv.config();

const connectDB=require("./config/db");

connectDB();

const app=express();

app.use(cors({
    origin:process.env.CLIENT_URL
}));

app.use(express.json());

app.use("/api/contact",require("./routes/contact"));

app.get("/",(req,res)=>{
    res.send("StartupFinder API Running");
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});
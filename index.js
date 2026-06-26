import express, { urlencoded } from "express"
import cors from "cors"
import fs from "fs"
import autoDataFill from "./auto.js";
import "dotenv/config"

const app = express();

app.use(express.json());

autoDataFill();

app.use(express.urlencoded({extended:false}));
app.use(cors({origin:"*"}));

let data = JSON.parse(fs.readFileSync("./hack.json","utf-8"));

app.get("/api/hacks/live",async (req,res)=>{
  try {
    console.log(data);
    // res.send("working");
        res.status(200).json({
            success:true,
            "data": data
        })
    }catch(err){
        res.status(500).json({
            sucess:false
        })
    }
})

app.listen(process.env.PORT, () => {
  console.log("Server running")
})


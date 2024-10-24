import express from "express";
import dotenv from "dotenv";
import path from "path";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

databaseConnection();

dotenv.config({
    path:".env"
})
const app = express();
const __dirname = path.resolve();

//middlewares 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:'https://netflix2-0-p4c7.onrender.com',
    credentials:true
}
app.use(cors(corsOptions));
 
// api
app.use("/api/v1/user", userRoute);

app.use(express.static(path.join(__dirname, "/netflix/build")));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "netflix", "build", "index.html"));
});

app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});

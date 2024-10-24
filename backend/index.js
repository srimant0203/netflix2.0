import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

databaseConnection();

dotenv.config({
    path:".env"
})

const app = express();
//middlewares 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:3000',
    credentials:true
}
app.use(cors(corsOptions));
 
// api
app.use("/api/v1/user", userRoute);

app.use(express.static(path.join(__dirname, "/netflix/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "netflix", "dist", "index.html"));
});

app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});
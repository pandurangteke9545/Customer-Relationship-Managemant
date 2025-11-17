const express = require("express")
const sequelize = require('./db');
const app = express()
const port = 5000;
const bodyParser = require("body-parser")
const {authRouter} = require("./src/routes/authroutes.js");
const { userRouter } = require("./src/routes/userroutes.js");
const { authMiddleware } = require("./src/middleware/authmiddleware.js");
const { leadRouter } = require("./src/routes/leadRoutes.js");
const activityrouter = require("./src/routes/activityroutes.js");
const cors = require("cors")

app.use(bodyParser.json());

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true,
}))
app.use('/auth',authRouter)
app.use('/user',authMiddleware,userRouter)
app.use('/leads',leadRouter)
app.use('/activity',authMiddleware,activityrouter)


app.get('/start',(req,res)=>{
    res.status(200).json({message:"Application Started"})
})


app.listen(port,async()=>{
    console.log("Server running on port",port)
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})
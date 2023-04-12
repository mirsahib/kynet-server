import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors'
import cookieParser from 'cookie-parser';
import userRoutes from "./src/routes/user.routes"
import authRoutes from './src/routes/auth.routes'
import adsRoutes from './src/routes/ads.routes'
const app = express();

const corsOptions:CorsOptions = {
    origin: true,
    credentials:true,
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use("/",userRoutes)
app.use("/",authRoutes)
app.use("/",adsRoutes)

app.get('/api/test',(req,res)=>{
    res.send('Hello')
})

  

export default app
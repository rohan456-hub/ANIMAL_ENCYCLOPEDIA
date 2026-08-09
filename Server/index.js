const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const {collection}=require('./model')
const router=require('./routes')
const Task=require('./model')
const connectDB = require('./db')
const loadEnv = require('../loadEnv')
const path = require('path')

loadEnv()



const app=express()
const allowedOrigins = (process.env.CLIENT_URLS || 'http://localhost:3000,http://localhost:3001')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('Origin is not allowed by CORS'))
  },
}))
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

connectDB()
const PORT=process.env.PORT || process.env.SERVER_PORT || 4000;

app.use('/api',router)
app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }))

app.listen(PORT,()=>console.log(`server running on port ${PORT}`));

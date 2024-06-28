const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
const corsConfig = app.use(cors(
    {
        origin: ["https://vercel-deploy-fe.vercel.app"]
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())
app.options("",cors(corsConfig))
mongoose.connect('mongodb+srv://dhinaashwin11:Mongopassword@cluster0.iyp2kv4.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')

app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})

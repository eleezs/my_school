// loading express modules
const  mongoose  = require('mongoose');
const express =  require('express');
const cors = require("cors");
const path = require('path');
const router = express.Router();
require("dotenv").config();
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded ({ extended : true }))

//to load css files and html
app.use(express.static(path.join(__dirname + '/static')));
app.use(express.static(path.join(__dirname + '/views')));

// connect to Db
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log("mongodb is connected");
}).catch((error)=>{
  console.log("mongodb not connected");
  console.log(error);
}); 

// mongoose.connect('mongodb://localhost/Oluaka_Db')
//     .then(() => console.log('Connected to Mongodb..'))
//     .catch((err) => console.log('Could not connect to Mongodb.. ', err));



// user registration
const signUp = require('./routes/signup')

app.post('/register', signUp)


// login User
const login = require('./routes/login')
app.post('/login', login )




//PORT Environment var
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));






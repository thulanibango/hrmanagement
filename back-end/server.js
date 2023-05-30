const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE')
  next();
})

app.use('/api/users', usersRoutes); 

app.use((req, resp, next) =>{
    const error = new HttpError('route not found', 404);
    throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});


mongoose
.connect("mongodb+srv://tulanihr:paMi5jZJgyDvjc6n@tulani.v87qhh9.mongodb.net/employees?retryWrites=true&w=majority")
.then(()=>{
  app.listen(5001);
})
.catch(err=>{
  console.log(err)
});

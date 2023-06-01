// Here i am mimicing the MVC structure without the view
const { validationResult } = require('express-validator'); //check for errors of code
const bcrypt = require('bcryptjs'); //for enrypting password

const HttpError =require('../models/http-error');
const User = require('../models/user')

//Get all users
const getUsers = async(req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({users: users.map(user => user.toObject({ getters: true }))});
  };

  //get useres by Id 
const getUserById = async (req, res, next)=>{
    const userid = req.params.uid; 
    let user
    try {
       user = await User.findById(userid);
    } catch (err) {
      const error =new HttpError('Somethinge went wrong,',500);
      return next(error);
    }
    if(!user){
       const error =  new HttpError('User id not found', 404);  
       return next(error)
    }
     res.json({data:user.toObject({getters:true}), message:"success"})
};

//Create a user
const createUser = async (req, res, next)=>{
    // object destructring
    const {name,  email,password }=req.body;
    const createdUser = new User({
      name,
      email,
      password
    });
    try {
      await  createdUser.save();
      
    } catch (err) {
      const error =new HttpError('Creating user failed, please try again',500);
      return next(error);
      
    }
   
    res.status(201).json({user:createUser})


}

//update a user
const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const {name, description, email, isAdmin, address,image }=req.body;
    const userId = req.params.uid;
  let user;
    try {
      user=await User.findById(userId);
    } catch (err) {
      const error =new HttpError('Update failed, please try again',500);
      return next(error);
    };
    user.name = name;
    user.description = description;
    user.email = email;
    user.isAdmin = isAdmin;
    user.address = address;
    user.image = image;
    try {
      await user.save()
    } catch (err) {
      const error =new HttpError('Update failed on the database, please try again',500);
      return next(error);
    }
    res.status(200).json({ data: user.toObject({getters:true}) });
  };
//delete a user
  const deleteUser = async(req, res, next) => {
    const userId = req.params.uid;
    let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete user.',
      500
    );
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete user.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted user.' });
  };

  //login 
  const login = async(req, res, next) => {
    const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser ) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }
  let isValidPass =false;
  try {
  isValidPass = await bcrypt.compare(password, existingUser.password)
  } catch (err) {
    const error = new HttpError(
      'Try again creditials.',
      500
    );
    return next(error);
  }

  if (!isValidPass ) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }


  res.json({message: 'Logged in!'});
  };

  //create an account
  const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
    const { name, email, password } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (existingUser) {
      const error = new HttpError(
        'User exists already, please login instead.',
        422
      );
      return next(error);
    }
    let hashpassword;
    try {
    hashpassword= await bcrypt.hash(password, 12)
      
    } catch (err) {
      const error = new HttpError(
        'Could not create user, hashing issue',
        500
      );
      return next(error);

      
    }
    const createdUser = new User({
      name,
      email,
      password:hashpassword
    });
    
  console.log(createdUser)
    try {
      await createdUser.save();
    } catch (err) {
      console.log(err)
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
  
    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
  };
exports.getUsers = getUsers;
exports.getUserById=getUserById;
exports.createUser = createUser;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;
exports.signup = signup;
exports.login = login;

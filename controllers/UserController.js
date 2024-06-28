const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors')

const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if(!user) throw new createError(404, "User not found");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new createError(401, 'Invalid Password.');
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({user, token});
    }catch(err){
        next(err);
    }
}

const register = async (req, res, next) => {
    try{
        const { username, password, name, email, contactNumber, role } = req.body;
        let user = await User.findOne({username});
        if(!user) throw new createError(400, "User already exists with the given username.");
        user = new User({username, password, name, email, contactNumber, role});
        const savedUser = await username.save();

        res.status(200).json({user: savedUser, msg: "User registered successfully"});
    }catch(err){
        next(err);
    }
}

module.exports = { register, login};
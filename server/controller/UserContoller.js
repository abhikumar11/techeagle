const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup=async(req, res)=>{
    const {username,password} = req.body;
    try {
        const user=new User({username,password});
        await user.save();
        const token=jwt.sign({userId:user._id},"2C2uy50GkHC38nZ3",{expiresIn:"1h"})
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error:err.message});
    }
}
exports.signin=async(req, res)=>{
    const {username,password} = req.body;
    try {
        const user=await User.findOne({username:username});
        if(!user || !(await user.matchPassword(password))){
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, "2C2uy50GkHC38nZ3", { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error:err.message});
    }
}
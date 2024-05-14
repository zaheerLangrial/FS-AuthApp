import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  console.log("request", req.body);
  const { fullname, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ message: "Your account is already existing" });
  }
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    fullname: fullname,
    email: email,
    password: hashPassword,
  });
  try {
    newUser.save();
    res.status(200).json({ message: "Account Created Successfull" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signIn = async (req , res) => {
    const {email , password} = req.body;
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return res.status(404).json({message : 'User not found'})
        const validPassword = bcryptjs.compareSync(password , validUser.password);
        if(!validPassword) return res.status(401).json({message : 'Invalid password'})
        const token = jwt.sign({id : validUser._id} , process.env.JWT_SCRET)
        const {password : hashPassword , ...rest} = validUser._doc
        const expairyDate = new Date(Date.now() + 3600000)
        res.cookie('access token' , token , {httpOnly : true , expires : expairyDate }).status(200).json(rest)
    } catch (error) {
        console.log('Error' , error)
    }
}

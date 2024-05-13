import User from "../model/user.model.js";


export const signUp = async (req , res) => {
    console.log('request' , req.body)
    const {fullname , email , password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message : 'Your account is already existing'})
        }
    } catch (error) {
        console.log('Error' , error)
    }
}
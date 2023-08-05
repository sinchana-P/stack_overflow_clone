import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import users from '../models/auth.js'

// for url :  /user/signup          
export const signup = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        // this request is sent to database, so use ---> await
        const existinguser = await users.findOne({ email });

        if(existinguser){   // if not NULL
            return res.status(404).json({message: "User already Exist."});
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        
        // create user in db :     //name, email   :  from req.body
        const newUser = await users.create({name, email, password: hashedPassword})
        const token = jwt.sign({ email: newUser.email, id:newUser._id }, "test", { expiresIn: '1h' });
        
        // sending response to the user for "frontend" : the newUser & token
        res.status(200).json({ result: newUser, token })
        console.log(res.status(200).json({ result: newUser, token }))
    }catch(error){
        res.status(500).json("Something went wrong...");
        console.log(error);
    }
} 

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const existinguser = await users.findOne({ email });
        if(!existinguser){
            return res.status(404).json({ message: "user doesn't Exist." })
        }
        
        const token = jwt.sign({ email: existinguser.email, id:existinguser._id }, "test", { expiresIn: '1h' });
        res.status(200).json({ result: existinguser, token })

        const isPasswordCrct = await bcrypt.compare(password, existinguser.password)
        if(!isPasswordCrct){
            return res.status(400).json({message: "Invalid credentials."})
        }

    }catch(error){
        res.status(500).json("Something went wrong...")
    }
} 




// findOne() method returns a Promise that resolves to the first document in the collection that matches the query. 

// bcrypt.hash
// bcrypt.compare
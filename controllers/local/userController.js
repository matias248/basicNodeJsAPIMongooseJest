import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { usersLocal } from "../../localData/user.js"
const users = usersLocal;


export class UserController {
    signup = async (req, res, next) => {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = {
                    email: req.body.email,
                    password: hash
                };
                users.push(user)
                res.status(201).json({ message: 'User created !' })
            })
            .catch(error => { console.log(error); res.status(500).json() });
    };




    login = async (req, res, next) => {
        const user = users.find(user => user.email === req.body.email);
        if (!user) {
            return res.status(401).json({ error: 'User not found !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Invalid password!' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '7d' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    }


}
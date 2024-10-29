import env from 'dotenv'
env.config()

import jwt from 'jsonwebtoken'

const generateToken = (id) =>{
    return jwt.sign({
        id: id
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
}

export default generateToken;
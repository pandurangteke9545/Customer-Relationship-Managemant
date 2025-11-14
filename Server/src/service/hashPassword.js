const {hash} = require("bcrypt")

async function hashPassword(password){

    try {
        saltRound = 10;
        const hashedPassword = await hash(password,saltRound)
        return hashedPassword
    } catch (error) {
        console.log("Error in hashing password",error)
        throw error;
    }
}

module.exports = {hashPassword}
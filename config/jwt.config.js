require('dotenv').config();

module.exports = {
    secretKey:process.env.JWT_SECRET,
    expiresIn:'2h'
}
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized! A token is required for authentication.'
        });
    }

    const token = authHeader.split(' ')[1];

    try{
        const { user } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    }catch(error){
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized! Invalid token.'
        });
    }
};






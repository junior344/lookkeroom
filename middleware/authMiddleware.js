import jwt from 'jsonwebtoken';

 const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(401).json({ message: 'Unauthorized' });
        req.user = user;
        next();
    });
}

export default authenticate;
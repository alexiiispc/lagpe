const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    // Si no hay token, no autorizado
    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, "Stack", (err, user) => {
        // Si el token no es válido
        if (err) return res.sendStatus(403); 
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;

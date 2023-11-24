const jwt = require("jsonwebtoken");
const JWT_SECRET="rishiisagoodb$y";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate with a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send({ error: "Please authenticate with a valid token" });
    }
};

module.exports = fetchuser;

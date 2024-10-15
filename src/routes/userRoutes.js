const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');

// Middleware de autorização
const authorize = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };  // Attaching user info to req object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

router.get('/', userController.getFirstUser);

// Rota para registrar um novo usuário
router.post('/register', userController.registerUser);

// Rota para login de usuário (autenticação)
router.post('/login', userController.loginUser);  // Apenas chama o controlador diretamente

// Rota para obter o perfil do usuário (protegida)
router.get('/profile', authorize, userController.getUserProfile);

module.exports = router;


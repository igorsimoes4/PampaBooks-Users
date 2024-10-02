// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const jwt = require('jsonwebtoken');

// // Middleware de autenticação
// // const authenticate = (req, res, next) => {
// //     const {email, password} = req.body;

// //     const user = userController.loginUser(email, password);

// //     if (!user) {
// //         return res.status(401).json({ message: 'Email or password is incorrect' });
// //     }
        
// //     const token = user.token;
// //     res.set('x-auth-token', token);
// //     return res.status(200).json({ message: 'Authentication successful' });
// //     next();


// //     if (!token) {
// //         return res.status(401).json({ message: 'No token provided' });
// //     }

// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //         req.user = { id: decoded.id };
// //         next();
// //     } catch (error) {
// //         res.status(401).json({ message: 'Invalid token' });
// //     }
// // };

// const authenticate = (req, res, next) => {
//     const { email, password } = req.body;

//     const user = userController.loginUser(email, password);

//     if (!user) {
//         return res.status(401).json({ message: 'Email or password is incorrect' });
//     }

//     const token = user.token;  // Assuming the token is generated in loginUser function
//     res.set('x-auth-token', token);
    
//     next();  // Continue to the next handler
// };


// const authorize = (req, res, next) => {
//     const token = req.header('x-auth-token');

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { id: decoded.id };  // Attaching user info to req object
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };


// router.get('/', userController.getFirstUser);


// // Rota para registrar um novo usuário
// router.post('/register', userController.registerUser);

// // Rota para login de usuário (autenticação)
// router.post('/login', authenticate, (req, res) => {
//     res.status(200).json({ message: 'Login successful', token: res.get('x-auth-token') });
// });

// // Rota para obter o perfil do usuário (protegida)
// router.get('/profile', authorize, userController.getUserProfile);


// module.exports = router;

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


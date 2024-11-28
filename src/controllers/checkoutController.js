const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const axios = require('axios');

const Order = require('../models/Order');
const User = require('../models/User');


// URL do microserviço de livros
const BOOKS_SERVICE_URL = process.env.BOOKS_SERVICE_URL || 'http://localhost:3002/api/books/search';

// Função para finalizar a compra
exports.completeCheckout = async (req, res) => {
    console.log("Iniciando função completeCheckout");

    const { cart, address, payment } = req.body;
    console.log("Dados recebidos:", req.body);

    if (!cart || cart.length === 0) {
        console.log("Erro: Carrinho vazio");
        return res.status(400).json({ success: false, message: 'Carrinho vazio' });
    }

    console.log("Usuário autenticado:", req.user);

    try {
        // Obter IDs dos livros no carrinho
        const productIds = cart.map(item => item.productId);

        // Buscar informações dos livros no microserviço
        const response = await axios.get(`http://127.0.0.1:3002/api/books/search`, {
            params: { ids: productIds.join(',') }
        });
        const books = response.data.books;

        if (!books || books.length === 0) {
            console.log("Erro: Livros não encontrados");
            return res.status(404).json({ success: false, message: 'Livros não encontrados' });
        }

        // Calculando o preço total
        const totalPrice = cart.reduce((acc, item) => {
            const book = books.find(b => b._id === item.productId);
            console.log("Livro encontrado:", book);
            return acc + (book ? book.price * item.quantity : 0);
        }, 0);

        console.log("Preço total calculado:", totalPrice);

        // Criando o pedido
        const order = new Order({
            userId: req.user.id,
            items: cart.map(item => ({
                bookId: item.productId,
                quantity: item.quantity
            })),
            totalPrice,
            address,
            payment,
            status: 'Pago',
            createdAt: new Date()
        });

        console.log("Pedido criado:", order);

        // Salvando o pedido no banco de dados
        const savedOrder = await order.save();
        console.log("Pedido salvo:", savedOrder);

        // Atualizando o histórico de compras do usuário
        const user = await User.findById(req.user.id);
        console.log("Usuário encontrado:", user);

        user.purchaseHistory.push({
            orderId: savedOrder._id,
            items: cart.map(item => ({
                bookId: item.productId,
                quantity: item.quantity
            })),
            totalPrice,
        });

        await user.save();

        
        res.status(200).json({
            success: true,
            message: 'Compra realizada com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao processar compra BackUsuario:', error);
        res.status(500).json({ success: false, message: 'Erro ao finalizar compra' });
    }
};

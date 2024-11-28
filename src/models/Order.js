const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Em andamento', 'Pago', 'Enviado', 'Entregue'],
        default: 'Em andamento'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
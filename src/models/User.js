const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  purchaseHistory: [{
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', // Referencia ao esquema de pedidos, caso você tenha um
      required: true,
    },
    items: [{
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Referencia ao esquema de produtos
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      }
    }],
    totalPrice: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    }
  }]
});


module.exports = mongoose.model('User', UserSchema);

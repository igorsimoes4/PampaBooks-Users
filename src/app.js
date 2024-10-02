const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Iniciar a aplicação Express
const app = express();

// Middleware para processar requisições JSON
app.use(express.json());

// Middleware para processar requisições URL-encoded (formulários HTML)
app.use(express.urlencoded({ extended: true }));

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Importar rotas
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

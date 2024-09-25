// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Configurações do servidor
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'fiaprm552432.mysql.database.azure.com',
  user: 'User',
  password: 'Admin123',
  database: 'cidadaoshopping', // Insira o nome do seu banco de dados
  ssl: {
    rejectUnauthorized: true, // Se necessário
  },
});

// Testar conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Endpoint para registro de usuário
app.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Validação simples
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, phone], (error, results) => {
      if (error) {
        console.error('Erro ao registrar usuário:', error);
        return res.status(500).json({ message: 'Erro ao registrar usuário.' });
      }
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

// Endpoint para login de usuário
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }
  
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ message: 'Erro ao buscar usuário.' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Email ou senha incorretos.' });
      }
  
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Erro ao comparar senhas:', err);
          return res.status(500).json({ message: 'Erro ao verificar senha.' });
        }
  
        if (!isMatch) {
          return res.status(401).json({ message: 'Email ou senha incorretos.' });
        }
  
        res.status(200).json({ message: 'Login realizado com sucesso!', user });
      });
    });
});

// Rota para agendar serviços
app.post('/api/bookings', (req, res) => {
  const { date, time, service, userId } = req.body;

  const sql = 'INSERT INTO bookings (user_id, appointment_date, appointment_time, service) VALUES (?, ?, ?, ?)';
  db.query(sql, [userId, date, time, service], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao agendar o serviço.' });
    }
    res.status(200).json({ message: 'Agendamento realizado com sucesso!' });
  });
});

// Endpoint para obter os agendamentos de um usuário específico
app.get('/api/bookings/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `SELECT * FROM bookings WHERE user_id = ?`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar agendamentos:', err);
      res.status(500).json({ message: 'Erro ao buscar agendamentos.' });
    } else {
      res.json(results);
    }
  });
});

// Rota para cancelar (excluir) um agendamento
app.delete('/api/bookings/:id', (req, res) => {
  const bookingId = req.params.id;

  // Exclui o agendamento com base no ID
  const query = 'DELETE FROM bookings WHERE id = ?';
  db.query(query, [bookingId], (err, result) => {
    if (err) {
      console.error('Erro ao cancelar agendamento:', err);
      return res.status(500).json({ message: 'Erro ao cancelar agendamento.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }

    res.status(200).json({ message: 'Agendamento cancelado com sucesso.' });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

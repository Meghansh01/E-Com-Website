const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const products = require('./products');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Serve static files from client assets directory
const path = require('path');
app.use('/assets', express.static(path.join(__dirname, '../client/src/assets')));

const carts = {};
const orders = [];
const users = [];

app.get('/api/products', (req, res) => res.json(products));

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const p = products.find(x => x.id === id);
  if (!p) return res.status(404).json({message: 'Product not found'});
  res.json(p);
});

app.post('/api/cart/:sessionId/add', (req, res) => {
  const { sessionId } = req.params;
  const { productId, qty } = req.body;
  if (!carts[sessionId]) carts[sessionId] = [];
  const existing = carts[sessionId].find(i=>i.productId===productId);
  if (existing) existing.qty += qty;
  else carts[sessionId].push({productId, qty});
  res.json({ cart: carts[sessionId] });
});

app.get('/api/cart/:sessionId', (req,res)=>{
  const { sessionId } = req.params;
  const cart = carts[sessionId] || [];
  const detailed = cart.map(item=>{
    const p = products.find(x=>x.id===item.productId);
    return { ...p, quantity: item.qty };
  });
  res.json(detailed);
});

app.post('/api/checkout/:sessionId', (req,res)=>{
  const { sessionId } = req.params;
  const { name, email } = req.body;
  const cart = carts[sessionId] || [];
  if (!cart.length) return res.status(400).json({message:'Cart empty'});
  const items = cart.map(item=>{
    const p = products.find(x=>x.id===item.productId);
    return { id: p.id, name: p.name, price: p.price, qty: item.qty };
  });
  const total = items.reduce((a,b)=>a + b.price*b.qty, 0);
  const order = { id: uuidv4(), name, email, items, total, date: new Date() };
  orders.push(order);
  carts[sessionId] = [];
  res.json({ order });
});

app.get('/api/orders', (req,res)=> res.json(orders));

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Signin endpoint
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  try {
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    res.json({ message: 'Signin successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error signing in' });
  }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>console.log('Server running on port', PORT));

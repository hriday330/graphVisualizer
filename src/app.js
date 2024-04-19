const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const graphRoutes = require('./routes/graphRoutes');
const pool = require('./config/database');

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/graph', graphRoutes);

app.set('pool', pool);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
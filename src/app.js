const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const graphRoutes = require('./routes/graphRoutes');
const pool = require('./config/database');
const session = require('express-session')
const setupSchema = require('./config/schemaSetup');

const app = express();

app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1 day (in milliseconds)
}
}));

app.use('/api/auth', authRoutes);
app.use('/api/graph', graphRoutes);

app.set('pool', pool);

setupSchema().then(
  () => {
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  }
)

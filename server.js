const express = require('express');

const app = express();

// connect database

const connectDB = require('./config/db')

connectDB()

// init MiddleWare
app.use(express.json()); // we can now accept json data as middleware


app.get('/', (req,res) => 
   res.json({msg : 'Welcome to the Contact keeper app'})
);

// Define Routes

app.use('/api/users', require('./routes/users'))

app.use('/api/auth', require('./routes/auth'))

app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5100

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

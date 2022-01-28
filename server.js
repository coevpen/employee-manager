const express = require('express');
const db_connection = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(4040).end();
});

db_connection.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server runing on port ${PORT}`);
    });
});
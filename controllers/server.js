require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mariadb = require('mariadb');
const app = express();
const port = 3000;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'josias',
    password: 'root',
    database: 'lokker',
    port: 3307,
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database');
        connection.release();
    } catch (err) {
        console.log('Error connecting to the database :', err);
    }
})();

const createUser = async (email, hashedPassword) => {
    try {
        const result = await pool.query(
            'INSERT INTO user (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );
        console.log('Insert Result:', result);
        return result; // Adjust this based on what you want to return
    } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
    }
};
app.get('/', (req, res) =>{
    res.send('welcome to my chat app');
})

app.post('/api/register', async (req, res) => {
    console.log('Request body:', req.body);
   const { email, password } = req.body;
    try {
        const hasPassword = bcrypt.hashSync(password, 5);
        console.log(email, hasPassword);
        const result = await  createUser(email, hasPassword);
        res.status(201).json({ message: 'User created', result });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});
const getUserByEmail = async (email) => {
    try {
        const result = await pool.query(
            `SELECT * FROM user WHERE email = "${email}"`,
            
        );
        if (result.length > 0) {
            return result[0]; // Renvoyez le premier utilisateur trouvé
        }
        console.log('Rows:', result);
        return null; // Renvoyez null si aucun utilisateur n'est trouvé
    }catch (error) {
        console.error('Error in getUserByEmail:', error);
        throw error;
    }
};
app.post('/api/login', async (req, res) => {
    console.log('Request body:', req.body);
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    console.log(user);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
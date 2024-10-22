// const app = express();
// const port = 3000;



// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// // Test de connexion à la base de données

// const createUser = async (email, hashedPassword) => {
//     try {
//         const result = await pool.query(
//             'INSERT INTO user (email, password) VALUES (?, ?)',
//             [email, hashedPassword]
//         );
//         console.log('Insert Result:', result);
//         return result; // Adjust this based on what you want to return
//     } catch (error) {
//         console.error('Error in createUser:', error);
//         throw error;
//     }
// };

// const createLobby = async (req, res) => {
//     const { name } = req.body;
//     try {
//       const result = await pool.query(
//         'INSERT INTO lobbies (name, admin_id) VALUES ($1, $2) RETURNING *',
//         [name, req.user.userId]
//       );
//       res.status(201).json({ lobby: result.rows[0] });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// };
// app.post('/api/lobby', authenticate, async (req, res) => {
//     const {name} = req.body;
//     const admin_id = req.user.user.id;

//     try {
//         const result = await pool.query(
//             'INSERT INTO lobbies (name, admin_id) VALUES (?, ?)',
//             [name, admin_id]
//         );
//         res.status(201).json({message: 'lobby cree', lobby: result });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })
// // Récupérer tous les lobbies d'un utilisateur
// app.get('api/lobby/:id',authenticate, async (req, res) => {
//     const { id } = req.params.id;
//     try {
//         const result = await pool.query(
//             'SELECT * FROM lobbies WHERE id = ?',
//             [id]
//         );
//         res.json({ lobby: result });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })
// //poster un message dans un lobby
// app.post('/api/lobby/:id/:message', authenticate, async (req, res) => {
//     const { id } = req.params.id;
//     const { message } = req.body;
//     try {
//         const result = await pool.query(
//             'INSERT INTO messages (lobby_id, user_id, message) VALUES (?, ?, ?)',
//             [id, req.user.userId, message]
//         );
//         res.status(201).json({ message: 'message cree', message: result });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })
// //Modifier un message
// app.patch('/api/lobby/:id/:message', authenticate, async (req, res) => {
//     const { id } = req.params.id;
//     const { message } = req.body;
//     try {
//         const result = await pool.query(
//             'UPDATE messages SET message = ? WHERE id = ?',
//             [message, id]
//         );
//         res.json({ message: 'message modifie', message: result });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })

// app.get('/', (req, res) =>{
//     res.send('welcome to my chat app');
// })

// app.post('/api/register', async (req, res) => {
//     console.log('Request body:', req.body);
//    const { email, password } = req.body;
//     try {
//         const hasPassword = bcrypt.hashSync(password, 5);
//         console.log(email, hasPassword);
//         const result = await  createUser(email, hasPassword);
//         res.status(201).json({ message: 'User created', result });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user', error });
//     }
// });

// const getUserByEmail = async (email) => {
//     try {
//         const result = await pool.query(
//             `SELECT * FROM user WHERE email = "${email}"`,
//         );
//         if (result.length > 0) {
//             return result[0]; // Renvoyez le premier utilisateur trouvé
//         }
//         console.log('Rows:', result);
//         return null; // Renvoyez null si aucun utilisateur n'est trouvé
//     }catch (error) {
//         console.error('Error in getUserByEmail:', error);
//         throw error;
//     }
// };

// app.post('/api/login', async (req, res) => {
//     console.log('Request body:', req.body);
//     const { email, password } = req.body;
//     const user = await getUserByEmail(email);
//     console.log(user);
//     if (!user || !bcrypt.compareSync(password, user.password)) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
// });
// app.get('/api/lobby/:lobby-id', createLobby);
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// })
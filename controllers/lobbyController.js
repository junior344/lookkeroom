 export const createLobby = async (req, res) => {
    const { name } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO lobbies (name, admin_id) VALUES (?, ?) RETURNING *',
        [name, req.user.userId]
      );
      res.status(201).json({ lobby: result.rows[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const addUserToLobby = async (req, res) => {
    const { lobbyId } = req.params;
    const { userId } = req.body;
    try {
      await pool.query(
        'INSERT INTO lobby_users (lobby_id, user_id) VALUES (?, ?)',
        [lobbyId, userId]
      );
      res.json({ message: 'User added to lobby' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export default { createLobby, addUserToLobby };
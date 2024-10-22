export const getLobbyMessages = async (req, res) => {
    const { lobbyId } = req.params;
    try {
      const result = await pool.query(
        'SELECT * FROM messages WHERE lobby_id = ?',
        [lobbyId]
      );
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const postMessage = async (req, res) => {
    const { lobbyId } = req.params;
    const { content } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO messages (lobby_id, user_id, content) VALUES (?, ?, ?) RETURNING *',
        [lobbyId, req.user.userId, content]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export default { getLobbyMessages, postMessage };
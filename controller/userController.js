const { sequelize } = require("../src/db/conn");
// const { Sequelize } = require("sequelize");


// to get all users

// app.get('/api/getusers',
const users = async (req, res) => {
    // console.log("helooooooooo");
    try {
        const rows = await sequelize.query('SELECT * FROM node_users');
        // console.log(rows[0]);
        res.send(rows[0]);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// );

// for creating a new user

//  app.post('/api/createusers',
const createUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        await sequelize.query('INSERT INTO node_users ( name, email) VALUES ($1, $2)', [name, email]);
        io.emit('usersUpdated'); // Notify all clients about the update
        res.sendStatus(201);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// );

//for deleteing user 

// app.delete('/api/users/:id',
const deleteUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        await sequelize.query('DELETE FROM node_users WHERE id = $1', [id]);
        io.emit('usersUpdated'); // Notify all clients about the update
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// );

module.exports = { users, createUser, deleteUser }

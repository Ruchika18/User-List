module.exports = function(app) {

    var users = require('./controllers/user-list.controller.js');

    // Create a new user
    app.post('/api/user', users.create);

    // Retrieve all user
    app.get('/api/user', users.findAll);

    // Update a user with Id
    app.put('/api/user/:id', users.update);

    // Delete a user with Id
    app.delete('/api/user/:id', users.delete);
}

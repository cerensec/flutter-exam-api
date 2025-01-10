const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
// Port du serveur
const PORT = 3000;

// Methode de hash des mots de passe avec bcryptjs
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

//  Simulation de la base de données avec les utilisateurs
const users = [
    {
        id: 1,
        email: 'admin@admin.com',
        password: hashPassword('administrator'),
        firstName: 'Admin',
        lastName: 'Admin',
        role: 'admin'
    },
    {
        id: 2,
        email: 'user@user.com',
        password: hashPassword('carlosceren'),
        firstName: 'Carlos',
        lastName: 'Ceren',
        role: 'user'
    }
];

// Exposition de l'API pour le logn
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Vérification presence de l'email et du mot de passe
    if(!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // Recherche de l'utilisateur dans la base de données
    const user = users.find(user => user.email === email);

    // Si utilisateur non trouvé
    if(!user) {
        return res.status(404).send('User not found');
    }

    // Vérification du mot de passe
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    // Si le mot de passe est valide
    if(isPasswordValid){
        console.log('Login successful');
        return res.status(200).send(user);
    } else {
        console.log('Invalid password');
        return res.status(401).send('Invalid password');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
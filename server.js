const express = require('express');
const app = express();

const mysql = require('mysql2');

//Express http
const connection = mysql.createConnection({
  host: '172.29.18.133',
  user: 'usersite',
  password: 'usersitemdp',
  database: 'UserSite'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

app.use(express.static('html'));
app.use(express.json());

// route + fonction callback
/*
req
res
*/
app.get('/login', (req, res) => {
    res.send('Hello express');
})

app.get('/info', (req, res) => {
    //res= inject json dans ma reponse
    res.json({ cle1: 'valeur1', cle2: 'valeur2' });
    console.log("Click");
});



app.post('/register', (req, res) => {

  connection.query(
    'INSERT INTO User (login, Password) VALUES (?, ?)',
    [req.body.loginValue,req.body.passwordValue],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      console.log('Insertion réussie, ID utilisateur :', results.insertId);
      res.json({ message: 'Inscription réussie !', userId: results.insertId });
    }
  );
});


//3000 = port écoute

app.listen(3000, () => {
    console.log('Server running on http://172.29.18.133:3000');
});
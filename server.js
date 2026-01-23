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
    'INSERT INTO User (Login, Password) VALUES (?, ?)',
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

//ECOUTER USER
app.get('/users',(req,res) => {
    connection.query('SELECT * FROM User',(err,results) => { //Renvoie deux paramettre err et resultat
        if(err){
            console.error('Erreur lors de la recup de l utilisateur : ',err);
            res.status(500).json({message : 'Erreur serveur'}); //Code 500 erreur
            return;
        }
        console.log("Récupération server ok");
        res.json(results); //Resultat en json car code en js donc plus facile a récuperer 
    });
});
//Renvoie toutes les données de la base


app.post('/votes',(req,res) => {
  console.log("la");
  connection.query('INSERT INTO Vote (idUser) VALUES (?)',
    [req.body.IdValue],
    (err,results) => {
      if(err){
        console.error('Erreur lors de l\'insertion dans la base de données :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      console.log('Insertion réussie, ID vote :', results.insertId);
      res.json({ message: 'Vote reussi !', userId: results.insertId });
    }
  );
});
//3000 = port écoute

app.listen(3000, () => {
    console.log('Server running on http://172.29.18.133:3000');
});

app.get('/avoter',(req,res) => {
  connection.query('SELECT Login, COUNT(*) as nombre FROM Vote,User WHERE User.id = Vote.idUser GROUP BY idUser ORDER BY nombre DESC',(err,results) => {
    if(err){
      console.error('Erreur lors de la récup des votes ',err);
      res.status(500).json({message : 'Erreur serveur'});
      return;
    }
      console.log("Récupération vote ok");
      res.json(results); //Resultat en json car code en js donc plus facile a récuperer 
  })
})
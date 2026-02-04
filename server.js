const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

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


function register(hash, req, res) {
  connection.query(
    'INSERT INTO Users (Login, Password) VALUES (?, ?)',
    [req.body.loginValue, hash],
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
}


app.post('/register', (req, res) => {
  console.log(req.body);
  const passwordValueHash = req.body.passwordValue;
  bcrypt.hash(req.body.passwordValue, 10, (err, hash) => {
    if (err) {
      console.log('Erreur hash ' + err);
      return;
    }
    console.log('le hash est ' + hash);
    register(hash, req, res);
  });

  //console.log('passwordValueHash : ' + passwordValueHash);

  // connection.query(
  //   'INSERT INTO Users (Login, Password) VALUES (?, ?)',
  //   [req.body.loginValue,passwordValueHash],
  //   (err, results) => {
  //     if (err) {
  //       console.error('Erreur lors de l\'insertion dans la base de données :', err);
  //       res.status(500).json({ message: 'Erreur serveur' });
  //       return;
  //     }
  //     console.log('Insertion réussie, ID utilisateur :', results.insertId);
  //     res.json({ message: 'Inscription réussie !', userId: results.insertId });
  //   }
  // );
});

// function hachage(nohash) {
//   bcrypt.hash(nohash, 10, (err, hash) => {
//     if (err) {
//       console.log('Erreur lors du hash' + err);
//       return;
//     }
//     console.log('le hash est ' + hash);
//     return hash;
//   });
// }

//ECOUTER USER
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM Users', (err, results) => { //Renvoie deux paramettre err et resultat
    if (err) {
      console.error('Erreur lors de la recup de l utilisateur : ', err);
      res.status(500).json({ message: 'Erreur serveur' }); //Code 500 erreur
      return;
    }
    console.log("Récupération server ok");
    res.json(results); //Resultat en json car code en js donc plus facile a récuperer 
  });
});


//Renvoie toutes les données de la base


app.post('/votes', (req, res) => {
  console.log(req.body);
  connection.query('INSERT INTO Vote (idUser,idElecteur) VALUES (?,?)',
    [req.body.IdValue, req.body.idElecteur],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      console.log('Insertion réussie, ID vote :', results.insertId);
      res.json({ message: 'Vote reussi !', userId: results.insertId });
    }
  );
});

function connexion(res, req, password,login) {
  
  connection.query('SELECT * FROM Users WHERE login = ? AND password = ?', [login, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification des identifiants :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ message: 'Identifiants invalides' });
      return;
    }
    // Identifiants valides 
    res.json({ message: 'Connexion réussie !', user: results[0] });
  });
}


app.post('/connexion', (req, res) => {
  console.log(req.body);
  //on recupere le login et le password
  const { login, password } = req.body; //Choix de la récup json
  bcrypt.hash(password,10, (err,hash) => {
    if(err){
      console.log('Erreur hash ' + err);
      return;
    }
    connexion(res,req,hash,login);
  });
  // //on recupere le login et le password
  // const { login, password } = req.body; //Choix de la récup json

  // connection.query('SELECT * FROM Users WHERE login = ? AND password = ?', [login, password], (err, results) => {
  //   if (err) {
  //     console.error('Erreur lors de la vérification des identifiants :', err);
  //     res.status(500).json({ message: 'Erreur serveur' });
  //     return;
  //   }
  //   if (results.length === 0) {
  //     res.status(401).json({ message: 'Identifiants invalides' });
  //     return;
  //   }
  //   // Identifiants valides 
  //   res.json({ message: 'Connexion réussie !', user: results[0] });
  // });
});

//3000 = port écoute

app.listen(3000, () => {
  console.log('Server running on http://172.29.18.133:3000');

  //TEST HASH MDP
  // const mdp = 'motdepasse';
  // const mdpHash = '$2b$10$YFevRvsTdHvo7pU8JHrNsu18Q6s1EILBKOp.FUPMPQuZsCuI0o8by';
  // console.log(mdp);
  // bcrypt.hash(mdp,10,(err,hash) => {
  //   if(err){
  //     console.log('Erreur hash ' + err);
  //     return;
  //   }
  //   console.log(hash);
  // });

  // //TEST COMPARE MDP
  // const mdpInput = 'motdepasse';
  // console.log('Mot de passe input : ' + mdpInput);
  // console.log('Mot de passe : ' + mdp);
  // bcrypt.compare(mdpInput,mdpHash,(err,result) => {
  //   if(err){
  //     console.log('Erreur compare hash ' + err);
  //     return;
  //   }

  //   if(result){
  //     console.log("Same mdp");
  //   }else{
  //     console.log("Note same mdp");
  //   }
  // })

});

app.get('/avoter', (req, res) => {
  connection.query('SELECT Login, COUNT(*) as nombre FROM Vote,Users WHERE Users.id = Vote.idUser GROUP BY idUser ORDER BY nombre DESC', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récup des votes ', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    console.log("Récupération vote ok");
    res.json(results); //Resultat en json car code en js donc plus facile a récuperer 
  })
})


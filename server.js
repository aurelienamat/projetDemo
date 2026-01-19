const express = require('express');
const app = express();

//Express http
/*

*/

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
    console.log('Données reçues pour l\'inscription');
    console.log(req.body);
    res.json( {message: 'Inscription réussie !' });
});

//3000 = port écoute

app.listen(3000, () => {
    console.log('Server running on http://172.29.18.133:3000');
});
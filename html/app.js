//const { response } = require("express");

//const { response } = require("express");

const monInput = document.getElementById('nom');
const monInputPassWord = document.getElementById('password');
const monBouton = document.getElementById('btn');

const autreBouton = document.getElementById('btn1');

const btnWho = document.getElementById('btnwho');
const usersList = document.getElementById('usersList');

const titre = document.getElementById('titre2');


var i = 1;
// Ajout d'un écouteur d'événement sur le bouton
monBouton.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loginValue: nom.value ,passwordValue: password.value})
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
    i++;
});

autreBouton.addEventListener('click', () => {
    fetch('/info').then(response => response.json()).then(repjson => {titre.innerHTML = repjson.cle1});
});

window.onload = () => { //Quand la page est charge
    fetch('/users')
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.text = user.Login;
            usersList.appendChild(option);
            const optionmdp = document.createElement('option');
            // optionmdp.value = user.id;
            // optionmdp.text = user.Password;
            // usersList.appendChild(optionmdp);
        });
    });
}
/*
btnWho.addEventListener("click", () => {
    console.log("Click vote " + usersList.value);
    fetch('/vote',{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json' //On indique qu'on envoie du JSON
        },
        body : JSON.stringify({IdValue : usersList.value})
    }).then(response => response.text())
      .then(data => {
          alert(data);
      });
});
*/

// Ajout d'un écouteur d'événement sur le bouton
btnWho.addEventListener('click', () => {
    fetch('/votes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ IdValue: usersList.value })     
    }).then(response => response.text())
      .then(data => {
          alert(data);
      });
});

//json java scrip object
//Foreach de chaque objet
//List deroulante select avec plein option
//option a value et text
//Cree option et option.contenu de lobjet
//users collection objet user pour un element de la liste
//appendchilkd pour ajouter a l'element liste

//ON manipule que les id pas le nom
// select hazck mais sont id est 14 donc on manipule 14 pas hack
const monInput = document.getElementById('nom');
const monInputPassWord = document.getElementById('password');
const monBouton = document.getElementById('btn');

const autreBouton = document.getElementById('btn1');

const btnWho = document.getElementById('btnwho');
const usersList = document.getElementById('usersList');

const titre = document.getElementById('titre2');

const tab = document.getElementById('tab');

const btnco = document.getElementById('btnco');
const btndeco = document.getElementById('btndeco');

const whoco = document.getElementById('whoconnect');

function whoIsConnect(){
    fetch('/users')
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            if(localStorage.getItem('userId') == null){
                whoco.innerHTML = 'Non connecté';
                return;
            }
            if(localStorage.getItem('userId') == user.id){
                whoco.innerHTML = 'Bonjour ' + user.Login;
                return;
            }
        });
    });
}

//Enlever les boutons
function btnControl(){
    if(localStorage.getItem('userId') == null){
        btndeco.style.visibility = 'hidden';
        btnco.style.visibility = 'visible';
        monBouton.style.visibility = 'visible';
    }else{
        btndeco.style.visibility = 'visible';
        btnco.style.visibility = 'hidden';
        monBouton.style.visibility = 'hidden';
    }
}


btndeco.addEventListener('click', ()=> {
    localStorage.removeItem('userId');
    console.log('remove');
    whoIsConnect();
    btnControl();
})

var i = 1;
// Ajout d'un écouteur d'événement sur le bouton
monBouton.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loginValue: monInput.value ,passwordValue: monInputPassWord.value})
    }).then(response => response.json())
        .then(data => {
            alert(data);
        });
    i++;
});

btnco.addEventListener('click',() => {
    console.log("connexion");
    fetch('/connexion',{
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login: monInput.value ,password: monInputPassWord.value })
    }).then(response => response.json())
        .then(data => {
            console.log(data.user.id);
            localStorage.setItem('userId', data.user.id);
            console.log(localStorage.getItem('userId'));
            whoIsConnect();
            btnControl();
        });
});

autreBouton.addEventListener('click', () => {
    fetch('/info').then(response => response.json()).then(repjson => {titre.innerHTML = repjson.cle1});
});

window.onload = () => { //Quand la page est charge
    console.log(localStorage.getItem('userId'));
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
            whoIsConnect();
            btnControl();
        });
    });
    majvoter();
    
}

function cleartbody(){
    console.log("Clear");
    const tbody = document.getElementById('idtbody');
    tbody.remove();
}

function majvoter(){
    //Recupereation pour mettre dans table
    fetch('/avoter')
    .then(response => response.json())
    .then(idUsers => {
        const body = document.createElement('tbody');
        body.id = 'idtbody';
        tab.appendChild(body);
        idUsers.forEach(idUser => {
            const tr = document.createElement('tr');
            body.appendChild(tr)
            const td = document.createElement('td');
            td.innerHTML = idUser.Login;
            tr.appendChild(td);
            const td1 = document.createElement('td');
            td1.innerHTML = idUser.nombre;
            tr.appendChild(td1);
        })
    })
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
    const userId = localStorage.getItem('userId');
    if(userId == null){
        console.log("Personne est co");
        return;
    }
    fetch('/votes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ IdValue: usersList.value , idElecteur : userId})     
    }).then(response => response.json())
    cleartbody();
    majvoter();
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

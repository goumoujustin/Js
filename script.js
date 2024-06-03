var selectRow = null;

//affichage alerte
function affichageAlerte(message, nomClass){
    const div = document.createElement("div");
    div.nomClass = 'alert alert-$(nomClass)';

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Actualiser tout

function  toutEffacer(){
    document.querySelector("#prenom").value = "";
    document.querySelector("#nom").value = "";
    document.querySelector("#rollNo").value = "";
}

//Ajout de données

document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    //Prendre pour valeurs
    const prenom = document.querySelector("#prenom").value;
    const nom = document.querySelector("#nom").value;
    const  rollNo= document.querySelector("#rollNo").value;

    //validation
    if(prenom == "" || nom == "" || rollNo == ""){
        affichageAlerte("Veuillez remplir tous les champs","danger"); 
    }
    else{
        if(selectRow == null){
            const list = document.querySelector("#liste-etudiant");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${prenom}</td>
                <td>${nom}</td>
                <td>${rollNo}</td>
                <td> 
                <a href="#" class="btn btn-warning btn-sm edit">Modifier</a>
                <a href="#" class="btn btn-danger btn-sm delete">Supprimer</a>
            `;
            list.appendChild(row);
            selectRow = null;
            affichageAlerte("Etudiant ajoute", "succes");
               
        }
        else{
            selectRow.children[0].textContent = prenom;
            selectRow.children[1].textContent = nom;
            selectRow.children[2].textContent = rollNo;
            selectRow = null;
            affichageAlerte("Infos de etudiant modifiée");
        }

        toutEffacer();

    }
    
});

//Modification de données

document.querySelector("#liste-etudiant").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectRow = target.parentElement.parentElement;
        document.querySelector("#prenom").value = selectRow.children[0].textContent;
        document.querySelector("#nom").value = selectRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectRow.children[2].textContent;
    }
})


//Suppression de données
document.querySelector("#liste-etudiant").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        affichageAlerte("Suppression des données de l'etudiant","danger");
    }
});

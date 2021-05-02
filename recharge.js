// JS gestion Borne de rechearge électrique
var villeSaisie = document.querySelector('#valeurVil');
var nBoutonRech = document.querySelector('#Boutonrech');
var tableaub = document.querySelector('tbody');
var monTableau = document.querySelector('#tableau');
var nTbl = document.querySelector('.Tbl')

var macarte = null;
var lat = 48.852969;
var lon = 2.349903;
let marker;
let dejafait = false;


window.onload = function () {
    // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
    initMap();
};


nBoutonRech.addEventListener("click", afficheRecharge);


// Contruction de l'entête du tableau

nTbl.createCaption;
nTbl.style.border = "thick solid #0000FF";
nTbl.style.borderRadius = "10px";
nTbl.style.textAlign = "center";
nTbl.innerHTML = "<b>Emplacement de bornes de recharge pour voiture électrique";


mthead = document.createElement('thead');

let lignetbody = mthead.insertRow(-1);
let colonnee = lignetbody.insertCell(0);
colonnee.innerHTML += 'Enseigne';
let colonneo = lignetbody.insertCell(1);
colonneo.innerHTML += 'Opérateur';
let colonnet = lignetbody.insertCell(2);
colonnet.innerHTML += 'Type de prise';
let colonnes = lignetbody.insertCell(3);
colonnes.innerHTML += 'Station';
let colonnen = lignetbody.insertCell(4);
colonnen.innerHTML += 'Nombre de prise';
let colonnep = lignetbody.insertCell(5);
colonnep.innerHTML += 'Puissance Max';
let colonnea = lignetbody.insertCell(6);
colonnea.innerHTML += 'Accessibilité';
let colonnec = lignetbody.insertCell(7);
colonnec.innerHTML += 'Conditions accès';
let colonnead = lignetbody.insertCell(8);
colonnead.innerHTML += 'Adresse';
let colonneco = lignetbody.insertCell(9);
colonneco.innerHTML += 'Coordonnées GPS';

monTableau.appendChild(mthead);


function afficheRecharge() {
    if (dejafait == true)
    {
        tableaub.remove();
    }
    dejafait = true;

    var vilsai = villeSaisie.value;
    var url = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=fichier-consolide-des-bornes-de-recharge-pour-vehicules-electriques-irve%40public&" +
        "q=" + vilsai + "&facet=n_enseigne&facet=nbre_pdc&facet=puiss_max&facet=accessibilite&facet=nom_epci&facet=commune&facet=nom_reg&facet=nom_dep"

//    enlever   &rows=30
    tableaub = document.createElement('tbody');
// Lecture des données 


    fetch(url).then(function (response) {
        response.text().then(function (recharge) {

            var objrecharge = JSON.parse(recharge)
            let nb = objrecharge.records.length;
            for (var i = 0 ; i < nb ; i++)
            {
                // construction des lignes du tableau tableau.

                let lignetbody = tableaub.insertRow(-1);
                let colonneetxt = lignetbody.insertCell(0);
                colonneetxt.innerHTML += objrecharge.records[i].fields.n_enseigne;
                let colonneotxt = lignetbody.insertCell(1);
                colonneotxt.innerHTML += objrecharge.records[i].fields.n_operateur;
                let colonnettxt = lignetbody.insertCell(2);
                colonnettxt.innerHTML += objrecharge.records[i].fields.type_prise;
                let colonnestxt = lignetbody.insertCell(3);
                colonnestxt.innerHTML += objrecharge.records[i].fields.n_station;
                let colonnentxt = lignetbody.insertCell(4);
                colonnentxt.innerHTML += objrecharge.records[i].fields.nbre_pdc;
                let colonneptxt = lignetbody.insertCell(5);
                colonneptxt.innerHTML += objrecharge.records[i].fields.puiss_max;
                let colonneatxt = lignetbody.insertCell(6);
                colonneatxt.innerHTML += objrecharge.records[i].fields.accessibilite;
                let colonnectxt = lignetbody.insertCell(7);
                colonnectxt.innerHTML += objrecharge.records[i].fields.acces_recharge;
                let colonneadtxt = lignetbody.insertCell(8);
                colonneadtxt.innerHTML += objrecharge.records[i].fields.ad_station;
                let colonnecotxt = lignetbody.insertCell(9);
                colonnecotxt.innerHTML += objrecharge.records[i].fields.coordonnees[0].toString() + "/" +objrecharge.records[i].fields.coordonnees[1].toString();

                monTableau.appendChild(tableaub);
                marker = L.marker([objrecharge.records[i].fields.coordonnees[0], objrecharge.records[i].fields.coordonnees[1]]).addTo(macarte)
                    .bindPopup(objrecharge.records[i].fields.n_enseigne.toString() +'<br>'
                        +objrecharge.records[i].fields.ad_station.toString() +'<br>'
                        +objrecharge.records[i].fields.type_prise.toString() +'<br>'
                        +objrecharge.records[i].fields.puiss_max.toString() +'<br>'
                        +objrecharge.records[i].fields.accessibilite.toString() +'<br>'
                        +objrecharge.records[i].fields.acces_recharge.toString() +'<br>'
                        +objrecharge.records[i].fields.coordonnees[0].toString() + "/" +objrecharge.records[i].fields.coordonnees[1].toString()
                    );
                macarte.setView(marker.getLatLng(), 10);
            }
        }).catch(error => alert("Erreur : " + error));
    }).catch(error => alert("Erreur : " + error));

}


function initMap() {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([lat, lon], 11);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);

    let majolicarte = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    });

    let stamenToner = L.tileLayer('//{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 1,
        label: 'Toner'
    });

    let stamenColor = L.tileLayer('//{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: 'abcd',
        maxZoom: 16,
        minZoom: 1,
        label: 'Watercolor'
    });
L.control.b
    macarte.addControl(L.control.basemaps({
        basemaps: [majolicarte, stamenColor, stamenToner],
        tileX: 0,  // Coordonnée X de la prévisualisation
        tileY: 0,  // Coordonnée Y de la prévisualisation
        tileZ: 1   // Niveau de zoom de la prévisualisation
    }));

}
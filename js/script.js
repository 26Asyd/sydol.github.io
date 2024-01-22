//Barre de menu 

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}


//Carte leaflet 

var map = L.map('map').setView([46.603354, 1.888334], 6); // Coordonnées centrées sur la France

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributor'
})

osm.addTo(map);

if (!navigator.geolocation) {
  console.log("Votre ordinateur ne permet pas de vous geolocaliser")
} else {
  navigator.geolocation.getCurrentPosition(getPosition)
}

function getPosition(position) {
  console.log(position)
  var lat = position.coords.latitude
  var long = position.coords.longitude
  var accuracy = position.coords.accuracy
  var marker = L.marker([lat, long]).addTo(map)
  var circle = L.circle([lat, long], { radius: accuracy }).addTo(map)
  console.log(lat, long, accuracy)
}



//affichage textes publications 

function toggleDiv(divId, btn) {
  var div = document.getElementById(divId);
  var btn = document.getElementById(btn);
  if (div.style.display === 'none') {
    div.style.display = 'block';
    btn.innerHTML = 'Voir moins'
  } else {
    div.style.display = 'none';
    btn.innerHTML = 'Voir plus'
  }
}



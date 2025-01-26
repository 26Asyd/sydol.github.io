/////// Données Regions
var regionsSource = new ol.format.GeoJSON().readFeatures(regions, {
  featureProjection: "EPSG:3857"
});

regionsSource = new ol.source.Vector({
  // la liste des features
  features: regionsSource
});

// Définir le tableau des classes avec leurs limites inférieure et supérieure
const classes = [
  {
    class: 'Classe 1',
    borneInferieur: 0,
    borneSuperieur: 3000000
  },
  {
    class: 'Classe 2',
    borneInferieur: 3000001,
    borneSuperieur: 6000000
  },
  {
    class: 'Classe 3',
    borneInferieur: 6000001,
    borneSuperieur: 9000000
  },
  {
    class: 'Classe 4',
    borneInferieur: 9000001,
    borneSuperieur: Infinity
  }
];

const regionsLayer = new ol.layer.Vector({
  id: "region",
  source: regionsSource,
  style: function (feature) {
    return styleFunction(feature, 'population', classes); // Remplacer 'value_property' par le nom de la propriété utilisée
  }
});

var regionsCheckBox = document.getElementById("regions-france");
regionsCheckBox.addEventListener("click", function (event) {
  regionsLayer.setVisible(event.target.checked);
});

const centerRegions = ol.extent.getCenter(regionsSource.getExtent())

////////////////////////// Villes Chef-Lieu /////////////////////////////////////////////////////
// Tableau de données
const villesData = [
  ["Lyon", "Auvergne-Rhône-Alpes", 45.763420, 4.834277],
  ["Dijon", "Bourgogne-Franche-Comté", 47.316666, 5.016667],
  ["Rennes", "Bretagne", 48.114700, -1.679400],
  ["Orléans", "Centre-Val de Loire", 47.902500, 1.909000],
  ["Ajaccio", "Corse", 41.926701, 8.736900],
  ["Strasbourg", "Grand Est", 48.580002, 7.750000],
  ["Lille", "Hauts-de-France", 50.629250, 3.057256],
  ["Paris", "Île-de-France", 48.8537648, 2.352356],
  ["Rouen", "Normandie", 49.439999, 1.100000],
  ["Bordeaux", "Nouvelle-Aquitaine", 44.836151, -0.580816],
  ["Toulouse", "Occitanie", 43.604500, 1.444000],
  ["Nantes", "Pays de la Loire", 47.218102, -1.552800],
  ["Marseille", "Provence-Alpes-Côte d'Azur", 43.296398, 5.370000]
];

// Transformer le tableau de données en une liste d'objets ChefLieu
const villes = villesData.map(([nom, region, lat, lon]) => new ChefLieu(nom, region, lat, lon));

// Afficher la description de chaque chef-lieu
villes.forEach(ville => console.log(ville.getDescription()));

var cheflieuFeatures = [];
for (var cheflieu of villes) {
  var lon = cheflieu.lon;
  var lat = cheflieu.lat;
  var coords = [lon, lat];
  var projectedCoords = ol.proj.fromLonLat(coords);
  // Objet de type ol.Feature instancié avec une géométrie, un nom...
  var feature = new ol.Feature({
    geometry: new ol.geom.Point(projectedCoords),
    nom: cheflieu.nom,
    region: cheflieu.region,
    details: cheflieu.getDescription()
  });
  // ajouter le style
  feature.setStyle(iconStyle);
  // ajouter à la liste des features
  cheflieuFeatures.push(feature);
}

var cheflieuLayerSource = new ol.source.Vector({
  // la liste des features
  features: cheflieuFeatures,
  name: "cities-source"
});

// la couche de type vecteur (à partir de la source des données)
var cheflieuLayer = new ol.layer.Vector({
  // la source des données de type vecteur
  source: cheflieuLayerSource,
  id: "chefLieu"
});

// couche invisible au démarrage
cheflieuLayer.setVisible(false);


var chefLieuCheckBox = document.getElementById("chef-lieux");
chefLieuCheckBox.addEventListener("click", function (event) {
  cheflieuLayer.setVisible(event.target.checked);
});


///////////////////////////////////////////////////////////////////////////////
////// Carthographie 
const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    regionsLayer,
    cheflieuLayer
  ],

  target: 'map',
  view: new ol.View({
    center: ol.proj.fromLonLat([2.3499, 48.8530]),
    zoom: 6
  }),
  controls: ol.control.defaults().extend([
    new ol.control.ScaleLine()
  ]),
});




///////////////////////////////////////////////////////////////////////////////

// ==========================================================================

/**
 * Créer la popup ===========================================================
 */
var popup = new ol.Overlay({
  // l'element HTML de la popup
  element: document.getElementById("map-popup"),
  positioning: "bottom-center",
  offset: [0, -1]
});
map.addOverlay(popup);

// la Fonction pour fermer la popup (voir index.html)
function closePopup() {
  popup.setPosition(undefined);
}

// Ajouter l'événement clic à la carte
map.on("click", function (event) {
  // Fermer la popup existante
  closePopup();

  // Chercher la feature sous le pixel cliqué
  map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
    // Si une feature est trouvée
    if (feature) {
      if (layer) {
        var layerId = layer.get("id");
        if (layerId === "chefLieu") {
          // Récupérer les coordonnées (position) de la feature
          var coordinates = feature.getGeometry().getCoordinates();
          // Modifier la position de la popup
          popup.setPosition(coordinates);

          // Récupérer le nom de la ville depuis la feature
          var cityName = feature.get("nom");

          // Modifier le contenu de la popup
          document.getElementById("map-popup-content").innerHTML = "<p>" + feature.get("nom") + " est le chef-lieu de la région " + feature.get("region") + ". </p>";
        }
      }
    }
  });
});

map.on("singleclick", (event) => {
  const feature = map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
    var layerId = layer.get("id");
    if (layerId === "region") {
      console.log()
      return feature;
    }
    console.log(layerId)
  });
  if (feature instanceof ol.Feature) {
    map.getView().setCenter(ol.extent.getCenter(feature.getGeometry().getExtent()));
    map.getView().setZoom(8);
  }
});


// ==========================================================================

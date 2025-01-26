/////////////////////////////////////////////////////////////////////////////////////////////:

// Fonction pour générer une couleur aléatoire
function getRandomColor() {
  const hexArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += hexArray[Math.floor(Math.random() * 16)];
  }
  return `#${code}`;
}

// Fonction pour associer des couleurs aléatoires aux classes
function assignColorsToClasses(classes) {
  for (let i = 0; i < classes.length; i++) {
    classes[i]['color'] = getRandomColor();
  }
}


// Fonction de style pour les caractéristiques
function styleFunction(feature, property, classes) {
  // Associer des couleurs aux classes si ce n'est pas déjà fait
  if (!classes[0].color) {
    assignColorsToClasses(classes);
  }

  // Fonction pour obtenir la classe en fonction de la valeur
  function getClass(value) {
    for (let i = 0; i < classes.length; i++) {
      if (value >= classes[i].borneInferieur && value <= classes[i].borneSuperieur) {
        return classes[i];
      }
    }
    return null; // Si aucune classe ne correspond
  }

  const value = feature.get(property);
  const cls = getClass(value);

  // Sélectionner ou créer le conteneur de la légende
    legendContainer = document.createElement('div');
    legendContainer.id = 'legend-container';
    legendContainer.className = 'card bg-light p-2'; // Utilisation des classes Bootstrap
    legendContainer.style.position = 'absolute';
    legendContainer.style.top = '500px';
    legendContainer.style.right = '1350px';
    legendContainer.style.zIndex = '100';
    document.body.appendChild(legendContainer);
  
  // Vider le contenu existant
  legendContainer.innerHTML = '';

  // Créer les éléments de la légende
  classes.forEach(cls => {
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';

    const colorBox = document.createElement('div');
    colorBox.className = 'legend-color';
    colorBox.style.backgroundColor = cls.color;

    const label = document.createElement('span');
    label.textContent = `${cls.borneInferieur} - ${cls.borneSuperieur}`;

    legendItem.appendChild(colorBox);
    legendItem.appendChild(label);
    legendContainer.appendChild(legendItem);
  });

  // Retourner le style en fonction de la classe correspondante
  if (cls) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: cls.color
      }),
      stroke: new ol.style.Stroke({
        color: '#000000',
        width: 1
      })
    });
  } else {
    // Style par défaut si aucune classe ne correspond
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: '#FFFFFF'
      }),
      stroke: new ol.style.Stroke({
        color: '#000000',
        width: 1
      })
    });
  }
}
///////////////////////////////////////////////////////////////////////////////

class ChefLieu {
  constructor(nom, region, lat, lon) {
    this.nom = nom;
    this.region = region;
    this.lat = lat;
    this.lon = lon;
  }

  getDescription() {
    return `${this.nom} est le chef-lieu de la région ${this.region}. Coordonnées géographiques : ${this.lat}, ${this.lon}`;
  }
}

///////////////////////////////////////////////////////////////////////////////

var iconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 1],
    width: 1,
    height: 1,
    scale: 0.05,
    src: "img/capitale.png"
  })
});



# **Langages Web 3 ( JavaScript avancé )** 🌐

## **Projet final**

### Présentation

L’objectif de ce projet est de créer **une carte des régions de France (métropole)** avec les couches suivantes :

- Une couche de type raster : **un fond de carte Openstreetmaps**
- Une couche de polygones : **Les régions de France**
- Une couche de points : **Les chef-lieux de région**

Le répertoire du projet est composé de :

- Le fichier **index.html** : le code HTML du projet
- Un dossier **/data** : contient un fichier de données

  - **regions.js** : le geojson des régions de France **(NE PAS MODIFIER)**

- Le dossier **/js** :

  - **app.js** : contient la déclaration d'une variable de données geojson

Le projet est basé sur les frameworks :

- Openlayers v6.5.0
- Bootstrap v 4.6.0

Les propriétés des objets geojson :

- **regions** :

  - code : le code de la région
  - nom
  - population

### Création de la carte

1. Créer une carte openlayers dans l'élément html _#map_ avec les options suivantes:
   - Le fond de carte OpenStreetMaps
   - Une vue centrée sur la France (Métropole)
   - Un contrôleur de carte: l'échelle linéaire

### Première couche : Les régions de France

1. Transformer l'objet geojson **regions** _( voir app.js )_ à une couche de type vecteur avec le style suivant :

   - Bordure :
     - largeur : **1** ( pixel )
     - couleur : **#6b6b6b**
   - Remplissage :
     - opacité : **0.7**
     - couleur : Utilisez la propriété **population** pour définir la couleur du style en fonction de la classification indiquée dans le tableau ci-dessous. (Après la transformation de l'objet geojson **regions** à une liste de features. Chaque **feature** possèdera la propriété **population**).

      | Classes               | Limite inférieure | Limite supérieure |
      |-----------------------|-------------------|-------------------|
      | Classe 1              | 0                 | 3.000.000         |
      | Classe 2              | 3.000.001         | 6.000.000         |
      | Classe 3              | 6.000.001         | 9.000.000         |
      | Classe 4              | supérieur à 9.000.000 |


> **_NOTE :_** Vous êtes libre de choisir les couleurs pour chaque classe selon votre préférence.

2. Ajouter la couche des régions à la carte et lier sa visibilité à la checkbox **_Régions_**.

### Troisième couche : Les chef-lieux

1. Créer la classe **ChefLieu** avec les propriétés et les méthodes suivantes:

   - **Les propriétés**

     - **nom:** Le nom de la ville
     - **region:** Le nom de la région
     - **lon:** La longitude
     - **lat:** La latitude

   - **Les méthodes**
     - **getDescription:** retourne une description du chef lieu _( une chaîne de caractères )_

2. Transformer le tableau suivant à une liste d'objets de type **ChefLieu**.

   | Ville      | Region                     | Latitude   | Longitude |
   | ---------- | -------------------------- | ---------- | --------- |
   | Lyon       | Auvergne-Rhône-Alpes       | 45.763420  | 4.834277  |
   | Dijon      | Bourgogne-Franche-Comté    | 47.316666  | 5.016667  |
   | Rennes     | Bretagne                   | 48.114700  | -1.679400 |
   | Orléans    | Centre-Val de Loire        | 47.902500  | 1.909000  |
   | Ajaccio    | Corse                      | 41.926701  | 8.736900  |
   | Strasbourg | Grand Est                  | 48.580002  | 7.750000  |
   | Lille      | Hauts-de-France            | 50.629250  | 3.057256  |
   | Paris      | Île-de-France              | 48.8537648 | 2.352356  |
   | Rouen      | Normandie                  | 49.439999  | 1.100000  |
   | Bordeaux   | Nouvelle-Aquitaine         | 44.836151  | -0.580816 |
   | Toulouse   | Occitanie                  | 43.604500  | 1.444000  |
   | Nantes     | Pays de la Loire           | 47.218102  | -1.552800 |
   | Marseille  | Provence-Alpes-Côte d'Azur | 43.296398  | 5.370000  |

3. Transformer **la liste des objets de type ChefLieu** à une **couche de type vecteur**.

4. Ajouter **la couche des chef-lieux** à la carte et lier sa visibilité à la checkbox **_Chef-lieux_**.

## Limitations

- A peu près 20 colonnes max (illisibles après sur nos écrans).
- Pas de données catégorielles.

## Couleurs

- Par défaut, c’est monochrome bleu sur le 1er axe.
- Pour changer la palette de couleur, cliquer sur le nom de l’axe pour changer la palette de couleur (au passage de la souris le nom de l’axe doit passer en gras).

- La couleur de fond et les couleurs des écritures vont changer pour s’adapter à la nouvelle palette. Si vous voulez intégrer des palettes d3 (<https://github.com/d3/d3-scale-chromatic>), il n’y a aucun problème.
- Cette version tourne avec 6 palettes, on retombe sur la palette monochrome bleue après avoir fait le tour des palettes disponibles.
- Si ce n’est pas la monochrome, la palette s’affiche sur le côté de l’axe sur 5 pixels à gauche de l’axe.

## Histogramme

- Lorsque rien n’est sélectionné, les histogrammes de l’ensemble des traces sont visibles. Les histogrammes sont normalisés par rapport à 70% de l’espace entre 2 dimensions.
- Lorsque plus de 10% des traces sont sélectionnées, on affiche les deux histogrammes à la même échelle.
- Lorsque moins de 10% des traces sont sélectionnées, on n’affiche que l’histogramme des traces sélectionnées.

## Ligne de base

Cliquer sur une trace la définie comme ligne de base et l’ensemble des axes est ajusté pour que cette ligne soit horizontale.

## Fluidité/Performance

Après divers tests, le moteur SVG de FireFox est plus performant avec cette version. Investigation en cours pour augmenter les performances. Les limites de fluidité ont été atteintes :
- sur FireFox environ 6000 lignes ;
- sur Chrome environ 4000 lignes.

## Autre

Le nom de l’axe d’une dimension qui contient une brush (boite de sélection) est souligné.

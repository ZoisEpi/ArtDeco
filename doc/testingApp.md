

# Instructions pour tester les développements

- installer [R-3.5.1](https://cran.r-project.org/bin/windows/base/old/3.5.1/) ;
- installer [RStudio Desktop](https://rstudio.com/products/rstudio/download/) ;
- installer `Shiny` (dans `RStudio`, exécuter la commande `install.packages('shiny')`) ;
- dézipper le fichier `ShinyParallelPlot.zip` ;
- installer `parallePlot` (dans `RStudio`, exécuter les commandes `setwd("where/is/unzipped/file/htmlwidget")` puis `devtools::install()`) ;
- ouvrir le fichier `ParallelPlotTest.R` dans RStudio (menu "File/Open File") ;
- lancer l'exécution de `ParallelPlotTest.R` (dans l'onglet montrant le code de `ParallelPlotTest.R`, cliquer le bouton `Run App` qui se trouve dans la barre d'outils en haut à droite) ;
- dans l'application qui doit s'être ouverte, cliquer le bouton `Generate Sampling & Build Parallel Plot` pour faire apparaitre la visualisation en coordonnées parallèles.

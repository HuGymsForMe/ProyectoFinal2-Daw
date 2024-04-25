#!/bin/bash

#Este fichero se ejecutará de forma diaria.

$directory="/....../server"

#Ejecutamos el comando que checkea nuestros test unitarios y guardamos la salida en una variable
output=$(cd "$directory" | npm test)

#Recogemos la fecha actual
DAY_NUM=$(date +%d)
MONTH_NUM=$(date +%m)
YEAR_NUM=$(date +%y)

#Pasamos la salida del comando anterior a un fichero de texto que generaremos diariamente
echo "$output" > log/tracking-"[$DAY_NUM-$MONTH_NUM-$YEAR_NUM]".log

#Autocommit del nuevo fichero en github
# git add log
# git commit -m "Actualización de los test unitarios"
# git push -u origin master

#Ejecutamos el fichero de tracking.sh para borrar los ficheros antiguos (no olvidar de darle permisos)
./tracking.sh

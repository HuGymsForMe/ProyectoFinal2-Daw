#!/bin/bash
#-------------------------------------------GENERAMOS EL FICHERO CON LOS TEST UNITARIOS------------------------------------------------#
clear
#Este fichero se ejecutará de forma diaria.

directory="/....../server"

#Ejecutamos el comando que checkea nuestros test unitarios y guardamos la salida en una variable
cd "$directory" || exit
output=$(npm test)

#Recogemos la fecha actual
DAY_NUM=$(date +%d)
MONTH_NUM=$(date +%m)
YEAR_NUM=$(date +%y)

#Pasamos la salida del comando anterior a un fichero de texto que generaremos diariamente
echo "$output" > log/tracking-"[$DAY_NUM-$MONTH_NUM-$YEAR_NUM]".log # Estructura de los archivos tracking-[DD-MM-YYYY]

#Autocommit del nuevo fichero en github
git add log
git commit -m "Actualización del seguimiento de los test unitarios"
git push -u origin master

#-------------------------------------------ELIMINAMOS LOS FICHEROS ANTIGUOS------------------------------------------------#

# Directorio en el que se encontrarán los archivos de seguimiento
directory_log="$directory/src/log"

# Máximo de ficheros (seguimiento semanal)
max_number_files=7

# Número de ficheros en el sistema actualmente con dicho regex
number_files=$(ls -l "$directory"/tracking* 2>/dev/null | wc -l)

# En caso de haber más de 7 ficheros en el sistema vamos borrando los más antiguos
if [ "$number_files" -gt "$max_number_files" ]; then
    files_to_delete=$((number_files - max_number_files)) # Archivos a eliminar

    for ((i=1; i<=files_to_delete; i++))
    do
        # Encuentra el archivo más antiguo del sistema
        most_old_file=$(ls -t "$directory"/tracking* | tail -n 1)
        rm "$most_old_file"
    done
fi

#!/bin/bash

#Estructura de los archivos tracking-[DD-MM-YYYY]

#Directorio en el que se encontrará la carpeta que contiene los archivos de seguimiento
directory="" #Ya lo escribiré

#Máximo de ficheros (seguimiento semanal)
max_number_files=7;

#Número de ficheros en el sistema actualmente con dicho regex
number_files=$(ls -l "directory"/"tracking*" 2>/dev/null | wc -l)

#En caso de haber más de 7 ficheros en el sistema vamos borrando los más antiguos
if ["$number_files" -gt 7] then
    files_to_delete=$(number_files - 7) #Archivos a eliminar

    for ((i=1; i<="$files_to_delete";i++))
    do
        #Encuentra el archivo más antiguo del sistema
        most_old_file=$(ls -t "directory"/"tracking*" | tail -n 1)
        rm "$most_old_file"
    done
fi
# ProgrammingLanguagesLab2
 Lab2

Запустить сервер:  
### npm run server

# Описание API

## Получить список файлов папки
	GET-запрос: http://localhost:5000/myFiles?path=${path}
	url: /myFiles
	params:
	  path - путь до папки
	output
	{
		data: 
			files:[{allFiles}]
		status: 200
	}

## Скачать файл
	GET-запрос: http://localhost:5000/downloadFile?path=${path}
	url: /downloadFile
	params:
	  path - путь до файла

const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app=express();

app.use(express.static(__dirname + '/files'));
app.use(cors());

app.get(
    '/myFiles',
    (request, response) => {
        try {
            const myPath = request.query.path;
            const folderPath = `./files/${myPath}`;
            const allFiles = fs.readdirSync(folderPath).map(
                (mass) => {
                    const pth = `${myPath}/${mass}`;
                    return {mass, pth}
                }
            )
            response.status(200).json({allFiles});
        }
        catch (error){
            console.log(error);
            response.status(500).json({message: 'error'});
        }
    }
)

app.get(
    '/downloadFile',
    (request, response) => {
        try {
            const myPath = request.query.path;
            const folderPath = `./files/${myPath}`;

            if (fs.existsSync(folderPath)) {
                return response.download(folderPath);
            }
            return response.status(400).json({ message: 'error'})
        } 
        catch (error) {
            console.log(error);
            response.status(500).json({ message: 'error'})
        }
})

app.listen(5000, () => console.log('App has been started...'))

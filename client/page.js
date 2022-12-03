const requestURL ='http://localhost:5000/myFiles?path=';
const requestURLDownload ='http://localhost:5000/downloadFile?path=';

const sendRequest = (method, url, type) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.responseType = type;
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        }

        xhr.onerror = () => {
            reject(xhr.response);
        }

        xhr.send();
    })
}

sendRequest('GET', requestURL + '', 'json')
    .then(data => {
        console.log(data.allFiles);
        getFiles(data);
    })
    .catch(err => console.log(err))

const getFiles = (data) => {
    const filesMass = data.allFiles;

    if (filesMass == '') 
        document.getElementById(`package`).innerHTML += "<div>" + 'Пустая папка' + "</div>";
    
    filesMass.forEach((element) => {
        let type, btnText;
        
        if (element.pth.split(".")[1]) {
            type = 'file';
            btnText = 'Download';     
        } else {
            type = 'package';    
            btnText = 'Open';         
        }  

        document.getElementById(`${type}`).innerHTML += `<img src = "${type}.png" width = 70 height = 70 alt = "" />`;
        document.getElementById(`${type}`).innerHTML += "<div>" + element.mass+"</div>";
        document.getElementById(`${type}`).innerHTML += `<button class = 'btn ${element.pth}' id = ${(btnText =='Download') ? 'btn1' : 'btn2'}>` + `${btnText}` + "</button>";
        document.getElementById(`${type}`).innerHTML += "<div>" + "</div>";
    })
    const button = document.querySelectorAll(".btn");
    button.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (e.target.getAttribute('id') == 'btn1') {
                const path = e.target.getAttribute('class').split(" ")[1].slice(1);
                sendRequest('GET', requestURLDownload + path, 'blob')
                .then(data => {
                    const blob = data;
                    const URLdownload = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = URLdownload;
                    link.download = path.split("/").slice(-1);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                })
                .catch(err => console.log(err))
            } else {
                const path = e.target.getAttribute('class').split(" ")[1];
                sendRequest('GET', requestURL + path, 'json')
                .then(data => {
                    console.log(data.allFiles);
                    updateContent(data);
                })
                .catch(err => console.log(err))
            }
        })
    })
}

const updateContent = (data) => {
    element1 = document.getElementById("file");
    element2 = document.getElementById("package");
    if (element1 || element2) {
        element1.innerHTML = ' ';
        element2.innerHTML = ' ';
    }
    getFiles(data);
}
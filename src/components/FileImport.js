import React from "react";
import yaml from 'js-yaml';

let handleFiles = (updateData) => {
    let selectedFile = document.getElementById("files").files[0];
    let name = selectedFile.name;
    let size = selectedFile.size;
    console.log("Name: "+name+"Size: "+size);

    let reader = new FileReader();
    reader.readAsText(selectedFile);

    reader.onload = (event) => {
        console.log(event.target.result);
        let fileData = yaml.safeLoadAll(event.target.result, 'utf8');
        console.log(fileData);
        updateData(fileData[0]);
    }
}

let FileImport = ({updateData}) => {
    return (
        <div>
            <input type="file" id="files" onChange={() => handleFiles(updateData)} />
        </div>
    )
}

export default FileImport;


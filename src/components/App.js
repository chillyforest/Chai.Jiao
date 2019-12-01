import React, { Component } from "react";
import yaml from 'js-yaml';
import { saveAs } from 'file-saver';

import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleFiles = this.handleFiles.bind(this);
        this.exportFiles = this.exportFiles.bind(this);
        this.data = null;
    }

    handleFiles() {
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
            this.data = fileData;
        }
    }

    exportFiles() {
        if (this.data && Array.isArray(this.data)) {
            let content = yaml.safeDump(this.data[0]);
            let blob = new Blob([content], {type: "text/plain; charset=utf-8"});
            console.log(blob);
            saveAs(blob, "file.yaml");
        }
    }

    render() {
        return (
            <div>
                <h1>笔画数据校对</h1>
                <div>
                    <input type="file" id="files" onChange={this.handleFiles} />
                </div>
                <div>
                    <input type="button" id="export" value="导出" onClick={this.exportFiles} />
                </div>
            </div>
        );
    }
}

export default App;
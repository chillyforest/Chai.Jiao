import React, { Component } from "react";
import yaml from 'js-yaml';
import { saveAs } from 'file-saver';
import FileImport from './FileImport';
import FileExport from './FileExport';
import Panel from './Panel';

import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleFiles = this.handleFiles.bind(this);
        this.exportFiles = this.exportFiles.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateKey = this.updateKey.bind(this);
        this.state = {
            data: [],
            selectedKey: null
        }
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

    updateData(newData) {
        this.setState({ data: newData });
    }

    updateKey(newKey) {
        this.setState({ selectedKey: newKey });
    }

    render() {
        return (
            <div>
                <h1>笔画数据校对</h1>
                <FileImport updateData={this.updateData} />
                <Panel data={this.state.data} updateKey={this.updateKey} />                
                <FileExport data={this.state.data} />
                <div onClick={() => {console.log(this.state.selectedKey)}}>check imported</div>
            </div>
        );
    }
}

export default App;
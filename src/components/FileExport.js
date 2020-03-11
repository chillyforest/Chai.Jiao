import React from "react";
import yaml from 'js-yaml';
import { saveAs } from 'file-saver';

let handleFiles = (data) => {
    if (data && Array.isArray(data)) {
        let content = yaml.safeDump(data[0]);
        let blob = new Blob([content], {type: "text/plain; charset=utf-8"});
        console.log(blob);
        saveAs(blob, "file.yaml");
    }
}

let FileExport = ({data}) => {
    return (
        <div>
            <input type="button" id="export" value="导出" onClick={() => handleFiles(data)} />
        </div>
    )
}

export default FileExport;
import React from 'react';

import '../styles/App.css';

let changeHandler = (updateKey) => {
    let e = document.getElementById("character");
    let value = e.options[e.selectedIndex].value;
    updateKey(value);
}

let Panel = ({data, updateKey}) => {
    let dataArr = Object.entries(data);
    return (
        <div>
            <div id="char-container">
                <select id="character" size="20" onChange={() => changeHandler(updateKey)}>
                    {
                        dataArr && dataArr.length && dataArr.map(item => {
                            return <option key={item[0]} value={item[0]}>{item[0]}</option>
                        })
                    }
                </select>
            </div>
            <div id="edit-window">
                content here!
            </div>
        </div>
    )
}

export default Panel;
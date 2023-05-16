import React from 'react';

const FontSizeBigName = (device, nameData, sizeNumber = "70%") => {
        let limittext = 10
        if(nameData.split(" ").some(text=>text.length>limittext)){
            return <div style={{fontSize:sizeNumber,margin:"5 0 5"}}> {nameData}</div>
        }
        else {
            return nameData
        }

};

export default FontSizeBigName;
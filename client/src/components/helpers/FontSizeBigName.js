import React from 'react';

const FontSizeBigName = (device, nameData, percentFont = "70%",limitText=7) => {

        if(nameData.split(" ").some(text=>text.length>limitText || nameData?.length>limitText)){
            return <div style={{fontSize:percentFont,margin:"5 0 5"}}> {nameData}</div>
        }
        else {
            return nameData
        }

};

export default FontSizeBigName;
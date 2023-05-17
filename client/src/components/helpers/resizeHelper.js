import React, {useEffect} from 'react';


const ResizeHelper = (setWindowWidth) => {

    //get width our window
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

};

export default ResizeHelper;
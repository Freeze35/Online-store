import React, {useState} from 'react';
import leftArrow from "../../../assets/left.svg";
import "./RotateArrow.css"

const RotateArrow = ({option}) => {

    const [rotated,setRotated] =useState(true)

    const Rotate = () =>{
        setRotated(prev =>!prev)
    }

    return (
        <div className="full_arrow" id={`${option.value}rotate${option.name}`} style={{pointerEvents:"none"}} onClick={Rotate}>
                <img src={leftArrow} className={rotated?"left_arrow":"left_arrow_rotated"} alt=""/>
                <img src={leftArrow} className={rotated?"right_arrow":"right_arrow_rotated"} alt="" />
        </div>
    );
};

export default RotateArrow;
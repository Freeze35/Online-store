import React, {useContext} from 'react';
import star from "../../../assets/star_orange.png"
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../../../utils/consts";
import {addToBasket} from "../AddDeviceToBasket";
import {Context} from "../../../index.js";
import add_to_basket from "../../../assets/add_to_basket.png";
import "../buttonDeviceAddToBasket.css"
import "./DeviceItem.css"
import ProgressiveImage from "react-progressive-graceful-image";

const DeviceItem = ({device, brands}) => {
    let navigate = useNavigate();
    const {user} = useContext(Context)
    const setName = () => {
        return brands.map(brand => {
            if (brand.id === device.brandId) {
                let splitNames = device.name.split(" ")
                if (brand.name === splitNames[0]) {
                    return ""
                } else {
                    return brand.name
                }
            }
        })
    }

    const AddInBasket =(e)=>{
        addToBasket(user, device.id)
        e.stopPropagation()
    }

    const FontSize =()=>{
        let limittext = 10
        if(device.name.split(" ").some(text=>text.length>limittext)){
            return <div style={{fontSize:"70%",margin:"5 0 5"}}> {device.name}</div>
        }
        else {
            return device.name
        }

    }

    return (

            <div className="container_device"
                  onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
            >
                <ProgressiveImage src={process.env.REACT_APP_API_URL + device.img}
                                  placeholder={process.env.REACT_APP_API_URL + device.img.split(".")[0]+"SM.png"}>
                {(src,loading) =>
                <img className={loading?"device_image loading_image":"device_image loaded_image"}
                    src={src} alt="an image" loading="lazy" />
                }
                </ProgressiveImage>
                {/*<img src={process.env.REACT_APP_API_URL + device.img}
                       className="device_image" alt="Item" loading="lazy"
                />*/}

                <div className="rating_name" style={{width:"100%"}}>
                    <div className="device_name" id="device_name" style={{width:"75%"}}>
                        {device.typeModel} {setName()} {FontSize()}
                    </div>
                    <div className="rating_name" style={{flexDirection:"column",width:"25%",paddingRight:15}}>
                        <img src={star} className="star" alt="star"></img>
                        <div style={{color:"orange"}}>{device.rating}</div>
                    </div>
                </div>
                <div className="price_add">
                    <div className="price" >
                        {device.price} руб.
                    </div>
                    <div className="add_div">
                        <button id="buttonAddToBasket" className="buttonAddToBasket"
                                onClick={AddInBasket}>
                            <img id="add_to_basket" className="add_to_basket" src={add_to_basket}
                                 alt={add_to_basket}/>
                        </button>
                    </div>
                </div>
            </div>

    );
};

export default DeviceItem;
import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from "../asstes/star.png"
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";



const DeviceItem = ({device,brands}) => {
    let navigate = useNavigate();

    const setName =()=>{
        return brands.map(brand => {
            if (brand.id === device.brandId) {
                let splitNames = device.name.split(" ")
                if(brand.name === splitNames[0]){
                    return ""
                }
                else{
                    return brand.name
                }
            }})
        }


    /*useEffect(()=>{
        let splitNames = device.name.split(" ")
        console.log(splitNames[0])
    },[])*/

    return (
        <Col md = {3} >
            <Card style={{width:200,height:250,cursor:"pointer",border:"light",boxShadow:"0px 0px 4px black", borderRadius:5}} className="mt-3"
            onClick={()=> navigate(DEVICE_ROUTE+"/"+device.id)}
            >

                <Image style={{width:150,height:150}} src={process.env.REACT_APP_API_URL + device.img}
                       className={"rounded mx-auto d-block"}
                />
                <div className="d-flex justify-content-between align-items-center" style={{marginLeft:10,fontWeight:600}}>
                    <div>
                        {setName()} {device.name}
                    </div>
                    <div className="d-flex align-items-center" style={{fontSize:20}}>
                        <div>{device.rating}</div>
                        <Image src={star} style={{width: 20, height: 20}}></Image>
                    </div>
                </div>
                <div  className="d-flex " style={{fontSize:25,marginLeft:10,color:"#007afe"}}>
                    {device.price} руб.
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
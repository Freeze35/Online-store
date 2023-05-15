import React, {useContext, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {deleteOneInfoDevice, fetchOneDevice} from "../../../http/deviceApi";
import {Context} from "../../../index.js";
import CreatePageInfo from "../../../components/modals/CreatePageInfo";
import {addToBasket} from "../AddDeviceToBasket";
import "./DevicePage.css"
import star from "../../../assets/star_orange.png"
import {observer} from "mobx-react-lite";
import ProgressiveImage from "react-progressive-graceful-image";
import ReadAndWriteTxt from "../../../components/helpers/ReadAndWriteTxt";


const DevicePage = observer(() => {
    const [device, setDevice] = useState({info: []})
    const [loading, setLoading] = useState(true)
    const [visibleInfo, setInfoVisible] = useState(false)
    const [info, setInfo] = useState([])
    const [update, setUpdate] = useState(false)
    const {user} = useContext(Context)
    const {id} = useParams() //получаем id для oneDevice

    useEffect(() => {
        fetchOneDevice(id).then(data => {
            setDevice(data)
            setLoading(false)
        })

    }, [])

    const clearInfo = () => {
        setInfo(info.filter(i => i.number === 0))
    }

    // Возвращаем отфильтровонный device.info из которого удален ненужный элемент и разворачиваем в старый массив
    const removeInfoDB = (id) => {
        deleteOneInfoDevice(id).then(() => {
            const result = device.info
                .map(item => ({...item, info: item.info}))
                .filter(i => i.id !== id)
            setDevice({...device, info: result})
        })
    }
    // Добавление элемента в массив user.basket

    const Overwrite = (infoData) => {
        setInfoVisible(true)
        setUpdate(true)
        clearInfo()
        setInfo([...info, {
            id: infoData.id, title: infoData.title,
            description: infoData.description, number: Date.now()
        }])
    }

    if (!loading) {
        return (
            <div className="full_block">
                <div className="up_block">
                    <div className="img_block">
                        <ProgressiveImage src={process.env.REACT_APP_API_URL + device.img}
                                          placeholder={process.env.REACT_APP_API_URL + device.img.split(".")[0] + "SM.png"}>
                            {(src, loading) =>
                                <img className={loading ? "image_device loading_image" : "image_device loaded_image"}
                                     src={src} alt="an image" loading="lazy"/>
                            }
                        </ProgressiveImage>
                        <p>{device.typeModel} {device.name}</p>
                    </div>
                    <div className="rating_block">
                        <div className="star_inside"
                             style={{
                                 background: `url(${star})`, backgroundSize: "contain",
                                 backgroundRepeat: "no-repeat"
                             }}>
                            {device.rating}
                        </div>
                    </div>
                    <div className="buy_block">
                        <p className="add_price">Цена:</p>
                        <p className="add_price">{device.price} руб.</p>
                        <Button className="add_buy_button" variant={"outline-dark"}
                                onClick={() => addToBasket(user, id)}>Добавить в корзину</Button>
                    </div>
                </div>
                <div className="down_block">
                    <div style={{display: "flex", verticalAlign: "center"}}>
                        <h1 className="characteristics">Характеристики</h1>
                        {user.isAuth
                            ?
                            <Button
                                class
                                variant={"outline-dark"}
                                className="add_new_character"
                                onClick={() => {
                                    setInfoVisible(true)
                                    setUpdate(false)
                                    clearInfo()
                                }}
                            >
                                Добавить новое свойство
                            </Button>
                            : ""
                        }
                        <button style={{display:"none"}} onClick={ReadAndWriteTxt}>
                            readInfo
                        </button>
                        <CreatePageInfo show={visibleInfo} onHide={() => {
                            setInfoVisible(false)
                            clearInfo()
                        }}
                                        device={device} setDevice={setDevice} setLoading={setLoading}
                                        id={id} info={info} setInfo={setInfo} update={update}
                                        setUpdate={setUpdate} clearInfo={clearInfo} removeInfoDB={removeInfoDB}
                                        setInfoVisible={setInfoVisible}
                        />
                    </div>
                    <div className="characteristics_down_block">
                        {device.info.map((infoData, index) =>
                            <div key={infoData.id}
                                 className="info_data"
                                 style={{
                                     background: index % 2 === 0 ? '#AED3FFFF' : 'transparent',
                                     borderRadius: index === 0 ? "0 5px 5px 5px" : "5px",
                                 }}>
                                {user.isAuth
                                    ? <div style={{display: "flex",width:"100%",alignItems:"center"}}>
                                        <Button variant="outline-success"
                                                style={{height: "60px",width:"15%"}}
                                                onClick={() => {
                                                 Overwrite(infoData) }}
                                                className="me-3 m-2">

                                            Обновить</Button>

                                        <Button variant="outline-danger" style={{height: "60px",width:"15%"}}
                                                onClick={() => removeInfoDB(infoData.id)}
                                                className="me-3 m-2"> Удалить</Button>

                                        <div className="d-flex align-items-center"
                                             style={{width:"70%"}}>
                                            <div style={{fontWeight:600,width:"30%"}}>{infoData.title}: </div>
                                            <div style={{padding:20,width:"70%",textAlign:"inherit"}}>
                                                {infoData.description}</div>
                                        </div>

                                    </div>

                                    : <div className="d-flex align-items-center"
                                           style={{width:"70%"}}>
                                        <div style={{fontWeight:600,width:"50%"}}>{infoData.title}: </div>
                                        <div style={{padding:20,width:"50%",textAlign:"inherit"}}>
                                            {infoData.description}</div>
                                      </div>
                                }
                            </div>
                        )}
                    </div>

                </div>
            </div>

        )
    }
})

export default DevicePage;
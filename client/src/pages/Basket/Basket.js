import React, {useContext, useState} from 'react';
import {Context} from "../../index.js";
import {Button, Image} from "react-bootstrap";
import BasketNumberOfDevicesInput from "./NumberOfDevices/BasketNumberOfDevicesInput";
import {createBasketBuy} from "../../http/basketApi";
import {LOGIN_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import "./Basket.css"
import FontSizeBigName from "../../components/helpers/FontSizeBigName";


const Basket = observer(() => {
    const {user, device} = useContext(Context)
    let [totalAmount, setTotalAmount] = useState(0)
    const navigate = useNavigate()

    const Pay = () => {
        const formData = new FormData()
        formData.append('totalAmount', `${totalAmount}`)
        formData.append('basketData', JSON.stringify(user.basket))
        formData.append('basketId', user.userId === "not_authorized" ? 1 : user.userId)
        createBasketBuy(formData)

    }

    const DeleteDeviceBasket = (basketInfo) => {
        user.setBasket([...user.basket.filter(basketDevice => basketDevice !== basketInfo)])
    }

    const brandCheck = (basketInfo) => {
        return device.brands.map(b =>
            b.id === basketInfo.brandId
            && basketInfo.name.split(" ")[0] !== b.name
                ? b.name
                : " ")
    }

    return (
        <div className="basket">
            <div className="basket_devs_block" style={{width: "75%"}}>
                {user.basket.length > 0 ?
                    user.basket.map(basketInfo => {
                            return (
                                <div key={`${basketInfo.brandId}+${basketInfo.name}`} className="basket_device">
                                    <div style={{width: "33%"}}>
                                        <Image key={basketInfo.defaultValue} className=" basket_device_image"
                                               src={process.env.REACT_APP_API_URL + basketInfo.img}>
                                        </Image>
                                    </div>
                                    <div style={{width: "33%"}} key={`${basketInfo.brandId}_${basketInfo.name}`}
                                         className="basket_device_name">
                                        {brandCheck(basketInfo)}
                                        {FontSizeBigName(device,basketInfo.name,"50%")}<br/>
                                    </div>

                                    <BasketNumberOfDevicesInput style={{width: "33%"}}
                                                                basketInfo={basketInfo}
                                                                setTotalAmount={setTotalAmount}
                                                                totalAmount={totalAmount}>
                                    </BasketNumberOfDevicesInput>
                                    <Button className="remove_basket_device" onClick={() => {
                                        DeleteDeviceBasket(basketInfo)
                                    }}
                                            variant="outline-danger">
                                        x
                                    </Button>
                                </div>
                            )
                        }
                    ) : <div className="empty_text">Корзина Пуста</div>
                }
            </div>
            <div style={{width: "25%"}} className="upper_to_pay_block">
                <div className="to_pay_block">
                    <label className="to_pay_text">
                        К Оплате: <br/>
                    </label>
                    <label className="to_pay_total_amount">
                        {totalAmount} <label className="to_pay_total_amount">руб.</label></label>
                    {user.userId !== "not_authorized"
                        ?
                        <Button className="pay_auth" variant="outline-primary" onClick={() => {
                            Pay()
                        }}>Оплатить</Button>
                        :
                        <button className="pay_auth" onClick={() => {
                            navigate(LOGIN_ROUTE)
                            Pay()
                        }}>Авторизация</button>
                    }
                </div>
            </div>
        </div>
    );
});

export default Basket;
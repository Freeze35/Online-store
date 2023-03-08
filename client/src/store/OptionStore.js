import {makeAutoObservable} from "mobx";

export default class OptionStore{
    constructor(){

        this._typeDevicesList=[]
        this._specialID=[]
        this._limitPrice=[]
        makeAutoObservable(this)
    }

    setTypeBrandListId(typeDevicesList){
        this._typeDevicesList = typeDevicesList
    }

    setSpecialID(specialID){
        this._specialID = specialID
    }

    setLimitPrice(limitPrice){
        this._limitPrice = limitPrice
    }

    get typeBrandListId(){
        return this._typeDevicesList
    }

    get specialID(){
        return this._specialID
    }
    get limitPrice(){
        return this._limitPrice
    }

}
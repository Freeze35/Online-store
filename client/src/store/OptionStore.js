import {makeAutoObservable} from "mobx";

export default class OptionStore{
    constructor(){

        this._typeDevicesList=[]
        this._specialID=[]
        this._totalAmount = 0
        makeAutoObservable(this)
    }

    setTypeBrandListId(typeDevicesList){
        this._typeDevicesList = typeDevicesList
    }

    setSpecialID(specialID){
        this._specialID = specialID
    }

    setTotalAmount(totalAmount){
        this._totalAmount = totalAmount
    }

    get typeBrandListId(){
        return this._typeDevicesList
    }

    get specialID(){
        return this._specialID
    }

    get totalAmount(){
        return this._totalAmount
    }

}
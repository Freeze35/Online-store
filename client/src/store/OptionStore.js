import {makeAutoObservable} from "mobx";

export default class OptionStore{
    constructor(){

        this._typeDevicesList=[]
        this._specialID=[]
        makeAutoObservable(this)
    }

    setTypeBrandListId(typeDevicesList){
        this._typeDevicesList = typeDevicesList
    }

    setSpecialID(specialID){
        this._specialID = specialID
    }

    get typeBrandListId(){
        return this._typeDevicesList
    }

    get specialID(){
        return this._specialID
    }

}
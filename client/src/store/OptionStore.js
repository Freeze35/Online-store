import {makeAutoObservable} from "mobx";

export default class OptionStore{
    constructor(){

        this._typeDevicesList=[]
        this._brandDevicesList=[]
        makeAutoObservable(this)
    }

    setTypeBrandListId(typeDevicesList){
        this._typeDevicesList = typeDevicesList
    }

    setBrandDevicesList(brandDevicesList){
        this._brandDevicesList = brandDevicesList
    }

    get typeBrandListId(){
        return this._typeDevicesList
    }

    get brandDevicesList(){
        return this._brandDevicesList
    }



}
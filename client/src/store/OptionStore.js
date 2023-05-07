import {makeAutoObservable} from "mobx";

export default class OptionStore{
    constructor(){

        this._typeDevicesList=[]
        this._specialID=[]
        this._limitPrice=[]
        this._sortOptions= {sortOption:""}
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

    setSortOptions(sortOptions){
        this._sortOptions = sortOptions
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
    get sortOptions(){
        return this._sortOptions
    }

}
import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._basket = []
        this._userId= "not_authorized"
        makeAutoObservable(this) // Слежение за компонентами перерндер в случае изменения компонента
    }
    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }
    setBasket(basket){
        this._basket = basket
    }
    setUserId(userId){
        this._userId = userId
    }
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
    get basket(){
        return this._basket
    }
    get userId(){
        return this._userId
    }
}
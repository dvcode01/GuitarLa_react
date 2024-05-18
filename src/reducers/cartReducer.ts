import { db } from "../../data/db";
import { CartItem, Guitar } from "../types/types";

export type CartActions = 
    {type: 'add-cart', payload: {item: Guitar}} |
    {type: 'remove-cart', payload: {id: Guitar['id']}} |
    {type: 'increase-quantity', payload: {id: Guitar['id']}} |
    {type: 'decrease-quantity', payload: {id: Guitar['id']}} |
    {type: 'clear-cart'}
;

export type CartState = {
    data: Guitar[],
    cart: CartItem[]
};

export const initialState : CartState = {
    data: db,
    cart: []
}

const maxItem = 5;
const minItem = 1;

export const cartReducer = (state : CartState = initialState, action : CartActions) => {
    if(action.type === 'add-cart'){
        let updatedCart: CartItem[] = [];

        const itemExists = state.cart.find((guitar) => guitar.id === action.payload.item.id);

        // Existe un item duplicado
        if(itemExists){
            updatedCart = state.cart.map(item => {
                if(item.id === action.payload.item.id){
                    if(item.quantity < maxItem){
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item;
                    }
                }else{
                    return item;
                }
            })
        }else{
            const newItem : CartItem = {...action.payload.item, quantity: 1};
            updatedCart = [...state.cart, newItem];
        }

        return {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'remove-cart'){
        // Elimina los elementos del carrito
        const updatedCart = state.cart.filter(item => item.id !== action.payload.id);

        return {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'increase-quantity'){
        // Incrementa la cantidad de elementos en el carrito
        const updateCart = state.cart.map(item => {
            if(item.id === action.payload.id && item.quantity < maxItem){
                return{
                    ...item, 
                    quantity: item.quantity + 1
                }
            }

            return item
        });

        return {
            ...state,
            cart: updateCart
        }
    }

    if(action.type === 'decrease-quantity'){

        return {
            ...state,

        }
    }


    if(action.type === 'clear-cart'){

        return {
            ...state,

        }
    }

}









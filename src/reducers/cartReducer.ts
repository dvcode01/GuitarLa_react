import { Guitar } from "../types/types";

export type CartActions = 
    {type: 'add-cart', payload: {item: Guitar}} |
    {type: 'remove-cart', payload: {id: Guitar['id']}} |
    {type: 'increase-quantity', payload: {id: Guitar['id']}} |
    {type: 'decrease-quantity', payload: {id: Guitar['id']}} |
    {type: 'clear-cart'}
;
// USING MULTIPLE REDUCERS & MULTIPLE STATES

// use COMBINE REDUCERS METHOD to combine "multiple reducers" into "single reducer" for store

const redux = require('redux') 
const createStore = redux.createStore 
// IMPORT HELPER FUNCTION               
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers       

const CAKE_ORDERED   = 'CAKE_ORDERED'   ;                                           
const CAKE_RESTOCKED = 'CAKE_RESTOCKED' ;                                           
const ICECREAM_ORDERED = 'ICECREAM_ORDERED' ;
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED' ;

// In redux the convention is to use a property called payload, for any additional information u want to send. This is for every ACTION in ur code base.

function orderCake(qty = 1) {
    return {
        type: CAKE_ORDERED,
        // quantity: 1 
        payload: qty,
    }       
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        // quantity: qty,
        payload: qty,
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20,
// }

const initialCakeState = {
    numOfCakes: 10,    
}

const initialIceCreamState = {
    numOfIceCreams: 10,    
}

// action.type
// action.payload

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            // return new state
            return {
                ...state,                              
                numOfCakes: state.numOfCakes - action.payload       
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                // remember in React we don't directly mutate "state".
                numOfCakes : state.numOfCakes + action.payload
            }         
        default:
            return state    
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){ 
        case ICECREAM_ORDERED:
            // return new state
            return {
                ...state,                              
                numOfIceCreams: state.numOfIceCreams - action.payload       
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                // remember in React we don't directly mutate "state".
                numOfIceCreams : state.numOfIceCreams + action.payload
            }                 
        default:
            return state    
    }
}
// It is convention to call combination of all our Reducers as "rootReducer"
// combineReducers( {} )   --->  this method accepts an object

const rootReducer = combineReducers({ 
    // each key-value pair for this object corresponds to a reducer
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer)

console.log('Initial State : ', store.getState())

const unsubscribe = store.subscribe(() => 
    console.log(' 💫 Updated State: ', store.getState())
)     

// When we dispatch an action, both the reducers receive that action
// The difference is that, one of them acts on that action, while others not (ignores it).
const actions = bindActionCreators( { orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch )

// to dispatch the action:
actions.orderCake(5)
actions.restockCake(3)

actions.orderIceCream(5)
actions.restockIceCream(3)


unsubscribe()
store.dispatch(orderCake())


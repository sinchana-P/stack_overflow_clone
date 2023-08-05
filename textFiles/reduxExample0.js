// import redux from 'redux';
const redux = require('redux')  // use - require syntax , for node.js app
// import { legacy_createStore as createStore} from 'redux'
const createStore = redux.createStore

// console.log('From index.js');

//  🚀    ACTION

// using constants will reduce spelling mistake
const CAKE_ORDERED = 'CAKE_ORDERED';

// we define an action
// ✨ an ACTON --> is an OBJECT --> that has TYPE property
// we have no limitation just for type property
// we can structure ACTION object as we need

// {
//     type: CAKE_ORDERED,
//     quantity: 1
// }

// ✨ ACTION CREATOR : function tht returns an ACTION
// THAT CREATES AN ACTION, the object

// 👉 exec 6 :
function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1 
    }       
}

// INITIAL STATE
const initialState = {
    numOfCakes: 10,
    anotherProperty: 0
}

//  🚀    REDUCER   :   A pure function, accepts state & action as arguments ---> returns the next state (new state)
// (previousState, action) => newState

// 👉 exec 2 :
// 👉 exec 7 :   // try to match the typein the switch cases
const reducer = (state = initialState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            // return new state
            return {
                ...state,                               // It is safe to create a copy of a state object    // spread property
                numOfCakes: state.numOfCakes - 1        // then only change the property tht need to
            }
        default:
            return state    
    }
}


//   🚀   REDUX STORE ( STATE )

// ✨ ONE STORE FOR THE ENTIRE APPLICATION

// REDUX STORE RESPONSIBILITIES -
//        - Holds application state
//        - getState()              --> Allows "access" to state via getState() 
//        - dispatchEvent(action)   --> Allows state to be "updated" via dispatchEvent(action)
//        - subscribe(listener)     --> "registers" listeners via subscribe(listener)       // listener: function  ---> 💫 "subscribe" method gets👉 executed, anytime the state in the redux store changes.
//        - subscribe(listener)     --> handles "unregistering" of listeners via function returned by --> subscribe(listener)

// RESP 1 :
// 👉 exec 1 :
const store = createStore(reducer)
// accepts "reducer" function :
// The "reducer" function, has the "initial state" of the application. This is required for the "store" to make transitions, based on the "actions" received.

// RESP 2 :
// 👉 exec 3 :
console.log('Initial State : ', store.getState())

// RESP 4 :
// 👉 exec 4:
const unsubscribe = store.subscribe(() => 
    console.log(' 💫 Updated State: ', store.getState())
)     
// use "unsubscribe" : to capture return function from "subscribe" method

// RESP 3 :
// 👉 exec 5:  // when we dispatch the first action,"reducer" see the "action type"
store.dispatch(
    {
        type: CAKE_ORDERED,
        quantity: 1 
    }
)                            // dispatch action to update the store.
store.dispatch(orderCake())
store.dispatch(orderCake())
// Always use "Action Creators" instead of just "Actions".

// RESP 5 :
unsubscribe()
// "unsubscribe" to changes in the store
// if u were to dispatch an action after unsubscribing, u won't see the log statements which show the updated value.

store.dispatch(orderCake())
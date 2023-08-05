- ANALOGY:

# STORE     : ICE-CREAM SHOP
# REDUCER   : SHOP-KEEPER
# ACTION    : ORDER BY CUSTOMER



### const reducer = (state = initialState, action) => {
    switch(action.type){
#        case CAKE_ORDERED:
            return {
#                ...state,                              
                numOfCakes: state.numOfCakes - 1        
            }
#        case CAKE_RESTOCKED:
            return {
#                ...state,
            }    
        default:
#            return state    
    }
}


# REDUCER {
#    case ACTION
#        return STATE;
  } 


<!-- to dispatch -->
# store.dispatch(
    {
        type: CAKE_ORDERED,
        quantity: 1 
    }
)    

<!-- or -->

<!-- dispatch action to update the store using "ACTION CREATOR". -->
# store.dispatch(orderCake())

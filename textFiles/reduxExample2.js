// Async action Creators, with network requests
// how to make API Call when working with Redux
// Packages :
// AXIOS : Requests to an API end point
// REDUX-THUNK : Define async action creators. ---> Will be a MIDDLEWARE

// 5. 
const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default

// thunkMiddleware ---> the ability for an "action-creator" to return a function, instead of an action object.

const axios = require('axios')

// const createStore = redux.legacy_createStore

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

// we need to define 3 things
// THE STATE
// THE ACTION
// THE REDUCER

// 1. STATE
const initialState = {
    loading: false,
    users: [],
    error: ''
}

// 2. ACTIONS
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

// ACTION CREATORS
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}

// 3. REDUCER
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUESTED :
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCEEDED :
            return {
                loading: false,
                users: action.payload,
                error: ''
            }    
        case FETCH_USERS_FAILED :
            return {
                loading: false,
                data: [],
                error: action.payload
            }    
    }
}

// 6. define async action creator
const fetchUsers = () => {
    // speacial ? >>> it doesn't have to be pure, it is allowed to have side effects such as aynchronous api calls.
    // this "function" can also dispatch actions like the ones we hv seen before.
    // that is made possible because it receives the dipatch method as its argument.  
    return function (dispatch) {
        // before we fire off our API call, we dispatch "fetchUsersRequest" 
        // this action creator will set the "loading" to "true" 
        dispatch(fetchUsersRequest())

        // refer jsonplaceholder.typicode.com
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                // response.data is the users
                const users = response.data.map(user => user.id)
                // So, when the request is successful, i.e. when we get the response, we dispatch "fetchUsersSuccess" passing in the list of user id's.
                // that stores the users in our state
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                // error.message is the error message
                dispatch(fetchUsersFailure(error.message));
            })
    }
}

// 4. REDUX STORE
const store = createStore(reducer,applyMiddleware(thunkMiddleware))

// now, subscribe to our store and dispatch asynchronous action 
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())
  



// {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//       "street": "Kulas Light",
//       "suite": "Apt. 556",
//       "city": "Gwenborough",
//       "zipcode": "92998-3874",
//       "geo": {
//         "lat": "-37.3159",
//         "lng": "81.1496"
//       }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//       "name": "Romaguera-Crona",
//       "catchPhrase": "Multi-layered client-server neural-net",
//       "bs": "harness real-time e-markets"
//     }
//   }



// output :
// PS F:\REDUX PROJECTS\REDUX> node index-9.js
// { loading: true, users: [], error: '' }
// {
//   loading: false,
//   users: [
//     1, 2, 3, 4,  5,
//     6, 7, 8, 9, 10
//   ],
//   error: ''
// }

// output for invalid url :

// PS F:\REDUX PROJECTS\REDUX> node index-9.js
// { loading: true, users: [], error: '' }
// {
//   loading: false,
//   data: [],
//   error: 'Request failed with status code 404'
// } 

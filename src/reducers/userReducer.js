const initialState = {
  users: [
    {
      id: 1,
      first_name: 'Sean',
      last_name: 'Conrad',
      email: "seanconrad123@gmail.com"
    },
  ],
  loadingData: false,
  skate_spots:[
    {
      id:1,
      name: 'MySkateSpot',
      country: 'USA',
      state: 'NY',
      city: 'NYC',
      latitude: '40.7128',
      longitude: '74.0060',
      description: 'A good spot',
      bust_factor: 10,
      photo: 'n/a',
      user_id: 1
    }
  ],
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }

    case 'AUTHENTICATING_USER':
      return { ...state, authenticatingUser: true }

    case 'AUTHENTICATED_USER':
      return { ...state, authenticatingUser: false }

    case 'FAILED_LOGIN':
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      }

    case 'LOGOUT_USER':
      return {...state, loggedIn: false}

    case 'GET_USERS':
      return {...state, users: action.payload}
    case 'GET_SKATE_SPOTS':
      return {...state, skate_spots: action.payload}
    case 'POST_SKATE_SPOT':
      return {...state, skate_spots: action.payload }
    case 'GET_USER_DATA':
      return {...state, user_data: action.payload }
    case 'LOADING_DATA':
      return {...state, loadingData: true }
    case 'LOADED_DATA':
      return {...state, loadingData: false }
    case 'GET_USER_GEOLOCATION':
      return {...state, geoLocation: action.payload }
    case 'LOG_SEARCH_TERM':
      return {...state, logSearchTerm: action.payload}
    default:
      return state
  }
}

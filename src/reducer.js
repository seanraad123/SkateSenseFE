const initialState = {
  users: [
    {
      id: 1,
      first_name: 'Sean',
      last_name: 'Conrad',
      email: "seanconrad123@gmail.com"
    },
    {
      id: 2,
      first_name: 'Tony',
      last_name: 'Turetsky',
      email: "tonyturestky@gmail.com"
    },
    {
      id: 3,
      first_name: 'John',
      last_name: 'Ahn',
      email: "tonyturestky@gmail.com"
    }
  ],
    currentUser: {
      id: 3,
      first_name: 'John',
      last_name: 'Ahn',
      email: "tonyturestky@gmail.com"
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USERS':
      return {...state, users: action.payload}
    case 'GET_SKATE_SPOTS':
      return {...state, skate_spots: action.payload }
    default:
      return state
  }
}
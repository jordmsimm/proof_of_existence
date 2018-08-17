const initialState = {
    allExistenceHash: "QmQAeGJwjRHXJLZKFiK7GV5LVjjrgYKAa3Ei1owMjm8hKA",
    allExistences:[]
  }
  
  const existenceReducer = (state = initialState, action) => {
    if (action.type === 'SET_HASH')
    {
      return Object.assign({}, state, {
        allExistenceHash: action.payload.allExistenceHash
      })
    }

    if (action.type === 'SET_EXISTENCE')
    {
      return Object.assign({}, state, {
        allExistences: action.payload.allExistences
      })
    }
  
    return state
  }
   
  export default existenceReducer
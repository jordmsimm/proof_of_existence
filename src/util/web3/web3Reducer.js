const initialState = {
  web3Instance: null
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED')
  {
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance
    })
  }
  return state 
}

//eth.sendTransaction({from:eth.accounts[0], to:"0xb14069be2affe4315aa82cc2f029ff5b42dd1421", value: web3.toWei(3.00, "ether")})
 
export default web3Reducer

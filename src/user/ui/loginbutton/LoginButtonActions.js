import { uport ,web3} from './../../../util/connectors.js'
import { browserHistory } from 'react-router'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
function web3Initialized(results) {
  return {
    type: 'WEB3_INITIALIZED',
    payload: results
  }
} 


export function loginUser() {
  return function(dispatch) {
    // UPort and its web3 instance are defined in ./../../../util/wrappers.
    // Request uPort persona of account passed via QR
    uport.requestCredentials(
      {requested: ['name', 'phone', 'country'],
      notifications: true // We want this if we want to recieve credentials
    }).then((credentials) => {
      dispatch(userLoggedIn(credentials))
      const results = {
        web3Instance: web3
      }
      console.log('uportweb3')
      //console.log(web3)
      dispatch(web3Initialized(results))
      // Used a manual redirect here as opposed to a wrapper.
      // This way, once logged in a user can still access the home page.
      var currentLocation = browserHistory.getCurrentLocation()

      if ('redirect' in currentLocation.query)
      {
        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
      }

      return browserHistory.push('/dashboard')
    })
  }
}

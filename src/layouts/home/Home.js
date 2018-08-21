import React, { Component } from 'react'
import AddExistence from '../dashboard/existence/AddExistence'
import ListExistences from '../dashboard/existence/ListExistences'
class Home extends Component {
  render() {
    return(

      <main className="container">
        <div className="home-container">
          <div className="pure-u-1-1">
            <h1 className="home__heading">Proof of Existence</h1>
            <p> Proof of existence app lets you store data on the block chain to prove its existence. 
            You can store images, viedos, and text. This data is tamper proof, and has a timestamp to prove
            that the data existence at a point in time.</p>

          </div>
        </div>
      </main> 
    )
  }
}

export default Home

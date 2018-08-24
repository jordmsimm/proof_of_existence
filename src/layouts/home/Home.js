import React, { Component } from 'react'
class Home extends Component {
  render() {
    return(

      <main className="container">
        <div className="home-container">
          <div className="pure-u-1-1">
            <h1 className="home__heading">Proof of Existence</h1>
            <div className="home__description__container">
              <p className="home__description">Need to store something to prove that it existed at a give point in time?</p>
              <p className="home__description">Do you have an idea you want to write in stone?</p>
              <p className="home__description"> Proof of existence app lets you store data on the block chain to prove its existence. 
              You can store images, viedos, and text. This data is tamper proof, and has a timestamp to prove
              that the data existence at a point in time.</p>
            </div>
          </div>
        </div>
      </main> 
    )
  }
}

export default Home

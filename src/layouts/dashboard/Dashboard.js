import React, { Component } from 'react'
import ListExistences from './existence/ListExistences'
import AddExistence from './existence/AddExistence'


class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Welcome {this.props.authData.name}!</strong> </p>
            <AddExistence/>
            <ListExistences/>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard

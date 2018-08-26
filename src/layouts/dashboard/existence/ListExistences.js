import React , { Component } from 'react';
import Existence from './Existence';
import {connect} from 'react-redux';
import ExistenceContract from '../../../../build/contracts/Existence.json';
import {setTotalExistences} from '../../../actions/existenceActions';
import store from '../../../store';
import _ from 'lodash';


class ListExistences extends Component {
    constructor(props, { authData }) {
        super(props)
        authData = this.props
      }

    componentDidMount(){
        this.setExistences()
    }

    setExistences = () =>{
        setTimeout(()=>{
            const contract = require('truffle-contract')
            const existence = contract(ExistenceContract)
            existence.setProvider(this.props.web3.currentProvider)
            var existenceInstance;
            this.props.web3.eth.getCoinbase((error, coinbase) => {
                existence.deployed().then((instance) => {
                    existenceInstance = instance;
                    existenceInstance.getTotalExistences({from:coinbase})
                    .then((results)=>{
                        console.log(results)
                        const allExistences = results.toNumber();
                        const result = {
                            totalExistences:allExistences
                        }
                        if(results.toNumber() !== 0){
                            console.log(store.dispatch(setTotalExistences(result)))
                        }
                        
                    })
                });
            })
        },100)
    }


      render() {
        return(
        <div className='option'>
            
            <div className="existencelist-container">
            <div className="existencelist__heading">
                <h1>Existences</h1>
                <p>Total Existences: {this.props.existence.totalExistences}</p>
            </div>
                {this.props.existence.totalExistences >0 &&
                    _.times(this.props.existence.totalExistences,(i)=>{
                        setTimeout(function(){ console.log('t1me')}, 1000);
                        return <Existence key={i} id={i}/>
                    })
                } 
            </div>
        </div>
        )}
} ;
 

function mapStateToProps(state, ownProps) {
    return {
        web3: state.web3.web3Instance,
        existence:state.existence
    };
  }
  
export default connect(mapStateToProps)(ListExistences);


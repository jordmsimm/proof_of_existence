import React , { Component } from 'react';
import Existence from './Existence';
import {connect} from 'react-redux';
import ExistenceContract from '../../../../build/contracts/Existence.json';
import {setAllExistenceHash,setAllExistences,setTotalExistences} from '../../../actions/existenceActions';
import store from '../../../store';
import ipfs from '../../../util/ipfs/ipfs';
import _ from 'lodash';


class ListExistences extends Component {
    constructor(props, { authData }) {
        super(props)
        authData = this.props
      }

      componentDidMount(){
        setTimeout(()=>{
            const contract = require('truffle-contract')
            const existence = contract(ExistenceContract)
            //console.log(this.props)
            existence.setProvider(this.props.web3.currentProvider)
            var existenceInstance;
            this.props.web3.eth.getCoinbase((error, coinbase) => {
                existence.deployed().then((instance) => {
                    existenceInstance = instance;
                    //console.log(existenceInstance.owner.call())
                    existenceInstance.getTotalExistences.call()
                    .then((results)=>{
                        const allExistences = results.toNumber();
                        const result = {
                            totalExistences:allExistences
                        }
                        

                        console.log(store.dispatch(setTotalExistences(result)))
                    })
                });
            })
        },100)
    }


      render() {
        return(
        <div className='option'>
            <h3>All Existences</h3>
            <p>Total Existences: {this.props.existence.totalExistences}</p>
            
            {this.props.existence.totalExistences >0 &&
                _.times(this.props.existence.totalExistences,(i)=>{
                    return <Existence key={i} id={i}/>
                })
            } 
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


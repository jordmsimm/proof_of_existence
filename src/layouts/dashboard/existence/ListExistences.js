import React , { Component } from 'react';
import Existence from './Existence';
import {connect} from 'react-redux';
import ExistenceContract from '../../../../build/contracts/Existence.json';
import {setAllExistenceHash,setAllExistences} from '../../../actions/existenceActions';
import store from '../../../store';
import ipfs from '../../../util/ipfs/ipfs';

class ListExistences extends Component {
    constructor(props, { authData }) {
        super(props)
        authData = this.props
      }

      componentDidMount(){
        setTimeout(()=>{
            const contract = require('truffle-contract')
            const existence = contract(ExistenceContract)
            console.log(this.props)
            existence.setProvider(this.props.web3.currentProvider)
            var existenceInstance;
            this.props.web3.eth.getCoinbase((error, coinbase) => {
                existence.deployed().then((instance) => {
                    existenceInstance = instance;
                    console.log(existenceInstance.owner.call())
                    existenceInstance.getAllExistenceHash.call()
                    .then((result)=>{
                        console.log(result)
                        //if(result){
                            //console.log('contract done if')
                            const results = {
                                allExistenceHash: result
                              }
                            console.log(store.dispatch(setAllExistenceHash(results)))
                            ipfs.cat(this.props.existence.allExistenceHash, (err, res) => {
                                //console.log(err,ipfsHash);
                                if(err){
                                    console.log(err)
                                }else{
                                    const results = {
                                        allExistences:JSON.parse(res.toString('utf8'))
                                    }
                                    console.log(results)
                                    console.log(store.dispatch(setAllExistences(results)))
                                    console.log(this.props.existence.allExistences)
                                    //console.log(myData.name)
                                    
                                }
                                //storeFront.ipfsHash = ipfsHash[0].hash
                            });
                       //}
                        
                       // this.setState(() => ({allExistenceHash:result}))
                    })
                });
            })
        },100)
    }


      render() {
        return(
        <div className='option'>
            <h3>All Existences</h3>
            <p>{ this.props.existence.allExistenceHash}</p>
           

            {this.props.existence.allExistences.map((e, index) => ( 
                
                <Existence name={JSON.parse(e).title} media={JSON.parse(e).imageHash}/>
            ) )
                    
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


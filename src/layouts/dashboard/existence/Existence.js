import React, { Component } from 'react'
import {connect} from 'react-redux';
import ipfs from '../../../util/ipfs/ipfs';
import ExistenceContract from '../../../../build/contracts/Existence.json';
import moment from 'moment'
// const Existence = (props) =>(
//     <div className='option'>
//         <p>Existence</p>
//         {props.name && <p>{props.name}</p>}
//         {props.media && <img src={"https://ipfs.infura.io/ipfs/" +props.media}/>}
        
//     </div>
// ) ;

class Existence extends Component {
    constructor(props, { authData }) {
        super(props)
        authData = this.props
      }

    state={
        id:undefined,
        title:undefined,
        imageHash:undefined,
        timestamp:''
    }

    componentDidMount(){
        setTimeout(()=>{
            //this.setState(() => ({id:this.props.id}))
            console.log(this.props.id)
            // if(this.props.id){
                const contract = require('truffle-contract')
                const existence = contract(ExistenceContract)
                console.log(this.props)
                existence.setProvider(this.props.web3.currentProvider)
                var existenceInstance;
                this.props.web3.eth.getCoinbase((error, coinbase) => {
                existence.deployed().then((instance) => {
                    existenceInstance = instance;
                    
                    existenceInstance.getSingleExistanceHash(this.props.id, {from:coinbase})
                    .then((results)=>{
                        const [id,ipfsHash,timestamp] = results
                        //console.log('resultsfromid')

                        //console.log(imgHash)
                        if(results){
                            console.log(ipfsHash.length)
                            if(ipfsHash.length == 46){
                                ipfs.cat(ipfsHash, (err, res) => {    
                                    if(err){
                                        console.log(err)
                                    }else{
                                        const result = JSON.parse(JSON.parse(res.toString('utf8')))
                                        console.log(result)
                                        const {title,description,imageHash} = result
                                        console.log(description)
                                        this.setState(() => ({title}))
                                        this.setState(() => ({description}))
                                        this.setState(() => ({imageHash}))
                                        
                                    }
                                    //storeFront.ipfsHash = ipfsHash[0].hash
                                });
                            }
                            this.setState(() => ({id:id.toNumber()}))
                            //this.setState(() => ({imgHash}))

                            this.setState(() => ({timestamp:timestamp.toNumber()}))
                        }
                        
                    })

                });
            })
        // }
        },100)
    }


      render() {
        return(
            <div className='option'>
            <p>Existence</p>
            {this.state.title && <h3>{this.state.title}</h3>}
            {this.state.timestamp && <p>Date {moment.unix(this.state.timestamp).format("MMMM Do YYYY, h:mm:ss a")}</p>}
            {this.state.imageHash && <img src={"https://ipfs.infura.io/ipfs/" +this.state.imageHash}/>}
            {this.state.description && <p>Description : {this.state.description}</p>}
            
            
            
        </div>
        )}
} ;

function mapStateToProps(state, ownProps) {
    return {
        web3: state.web3.web3Instance,
        existence:state.existence
    };
  }
  
export default connect(mapStateToProps)(Existence);

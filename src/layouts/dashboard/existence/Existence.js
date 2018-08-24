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
        timestamp:'',
        imageError:false
    }

    imageError = () => {
        var imageError = true;
        this.setState(() => ({imageError}))
    }
    componentWillMount(){
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
                        const [ipfsHash,timestamp] = results
                       // console.log(results)
                        if(results){
                            console.log(ipfsHash.length)
                            if(ipfsHash.length === 46){
                                ipfs.cat(ipfsHash, (err, res) => {    
                                    if(err){
                                        console.log(err)
                                    }else{
                                        const result = JSON.parse(JSON.parse(res.toString('utf8')))
                                       // console.log(result)
                                        const {title,description,imageHash} = result;
                                        this.setState(() => ({title}))
                                        this.setState(() => ({description}))
                                        this.setState(() => ({imageHash}))
                                        
                                    }
                                });
                            }
                            this.setState(() => ({timestamp:timestamp}))
                        }
                        
                    })

                });
            })
        // }
        },100)
    }


      render() {
        return(
            <div className='existence-container'>
                <div className="existence__heading">
                    <div className="existence__title">
                        {this.state.title && 
                            <p>{this.state.title}</p>}
                    </div>
                    <div className="existence__time">
                        {this.state.timestamp && 
                            <p>{moment.unix(this.state.timestamp).format("MMMM Do YYYY, h:mm:ss a")}</p>}
                    </div>
                </div>
                <div className="existence__content">
                    <div className="existence__image">
                        {this.state.imageHash && 
                            <img 
                                alt="Exists"
                                className={this.state.imageError && 'hide'}
                                src={"https://ipfs.infura.io/ipfs/" +this.state.imageHash}
                                onError={this.imageError}/>}
                        { this.state.imageError && <a href={"https://ipfs.infura.io/ipfs/" +this.state.imageHash} target='_blank'> See Media Here </a>}
                    </div>
                    <div className="existence__description">
                        {this.state.description && 
                            <p>{this.state.description}</p>} 
                    </div>
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
  
export default connect(mapStateToProps)(Existence);

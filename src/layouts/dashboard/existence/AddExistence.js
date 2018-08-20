import React, { Component } from 'react';
import Modal from 'react-modal';
import ipfs from '../../../util/ipfs/ipfs';
import {connect} from 'react-redux'
import ExistenceContract from '../../../../build/contracts/Existence.json';
import store from '../../../store';
import {setAllExistenceHash} from '../../../actions/existenceActions';
import Loader from 'react-loader-spinner';

class AddExistence extends Component {
    constructor(props, { authData }) {
        super(props)
        authData = this.props
      }

      state={
        isModalOpen:false,
        imageHash:false,
        allExistenceHash:null,
        isLoading:false
        }

    
    //store.dispatch(setAllExistenceHash(results))

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
                existenceInstance.getAllExistenceHash.call()
                .then((result)=>{
                   //console.log(result)
                    this.setState(() => ({allExistenceHash:result}))
                })
            });
        })
    },100)
    }
      handleToggleModal = () =>{
        //e.preventDefault();
        const _isModalOpen = !this.state.isModalOpen
        this.setState(() => ({isModalOpen:_isModalOpen}))
      }

      handleGetState = () =>{
          console.log(this.props)
      }

      convertToBuffer = async(reader) => {
        //file is converted to a buffer to prepare for uploading to IPFS
          const buffer = await Buffer.from(reader.result);
        //set this buffer -using es6 syntax
          this.setState({buffer});
      };

      captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };

      onSubmit = async (event) => {
        event.preventDefault();
        //let imageHash;
        this.setState(() => ({isLoading:true}))
        const contract = require('truffle-contract')
        const existence = contract(ExistenceContract)
        console.log(this.props)
        existence.setProvider(this.props.web3.currentProvider)
        var existenceInstance;

        const title = event.target.elements.title.value.trim();
        const description = event.target.elements.description.value.trim();

        //if(this.state.buffer){
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            console.log(ipfsHash[0].hash)
            let data;
            if(!err){
                data =  JSON.stringify({
                    title:title,
                    description:description,
                    imageHash:ipfsHash[0].hash
                })
            }else{
                data = {
                    title:title,
                    description:description,
                    imageHash:false
                }
            }

            //let allData = this.props.existence.allExistences
            //allData.unshift(data)
            //console.log(allData)
            const ipfsData = Buffer.from(JSON.stringify(data));

            ipfs.add(ipfsData, (err, ipfsHash) => {
                if(!err){ 

                    this.props.web3.eth.getCoinbase((error, coinbase) => {
                        existence.deployed().then((instance) => {
                            existenceInstance = instance;
                            console.log(existenceInstance.owner.call())
                            //this.setState(() => ({allExistenceHash:ipfsHash[0].hash}))
                            
                            existenceInstance.addExistence(ipfsHash[0].hash,{from:coinbase})
                            .then((result)=>{
                                console.log('Existence Added')
                                this.setState(() => ({isLoading:false}))
                                this.setState(() => ({isModalOpen:false}))
                                
                                // const results = {
                                //     allExistenceHash: ipfsHash[0].hash
                                //   }
                                
                                //console.log(store.dispatch(setAllExistenceHash(results)))
                                //console.log(result)
                                //this.setState(() => ({allExistenceHash:ipfsHash[0].hash}))
                            })
                        });
                    })

                    console.log(ipfsHash[0].hash);
                }else{
                    console.log('error saving main hash')
                }
            });
        }) //await ipfs.add 

       

      }; //onSubmit 

      render() {
        return(
        <div className='option'>

            <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.handleToggleModal}
            contentLabel="Create New Existence"
            closeTimeoutMS={200}
            >
                <h1>Create a new Proof of Existence</h1>
                {this.state.isLoading && <Loader 
                    type="Puff"
                    color="#00BFFF"
                    height="100"	
                    width="100"
                />   }
                <form onSubmit={this.onSubmit} >
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Add a tiltle"
                        required />
                    <input 
                    type = "file"
                    onChange = {this.captureFile}
                    />
                    
                    <textarea name="description" placeholder="Add a description" required/>
                    
                    <button 
                        type="submit"> 
                    Submit Data
                    </button>
                </form>
            </Modal>
            
            <button onClick={this.handleToggleModal}>Add New Existence</button>
            <button className='button'onClick={this.handleGetState}>get state</button>
        </div>
        )}
} ;


function mapStateToProps(state, ownProps) {
    return {
        web3: state.web3.web3Instance,
        existence:state.existence
    };
  }
  
  export default connect(mapStateToProps)(AddExistence);



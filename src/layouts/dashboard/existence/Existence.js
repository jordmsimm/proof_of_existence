import React from 'react'

const Existence = (props) =>(
    <div className='option'>
        <p>Existence</p>
        {props.name && <p>{props.name}</p>}
        {props.media && <img src={"https://ipfs.infura.io/ipfs/" +props.media}/>}
        
    </div>
) ;
export default Existence
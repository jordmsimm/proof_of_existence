import { Connect, SimpleSigner } from 'uport-connect'

export const uport = new Connect('Existence dApp', {
  clientId: '2ozYXZuutuVDCvd6WYjRaLNuMzCydYUfNBK',
  network: 'rinkeby',
  signer: SimpleSigner('452ed75bc0bb7227182448bc15c8ffe836c39214c2b08e83443cebb1019f9743')
})

//export let uport = new Connect('TruffleBox')
export const web3 = uport.getWeb3()

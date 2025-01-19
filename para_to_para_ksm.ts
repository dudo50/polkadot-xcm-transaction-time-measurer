// Import the API
import { Keyring, WsProvider, ApiPromise } from "@polkadot/api";
import "@polkadot/api-augment";
import { Builder } from '@paraspell/sdk-pjs'
import { cryptoWaitReady } from '@polkadot/util-crypto';

//Will transfer DOT from Relay chain to Parachain and measure time needed for the transfer

const Account = 'ADD ACCOUNT DATA';
const mnemonic = "ADD ACCOUNT MNEMONIC";

async function main () {
    const provider = new WsProvider('wss://asset-hub-kusama.dotters.network');
    const api = await ApiPromise.create({ provider });
    await cryptoWaitReady(); // Ensure WASM interface is initialized

    const wallet = new Keyring({ type: 'sr25519' });
    const signer = wallet.addFromUri(mnemonic);

    //generate extrinsic
    const tx = await Builder(api)
    .from("AssetHubKusama")
    .to("Basilisk") 
    .currency({symbol: "USDT", amount: 10000})
    .address(Account)
    .build() 

    //start the timer
    const currentTimeInMilliseconds = Date.now();

    // Convert it to a Date object
    const date = new Date(currentTimeInMilliseconds);
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
    console.log(`Current time with milliseconds: ${formattedTime}`);    
    await new Promise((resolve, reject) => {
      tx.signAndSend(signer, async ({ txHash, status, dispatchError }) => {
        if (status.isFinalized) {
          if (dispatchError) {
            if (dispatchError.isModule) {
              reject(new Error(`Error`));
            } else {
              reject(new Error(dispatchError.toString()));
            }
          } else {
            console.log("TX in block. Hash: https://assethub-kusama.subscan.io/extrinsic/"+ txHash.toString());
          }
        }
      });
    });
  }
  
  main().catch(console.error);
// Import the API
import { ApiPromise, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";
 
//Will transfer DOT from Relay chain to Parachain and measure time needed for the transfer

const Account = 'ADD ACCOUNT DATA';

async function main () {
    const provider = new WsProvider('wss://statemint.public.curie.radiumblock.co/ws');
    const api = await ApiPromise.create({ provider });
  
    // Retrieve the initial balance. Since the call has no callback, it is simply a promise
    // that resolves to the current on-chain value
    let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(Account);
  
    console.log(`${Account} has a balance of ${previousFree}, nonce ${previousNonce}`);
  
    // Here we subscribe to any balance changes and update the on-screen value

    api.query.system.account(Account, ({ data: { free: currentFree }, nonce: currentNonce }) => {
      // Calculate the delta
      const change = currentFree.sub(previousFree);
  
      // Only display positive value changes (Since we are pulling `previous` above already,
      // the initial balance change will also be zero)
      if (!change.isZero()) {

        //If balance change is registered, end the timer and display the time needed for the transfer
        const currentTimeInMilliseconds = Date.now();
        const date = new Date(currentTimeInMilliseconds);
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;;    
        console.log(`New balance change of ${change}, at time ${formattedTime}`);
        previousFree = currentFree;
        previousNonce = currentNonce;
      }
    });

  }
  
  main().catch(console.error);
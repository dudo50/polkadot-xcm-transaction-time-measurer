// Import the API
import { ApiPromise, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";
 
//Will transfer DOT from Relay chain to Parachain and measure time needed for the transfer

const Account = 'ADD ACCOUNT ADDRESS';

async function main () {
    const provider = new WsProvider('wss://hydration.dotters.network');
    const api = await ApiPromise.create({ provider });
  
    //Check dot balance
    let data: any = await api.query.tokens.accounts(Account, 5);
    let previousFree = data.free;
    console.log(`${Account} has a balance of ${data.free}`);
  
    // Here we subscribe to any balance changes and update the on-screen value

    api.query.tokens.accounts(Account, 5, ({ free: currentFree }: { free: any }) => {
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
      }
    });

  }
  
  main().catch(console.error);
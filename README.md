# polkadot-xcm-transaction-time-measurer
A set of small scripts that allow for almost exact measurement of XCM transaction time from sending to receiving.

## How to launch
- Choose scenario (Para to Para, Para to Relay, Relay to Para)
- Make sure to have enough balance on sender chain (Relay - Polkadot relay chain, Para - Asset Hub Polkadot)
- Transfers will substract approximately 0.2-0,3DOT + fees each transaction.

```
1. install ts-node by npm install -g ts-node 
2. Launch balance checker script by ts-node scenario_balance_check.ts
3. After balance checker loads, open new terminal
4. In second terminal start the transfer itself by ts-node scenario.ts  
```

The terminal of sender chain should print the sending time and when transaction is in block:
```
Current time with milliseconds: 13:25:44:978
TX in block. Hash: https://assethub-polkadot.subscan.io/extrinsic/hash
```

The terminal of receiving chain should print the receiving time and how much balance was added:
```
New balance change of 2998796903, at time 13:26:37.9
```

# JetumWallet Offline

This is offline version of [JetumWallet interface](https://github.com/elxor/jetum-wallet).

Generate Ethereum wallets and sign transactions without the internet.

## Using JetumWallet Offline (Cold Storage)

For increased security, you can run JetumWallet on your local computer, instead of from the website. The main computer being used to generate the transactions should not be connected to the internet. You can generate a wallet completely offline and send transactions on a different computer, which must be connected to the internet, from our ‘Send Offline’ section. In this way, your sensitive information (i.e. private key, keystore file, mnemonic phrase) is kept on an offline device, and it is never transmitted off your device.

### Downloading and Running JetumWallet Offline

Step 1. Start by [downloading the latest release of JetumWallet Offline](https://github.com/elxor/jetum-wallet-offline/releases).

Step 2. Click on JetumWalletOffline-vX.X.X.zip to download the file. Move this file to a USB stick (or another storage transfer device), and transfer it to your permanently-offline computer.

![jetum_offline_screen1](https://user-images.githubusercontent.com/69245613/121784375-ebd8d880-cbdd-11eb-97a8-95a3d00e7aa3.png)

Step 3. Plug the USB into your offline computer and extract all the files from the archive.

Step 4. To open JetumWalletOffline, double-click the ‘index.html’ file. This will open JetumWalletOffline in your browser.

![jetum_offline_screen2](https://user-images.githubusercontent.com/69245613/121784378-eed3c900-cbdd-11eb-95ad-cbcf74b4961d.png)

### Find the Nonce and Transaction Details

Step 1. Head to [JetumWallet.com](https://jetumwallet.com/) on your online computer.

Step 2. At the bottom, in the footer, choose the ‘Send Offline Helper’ tool.

![jetum_offline_screen3](https://user-images.githubusercontent.com/69245613/121161502-41785280-c877-11eb-917d-09cd45fa3bf5.png)

Step 3. Choose the network you are interacting with and fill in the address you are sending from, and our interface will generate a gas price and nonce for your transaction, along with other details.

Step 4. Make a note of generated information or export the JSON file and move this file onto a USB.

![jetum_offline_screen4](https://user-images.githubusercontent.com/69245613/121161742-7edce000-c877-11eb-96aa-f3973d9b0e06.png)

### Generate Your Offline Transaction

Step 1. Plug in the USB to your offline computer.

Step 2. Access the offline version of JetumWallet on this same offline device. This is done by opening ‘index.html’ from the file list with your browser.

Step 3. Access your wallet like you would normally. In offline version you won’t be able to see your ETH or token balances, but these are viewable in a secure, public way by using an Ethereum blockchain explorer such as [etherscan.io](https://etherscan.io/).

Step 4. Scroll down and import the JSON file you received earlier. This will fill in a few details. Alternatively, you can manually fill in your transaction details. After that, paste the address you’re sending to and the amount you’d like to send.

![jetum_offline_screen5](https://user-images.githubusercontent.com/69245613/121161932-a7fd7080-c877-11eb-91cc-cbb00f4f02ff.png)

Step 5. If you’re sending to a contract, extra data may cause you to need a higher gas limit. Excess gas will be refunded, so don’t be afraid to raise it as high as 100,000.

Step 6. Click ‘Generate’, then copy the long string that says ‘Signed Transaction’ and paste it in a text file, or download a new JSON file holding your signed transaction’s details. Drag this text file or JSON file into your USB for the final step in the process.

![jetum_offline_screen6](https://user-images.githubusercontent.com/69245613/121162161-e3983a80-c877-11eb-80fc-4e3dfecfdafd.png)

### Sign and Send Your Transaction

Step 1. Back to your online computer, head to the Offline Helper tool again and enter the Signed Raw Transaction section. Do not delete address you are sending from in Generate Information section.

Step 2. Paste in your signed transaction, or upload the new JSON file you just received, then press ‘View Tx Details’.

![jetum_offline_screen7](https://user-images.githubusercontent.com/69245613/121162431-1e9a6e00-c878-11eb-9c42-6286b811823c.png)

Step 3. Double-check all your transaction details, then click ‘Send’.

Step 4. You’re done!  You’ve just sent an offline transaction. Your transaction will show on an Ethereum blockchain explorer once it’s been verified. It can be searched using the transaction hash shown at the end of the process.

![jetum_offline_screen8](https://user-images.githubusercontent.com/69245613/121162885-8650b900-c878-11eb-96e4-6fcae00968a7.png)

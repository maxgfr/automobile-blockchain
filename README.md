# automobile-blockchain

Blockchain for automobile use-case

## Launch the network in local

```shell
composer-rest-server -c admin@auto -n always -u true -w true
```

## Test the network

```shell
mkdir dist && composer archive create --sourceType dir --sourceName . -a ./dist/auto.bna && cd dist

composer network install --card PeerAdmin@hlfv1 --archiveFile auto.bna

composer network start --networkName auto --networkVersion 0.0.1 --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw

composer card import --file admin@auto.card

composer network ping --card admin@auto

composer-rest-server --card admin@auto
```

## Deploy to IBM Blockchain

### 1. Create a certification authority card

`ENROLLSECRET` is a field of this file : `connection-profile.json`

`connection-profile.json` has been downloaded from IBM Blockchain in the section presentation (connection profile)

```shell
cd dist && composer card create -f ca.card -p connection-profile.json -u admin -s ENROLLSECRET

composer card import -f ca.card -c ca

composer identity request --card ca --path ./credentials -u admin -s ENROLLSECRET
```

### 2. Add certificates to IBM blockchain

https://console.bluemix.net/docs/services/blockchain/develop_starter.html#etape-3-ajouter-les-certificats-l-instance-de-plan-starter

### 3. Create admin card

```shell
composer card create -f adminCard.card -p connection-profile.json -u admin -c ./credentials/admin-pub.pem -k ./credentials/admin-priv.pem --role PeerAdmin --role ChannelAdmin

composer card import -f adminCard.card -c adminCard
```

### 4. Install the network

```shell
composer network install -c adminCard -a auto.bna

composer network start -c adminCard -n auto -V 0.0.1 -A admin -C ./credentials/admin-pub.pem -f delete_me.card

rm delete_me.card

composer card create -n auto -p connection-profile.json -u admin -c ./credentials/admin-pub.pem -k ./credentials/admin-priv.pem

composer card import -f ./admin@auto.card

composer network ping -c admin@auto
```

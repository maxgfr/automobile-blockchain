# automobile-blockchain

Blockchain for automobile use-case

```shell
composer-rest-server -c admin@auto -n always -u true -w true
```

## To test the network the first time

```shell
mkdir dist && composer archive create --sourceType dir --sourceName . -a ./dist/auto.bna && cd dist

composer network install --card PeerAdmin@hlfv1 --archiveFile auto.bna

composer network start --networkName auto --networkVersion 0.0.1 --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw

composer card import --file admin@auto.card

composer network ping --card admin@auto

composer-rest-server --card admin@auto
```

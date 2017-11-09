# CAA-SERVER 

REST Server for Modelling and Publishing Vehicle/Device Pairing Data and an Angular Single Page Application to render the published data.

## Getting Started

```bash
# clone repo
git clone https://github.com/ravin-abraham/caa-server.git caa-server

# navigate to repo
cd caa-server

# install deps
npm install

# build front-end assets
npm run build

# Start backend
npm run serve
```

## Published REST API
The following are the published REST API to create, retrieve and update pairing data information.
# POST /pairsession

Initialize a new pairing session between the mobile device and the vehicle endpoint.

Request:
```
curl -H "Content-Type: application/json" -X POST -d '{ "pairing_device_ids": ["ford","nexus"] }' http://localhost:3001/api/pairsession | python -mjson.tool

Response:
[
    {
        "_id": "59fcd6526213191381828243",
        "last_updated_ts": "1509742324185",
        "pair_match_value": [],
        "pairing_device_ids": [
            "ford unique id",
            "nexus unique id"
        ],
        "raw_data_device": [],
        "raw_data_vehicle": []
    }
]
```


# GET /pairsession/id

Get details for the pair session referenced by id.

```
Request:
curl -X GET http://localhost:3001/api/pairsession/59fcd6526213191381828243 | python -m json.tool

Response:
[
    {
        "_id": "59fcd6526213191381828243",
        "last_updated_ts": "1509742324185",
        "pair_match_value": [],
        "pairing_device_ids": [
            "ford unique id",
            "nexus unique id"
        ],
        "raw_data_device": [],
        "raw_data_vehicle": []
    }
]
```

# GET /pairsession/latest

Get details for latest pair session.

```
Request:
curl -X GET http://localhost:3001/api/pairsession/latest | python -m json.tool

Response:
[
    {
        "_id": "59fcd6526d284298d323983d",
        "last_updated_ts": "15097429392839",
        "pair_match_value": [
 			{
                "1509742363957": 82
            }
        ],
        "pairing_device_ids": [
            "ford unique id",
            "nexus unique id"
        ],
        "raw_data_device": [],
        "raw_data_vehicle": []
    }
]
```

# PATCH /pairsession/id

Patch the pair session referenced by id with new pairing data. The patch semantics for the patch operation adhere to HTTP Patch specifications as described in RFC [6902](https://tools.ietf.org/html/rfc6902).

```
Request:
curl -H "Content-Type: application/json" -X PATCH -d '[{ "op" : "add", "path" : "/pair_match_value/-", "value" : 89 }]' http://localhost:3001/api/pairsession/59fcd6f4b98127139c0ddea2 

Response:
{
    "lastErrorObject": {
        "n": 1,
        "updatedExisting": true
    },
    "ok": 1,
    "value": {
        "_id": "59fcd6f4b98127139c0ddea2",
        "last_updated_ts": 1509742363957,
        "pair_match_value": [
            {
                "1509742363957": 82
            }
        ],
        "pairing_device_ids": [
            "ford unique id",
            "nexus unique id"
        ],
        "raw_data_device": [],
        "raw_data_vehicle": []
    }
}
```

## Front End
An Angular based frontend proof of concept is accessible at root url (e.g. http://localhost:3001/). Live data is updated in real time from the backend server for any updates for the latest active pair session.

![Alt text](/front_end_screenshot.png?raw=true "UI Prototype")

## Technologies
* [node](https://nodejs.org/en/)
* [express](http://expressjs.com/)
* [webpack](https://webpack.github.io/)
* [mongodb](https://www.mongodb.com/)
* [angular](https://angularjs.org/)
* [bootstrap](http://getbootstrap.com/)

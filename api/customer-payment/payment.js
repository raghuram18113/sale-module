var request = require('request');
var express = require('express');
var router = express.Router();
var config = require('config');

// gets the list of all the invoice that are having status opened of a company
router.get('/invoicelist/:cid', function(req, res) {
    var cid = req.params.cid;
    var options = { headers: {
        'Authorization': config.get('myob.accessToken'),
        'x-myobapi-version': config.get('myob.api-version')
    },
        url: config.get('myob.host') +"/AccountRight/"+cid+"/sale/CustomerPayment?format=json"
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            res.status(response.statusCode).send(body);
        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);

        }
    });
})

//gets total details of a invoice
router.get('/invoice/:cid/:id', function(req, res) {
    var cid = req.params.cid;
    var id = req.params.id;
    var options = { headers: {
        'Authorization': config.get('myob.accessToken'),
        'x-myobapi-version': config.get('myob.api-version')
    },
     url: config.get('myob.host') +"/AccountRight/"+cid+"/Sale/CustomerPayment/"+id+"?format=json"
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            res.status(response.statusCode).send(body);

        } else {
            res.status(response.statusCode).send(body);

        }
    });
})

router.post('/invoice/new/:cid', function(req, res) {
    var cid = req.params.cid;
    var requestBody = JSON.stringify(req.body);
    console.log("Request body: "+requestBody);
    var options = { headers: {
        'Authorization': config.get('myob.accessToken'),
        'x-myobapi-version': config.get('myob.api-version')
    },
        url: config.get('myob.host') +"/AccountRight/"+cid+"/Sale/CustomerPayment?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 201) {
            res.status(response.statusCode).send(body);
        } else {
            res.status(response.statusCode).send(body);
        }
    });
})

router.delete('/invoice/:cid/:id', function(req, res) {
    var id = req.params.id;
    var cid = req.params.cid;
    console.log("Request param id: "+id);
    var options = { headers: {
        'Authorization': config.get('myob.accessToken'),
        'x-myobapi-version': config.get('myob.api-version')
    },
       url: config.get('myob.host') +"/AccountRight/"+cid+"/Sale/CustomerPayment/"+id+"?format=json"
    }
    request.delete(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            res.status(response.statusCode).send(body);
        } else {
           res.status(response.statusCode).send(body);
        }
    });
})

module.exports=router;
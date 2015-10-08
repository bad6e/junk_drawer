;(function(){
    'use strict'
    let zMan = {}; //namespace!
    
    const querystring = require('querystring');
    const http = require('http');
    const NUMBER_OF_REQUESTS = 1;

    function sendRequest(word) {
        for(let i = 0; i < NUMBER_OF_REQUESTS; i++) {
            let count = 0;
            const postData = querystring.stringify({
                pageId: 'd3c82eaf-9c4f-41c6-8097-f119f676c0fc',
                pageVariant: 'i',
                first_name: '',
                email: i ? word + i + '@gmail.com' : word + '@gmail.com',
            })
            
            zMan.options.headers['Content-Length'] = postData.length;
        
            let req = http.request(zMan.options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    console.log('data: ', chunk)
                });
                res.on('end', function() {
                    console.log(res);
                    console.log('done with request ' + word + count++)
                });
            });
            
            req.write(postData);
            req.end();
        }
    }

    zMan.options = {
        hostname: 'www.commandiv.com',
        port: 80,
        path: 'fsg',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': 0,
        },
    }

    zMan.words = [
        'john.zettler',
    ];

    try {
        zMan.words.forEach(sendRequest);
    } catch (error) {
        console.error('Error: ', error);
    }
})();
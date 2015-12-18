var request = require('request'),
    moment = require('moment'),
    hmac_sha256 = require('crypto-js/hmac-sha256'),
    b64 = require('crypto-js/enc-base64');


var PAPI_VERSION = 2;

function spinitron(options) {
    this.station = options.station;
    this.userid = options.userid;
    this.secret = options.secret;
}

module.exports = spinitron;

spinitron.prototype.getSong = query('getSong');
spinitron.prototype.getSongs = query('getSongs');
spinitron.prototype.getCurrentPlaylist = query('getCurrentPlaylist');
spinitron.prototype.getPlaylistInfo = query('getPlaylistInfo');
spinitron.prototype.getPlaylistsInfo = query('getPlaylistsInfo');
spinitron.prototype.getShowInfo = query('getShowInfo');
spinitron.prototype.getRegularShowsInfo = query('getRegularShowsInfo');


spinitron.prototype._sendRequest = function(options, cb) {
    if (!options.station) options.station = this.station;
    options.papiuser = this.userid;
    options.timestamp = moment.utc().format('YYYY-MM-DD\\THH:mm:ss\\Z');
    options.papiversion = PAPI_VERSION;

    var api = this._sign(options, this.secret);

    request(api, function(error, response, body) {
        cb(error, body);
    });
};

spinitron.prototype.generateRequest = function(method, options) {
    if (!options) options = {};
    if (!options.station) options.station = this.station;
    options.papiuser = this.userid;
    options.timestamp = moment.utc().format('YYYY-MM-DD\\THH:mm:ss\\Z');
    options.papiversion = PAPI_VERSION;
    options.method = method;

    return this._sign(options, this.secret);
};

spinitron.prototype._sign = function (options, secret) {
    /* generate the signed secret */
    var sorted = sortObject(options);
    var query = [];
    sorted.forEach(function(value) {
        query.push(encodeURIComponent(value[0]) + '=' + 
                encodeURIComponent(value[1]));
    });
    query = query.join("&");
    
    var subject = "spinitron.com\n/public/spinpapi.php\n" + query;

    var signature = hmac_sha256(subject, secret);

    signature = b64.stringify(signature);

    signature = encodeURIComponent('signature') + '=' +
        encodeURIComponent(signature);

    return 'https://spinitron.com/public/spinpapi.php?' + 
        query + '&' + signature;
};

function query(method) {
    return function(options, cb) {
        if (typeof options === 'function') {
            cb = options;
            options = null;
        }
        if (!options) options = {};

        options.method = method;

        this._sendRequest(options, cb);
    };
}

function sortObject(o) {
    var a = [], i;
    for (i in o) {
        if (o.hasOwnProperty(i)) {
            a.push([i, o[i]]);
        }
    }
    a.sort(function(a, b) { return a[0] > b[0] ? 1 : -1; });
    return a;
}

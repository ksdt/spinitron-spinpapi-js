#spinpapi nodejs client ![](https://travis-ci.org/ksdt/spinitron.svg?branch=master)

javascript client for spinitron's SpinPapi API v2 https://spinitron.com/user-guide/pdf/SpinPapi-v2.pdf

##Usage

```javascript
var spinitron = require('spinitron');

spinitron = new spinitron({
                    station: 'ksdt',  /* optional */
                    userid: 'youruserid',
                    secret: 'yoursecret'
            });

spinitron.getRegularShowsInfo({ When: 'now' }, function (error, response) {
    console.log(response.results[0].ShowName); // => RTFM: CC Music
});
```

Sample response: 
```
> { request:
   { When: 'now',
     method: 'getRegularShowsInfo',
     papiuser: 'xxxxxxe687xxxxxx',
     papiversion: '2',
     station: 'ksdt',
     timestamp: '2015-12-18T18:48:07Z',
     signature: 'VUtBPMZra3Z4T7FeTByP8qsmrNvB7isb4QLdFnQf6oA=' },
  success: true,
  results:
   [ { ShowID: 529,
       ShowUsers: [Object],
       ShowName: 'bread&butter',
       Weekdays: [Object],
       OnairTime: '10:00:00',
       OffairTime: '11:00:00',
       Scheduled: true,
       ShowCategory: 'Music',
       ShowUrl: '',
       ShowImgL: [Object],
       ShowDescription: 'Getcha weekly Bread & Butter with ya host DJ toast. This show is great dont listen to what those other bagels say they just jealous' } ] }
```

##Methods

For an indepth description of the required options and the results, please visit the official API docs here: https://spinitron.com/user-guide/pdf/SpinPapi-v2.pdf

###`spinitron.getSong(options, callback);`

###`spinitron.getSongs(options, callback);`

###`spinitron.getCurrentPlaylist(options, callback);`

###`spinitron.getPlaylistInfo(options, callback);`

###`spinitron.getPlaylistsInfo(options, callback);`

###`spinitron.getShowInfo(options, callback);`

###`spinitron.getRegularShowsInfo(options, callback);`

###`spinitron.generateRequest(method, options);`

This function will return the request URL for the given method and options. For example, `spinitron.generateRequest('getSong', {SongId: 3});` will return the SpinPapi API Url for this request.

##Optional Parameters
When a method has optional parameters, you may choose to omit the options parameter, like so `spinitron.getSong(callback)`

##Testing, Contributing
`mocha` to test. Pull requests welcome. 

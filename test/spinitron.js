var spinitron = require('../lib/spinitron'),
    validurl = require('valid-url'),
    should = require('should');

describe('spinpapi', function() {
    describe('#_sign()', function (){
        it('should correctly produce a signed spinpapi url', function(done) {
           spinitron = new spinitron({
               station: 'ksdt',
               userid: 'testing',
               secret: 'testing'
           }); 
           var request = spinitron.generateRequest('getSong', {songId: 2});
           should.exist(request);
           should.exist(validurl.isUri(request));
           done();
        });
    });
});

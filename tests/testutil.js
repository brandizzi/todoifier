var DEFAULT_MESSAGE = 'Assertion failed';

var assert = function assert(condition, message) {
    if (!condition) {
        if (typeof message == 'undefined') {
            message = DEFAULT_MESSAGE;
        }

        throw new Error(message);
    }
};

var TestRunner = function TestRunner(suite) {
    this._suite = suite;
    this._init();
};

TestRunner.prototype = {
    _init: function() {
        this.failCount = 0;
        this.passCount = 0;
        this.errors = {};
    },

    run: function() {
        var suite = this._suite;
        this._init();

        for (var test in suite) {
            if (test.indexOf('test') === 0) {
                try {
                    suite[test]();
                    this.passCount++;
                } catch (e) {
                    this.errors[test] = e;
                    this.failCount++;
                }
            }
        }

        return this;
    }
};


var assertsTest = {

    testAssertPass: function() {
        assert(true);
    },

    testAssertFail: function() {
        try {
            assert(false);
            throw Error('failed');
        } catch (e) {
            return;
        };
        throw Error('failed');
    },

};

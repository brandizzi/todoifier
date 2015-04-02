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

var displayTestRunner = function displayTestRunner(testRunner) {
    var p = document.createElement('div');

    var passes = document.createElement('p');
    passes.appendChild(
        document.createTextNode('Passes: ' + testRunner.passCount)
    );
    p.appendChild(passes);

    var fails = document.createElement('p');
    fails.appendChild(
        document.createTextNode('Fails: ' + testRunner.failCount)
    );
    p.appendChild(fails);

    if (testRunner.errors) {
        var errors = document.createElement('p');
        errors.appendChild(
            document.createTextNode('Errors: ' + testRunner.passCount)
        );

        var errorsList = document.createElement('ul');

        for (var k in testRunner.errors) {
            var error = testRunner.errors[k];
            var errorItem = document.createElement('li');

            errorItem.appendChild(
                document.createTextNode(
                    'Message: ' + error.message + ' (line '
                    + error.lineNumber + ')'
                )
            );
            errorsList.appendChild(errorItem);
        }

        errors.appendChild(errorsList);
        p.appendChild(errors);
    }

    return p;
}


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

var testRunnerTest = {

    testCountPasses: function() {
        var runner = new TestRunner({
            testPass: function() { assert(true) }
        });
        runner.run();

        assert(runner.passCount === 1);
        assert(runner.failCount === 0);
    },

    testCountFails: function() {
        var runner = new TestRunner({
            testFail: function() { assert(false) }
        });
        runner.run();

        assert(runner.passCount === 0);
        assert(runner.failCount === 1);
    },

    testCountPassesAndFails: function() {
        var runner = new TestRunner({
            testPass: function() { assert(true) },
            testFail: function() { assert(false) }
        });
        runner.run();

        assert(runner.passCount === 1);
        assert(runner.failCount === 1);
    },

    testSaveDefaultMessage: function() {
        var runner = new TestRunner({
            testDefaultMessage: function() { assert(false) }
        });
        runner.run();

        assert(
            runner.errors['testDefaultMessage'].message === DEFAULT_MESSAGE,
            'Does not show default message'
        );
    },

    testSaveCustomtMessage: function() {
        var runner = new TestRunner({
            testCustomMessage: function() { assert(false, 'Custom message') }
        });
        runner.run();

        assert(
            runner.errors['testCustomMessage'].message === 'Custom message',
            'Does not show custom message'
        );
    },

    testReturnSelf: function() {
        var runner = new TestRunner({
            testPass: function() { assert(true) }
        });
        var r = runner.run();

        assert(r === runner);
    },
}

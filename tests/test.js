var tests = {

    testCallRowExtractor: function() {
        var todoifier = new Todoifier({
            sourceElement: document.getElementById('content'),
            rowExtractor: function(src) {
                return src.getElementsByTagName('tr');
            }
        });

        assert(todoifier.tasks.length === 3);
    }

};

window.onload = function() {
    var testRunner = new TestRunner(tests);
    testRunner.run();
    document.body.appendChild(displayTestRunner(testRunner));
    console.log('lol');
}



var tests = {
};

window.onload = function() {
    var testRunner = new TestRunner(tests);
    testRunner.run();
    document.body.appendChild(displayTestRunner(testRunner));
    console.log('lol');
}



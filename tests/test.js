var tests = {

    testRowExtractor: function() {
        var todoifier = new Todoifier({
            sourceElement: document.getElementById('content'),
            rowExtractor: function(src) {
                return src.getElementsByTagName('tr');
            }
        });

        assert(todoifier.tasks.length === 3);
    },

    testTaskExtractor: function() {
        var todoifier = new Todoifier({
            sourceElement: document.getElementById('content'),
            rowExtractor: function(src) {
                return src.getElementsByTagName('tr');
            },
            taskExtractor: function(rowNode) {
                var tds = rowNode.getElementsByTagName('td');
                return {
                    description: tds.item(1).innerHTML,
                    assignedTo: tds.item(2).innerHTML
                };
            }
        });

        var task = todoifier.tasks[0];
        assert(task.description === 'Write test document');
        assert(task.assignedTo === 'Alice');

        task = todoifier.tasks[1];
        assert(task.description === 'Write test case');
        assert(task.assignedTo === 'Bob');

        task = todoifier.tasks[2];
        assert(task.description === 'Make test pass');
        assert(task.assignedTo === 'Eve');
    }

};

window.onload = function() {
    var testRunner = new TestRunner(tests);
    testRunner.run();
    document.body.appendChild(displayTestRunner(testRunner));
}



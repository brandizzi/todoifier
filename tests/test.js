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
    },

    testTaskNodes: function() {
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
            },
            template: '<span class="d">{description}</span>'
                + '<span class="aT">{assignedTo}</span>'
        });

        var taskNodes = todoifier.getTaskNodes();
        var taskNode = taskNodes[0];
        var descriptionNode = taskNode.getElementsByClassName('d').item(0);
        var assignedToNode = taskNode.getElementsByClassName('aT').item(0);
        assert(descriptionNode.innerHTML == 'Write test document');
        assert(assignedToNode.innerHTML === 'Alice');

        taskNode = taskNodes[1];
        descriptionNode = taskNode.getElementsByClassName('d').item(0);
        assignedToNode = taskNode.getElementsByClassName('aT').item(0);
        assert(descriptionNode.innerHTML == 'Write test case');
        assert(assignedToNode.innerHTML === 'Bob');

        taskNode = taskNodes[2];
        descriptionNode = taskNode.getElementsByClassName('d').item(0);
        assignedToNode = taskNode.getElementsByClassName('aT').item(0);
        assert(descriptionNode.innerHTML == 'Make test pass');
        assert(assignedToNode.innerHTML === 'Eve');
    }

};

window.onload = function() {
    var testRunner = new TestRunner(tests);
    testRunner.run();
    document.body.appendChild(displayTestRunner(testRunner));
}



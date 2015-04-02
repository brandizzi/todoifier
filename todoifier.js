var Todoifier = function Todoifier(config) {
    this.config = {
        rowExtractor: function() {
            return [];
        },
        taskExtractor: function() {
            return {};
        },
        sourceElement: document,
        template: ''
    };

    for (var k in config) {
        this.config[k] = config[k];
    }
    this.tasks = [];

    var rows = this.config.rowExtractor(this.config.sourceElement);
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        this.tasks.push(this.config.taskExtractor(row));
    }
};

Todoifier.prototype.getTaskNodes = function() {
    var nodes = [];
    for (var i = 0; i < this.tasks.length; i++) {
        var task = this.tasks[i];
        var src = this.config.template;
        for (var k in task) {
            src = src.replace('{'+k+'}', task[k]);
        }
        var div = document.createElement('div');
        div.setAttribute('class', 'todoifier-task');
        div.innerHTML = src;
        nodes.push(div);
    }
    return nodes;
}

var Todoifier = function Todoifier(config) {
    this.config = {
        rowExtractor: function() {
            return [];
        },
        taskExtractor: function() {
            return {};
        },
        sourceElement: document
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

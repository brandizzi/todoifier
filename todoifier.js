var Todoifier = function Todoifier(config) {
    this.config = config;
    this.tasks = this.config.rowExtractor(this.config.sourceElement);
};

System.register([], function(exports_1) {
    var ToDo;
    return {
        setters:[],
        execute: function() {
            // ToDo class
            ToDo = (function () {
                function ToDo(id, description, status, creationDate, modificationDate, endDate) {
                    this.id = id;
                    this.description = description;
                    this.status = status;
                    this.creationDate = creationDate;
                    this.modificationDate = modificationDate;
                    this.endDate = endDate;
                }
                return ToDo;
            })();
            exports_1("ToDo", ToDo); // export class ToDo
        }
    }
});
//# sourceMappingURL=todo.js.map
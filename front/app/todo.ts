// ToDo class
export class ToDo {

    constructor(
        public id:string,
        public description:string,
        public status?:string,
        public creationDate?:Date,
        public modificationDate?:Date,
        public endDate?:Date
    ) { }

} // export class ToDo

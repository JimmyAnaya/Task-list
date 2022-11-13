export class Task{

    static fromJson({ id, description, complete, created}){

        const temTask = new Task(description);

        temTask.id          = id;
        temTask.complete    = complete;
        temTask.created     = created;

        return temTask;

    }

    constructor( task ) {
        this.description= task;
        this.id         = new Date().getTime();
        this.complete   = false;
        this.created    = new Date();
    }

    printClass(){
        console.log(`${ this.description } - ${ this.id}` );
    }
}
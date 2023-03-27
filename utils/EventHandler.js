const { EventEmitter } = require('node:events')

class EventHandler extends EventEmitter{

    instance = null;

    //SINGLETON
    static CreateInstance(){
        if (!this.instance)
            this.instance = new EventHandler();
        return this.instance;
    }

    static CreateEvent(eventName, callback){
        this.instance = EventHandler.CreateInstance();
        this.instance.on(eventName, callback);
        
    }

    static RunEvent(eventName, params = []){
        this.instance = EventHandler.CreateInstance();

        this.instance.emit(eventName, params.join(','))
    }
}

module.exports = {EventHandler};
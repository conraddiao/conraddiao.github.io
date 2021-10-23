declare class EventsBus {
    events: {
        [key: string]: Array<Function>;
    };
    constructor();
    on(eventName: string, callBack: Function): void;
    emit(eventName: string): void;
}
declare const eventsBus: EventsBus;
export default eventsBus;

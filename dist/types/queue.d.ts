import * as Types from './types';
declare class ModelQueue implements Types.ModelQueue {
    queue: Types.queue;
    private priorities;
    constructor(item?: Types.signal | Types.signal[], time?: number | number[]);
    push(item: Types.signal, time: number): void;
    pop(): Types.retTable;
    isEmpty(): boolean;
}
export { ModelQueue };

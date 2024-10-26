import * as Types from './types';
import * as lle from '@ldamle/lle';

class ModelQueue implements Types.ModelQueue {
    queue: Types.queue = {};
    private priorities: number[] = [];

    constructor(item?: Types.signal | Types.signal[], time?: number | number[]) {
        if (item instanceof Array && time instanceof Array) {
            item.forEach((i, ind) => this.push(i, time[ind]));
        } else if (item && time) {
            this.push(item as Types.signal, time as number);
        }
    }

    public push(item: Types.signal, time: number): void {
        if (!this.queue[time]) {
            this.queue[time] = [];
            let inserted = false;
            for (let i = this.priorities.length - 1; i >= 0; i--) {
                if (this.priorities[i] < time) {
                    this.priorities.splice(i + 1, 0, time);
                    inserted = true;
                    break;
                }
            }
            if (!inserted) {
                this.priorities.unshift(time);
            }
        }
        this.queue[time].push(item);
    }
    

    public pop(): Types.retTable {
        if (this.isEmpty()) {
            return undefined;
        }
        const highestPriority = this.priorities[0];
        const item = this.queue[highestPriority].shift();
        if (this.queue[highestPriority].length === 0) {
            delete this.queue[highestPriority];
            this.priorities.shift();
        }
        if (item) {
            return {time: highestPriority, signal: item};
        } 
        return undefined;
    }

    public isEmpty(): boolean {
        return this.priorities.length === 0;
    }
}

export {ModelQueue};

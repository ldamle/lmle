import * as lle from '@ldamle/lle';

type signal = {
    element: lle.Types.Interface.Element;
    no_source: number;
    signal: lle.Types.signal.it;
};

type queue = {
    [key: number]: signal[];
};

type retTable = {time: number; signal: signal} | undefined;

interface ModelQueue {
    queue: queue;
    push(item: signal, priority: number): void;
    pop(): retTable;
    isEmpty(): boolean;
}

export type {signal, queue, ModelQueue, retTable};

import * as Types from './types';
import {ModelQueue} from './queue';
import * as lle from '@ldamle/lle';

class Model {
    queue: Types.ModelQueue;
    graph: lle.Types.Interface.ElementGraph;
    lastTime: number;

    constructor(
        arg1: lle.Types.Interface.ElementGraph | lle.Types.Interface.Element,
        lastTime: number,
        optimizeTet = true
    ) {
        function isElement(arg: any): arg is Element {
            return typeof arg.name === 'string';
        }
        if (isElement(arg1)) {
            this.graph = new lle.ElementGraph(arg1 as lle.Types.Interface.Element);
        } else {
            this.graph = arg1 as lle.Types.Interface.ElementGraph;
        }
        this.lastTime = lastTime;
        this.queue = new ModelQueue();
        this.modelGenerators();
        this.runModel();
        if (optimizeTet) this.optimizeTetModel();
    }

    modelGenerators() {
        this.graph.tree.forEach((elementTree) => {
            let t = 0;
            let s = 1 as lle.Types.signal.it;
            let sw = 1 / (2 * (elementTree.element.frequency as number));
            if (elementTree.element.out_connections[0].in) {
                while (t <= this.lastTime) {
                    s = (s === 1 ? 0 : 1) as lle.Types.signal.it;
                    elementTree.element.out_connections[0].state = s;
                    elementTree.element.out_connections[0].in.forEach((i) => {
                        this.queue.push(
                            {
                                element: i.element,
                                no_source: i.no_source,
                                signal: s
                            },
                            t
                        );
                    });
                    this.tetElementOut(elementTree.element, 0, t);
                    t += sw;
                }
            }
        });
    }

    pushConnection(connection: lle.Types.Interface.Connection, time: number, delay: number) {
        let signal = connection.state;
        this.tetElementOut(connection.out.element, connection.out.no_source, time + delay);
        if (connection.in) {
            connection.in.forEach((inElement) => {
                this.queue.push(
                    {
                        element: inElement.element,
                        no_source: inElement.no_source,
                        signal: signal
                    },
                    time + delay
                );
            });
        }
    }

    pushTet(element: lle.Types.Interface.Element, stet: lle.Types.signal.time) {
        if (element.props['tet']) {
            let fl = true;
            for (let i = element.props.tet.length - 1; i >= 0; i--) {
                const tet = element.props.tet[i];
                if (tet.time < stet.time) {
                    fl = false;
                    element.props.tet.splice(i + 1, 0, stet);
                    break;
                } else if (tet.time === stet.time) {
                    fl = false;
                    element.props.tet[i] = stet;
                    break;
                }
            }
            if (fl) {
                element.props.tet.unshift(stet);
            }
        } else {
            element.props['tet'] = [stet];
        }
    }

    tetElementOut(element: lle.Types.Interface.Element, no_source: number, time: number) {
        let nowState: lle.Types.signal.array;
        if (element.state) {
            nowState = element.state(element.inStateArray());
            nowState =
                nowState.substring(0, no_source) +
                (element.out_connections[no_source].state as lle.Types.signal.array) +
                nowState.substring(no_source + 1);
        } else {
            nowState = element.out_connections[no_source].state as lle.Types.signal.array;
        }
        this.pushTet(element, {
            time: time,
            state: nowState
        });
    }

    runModel() {
        while (!this.queue.isEmpty()) {
            let now: Types.retTable = this.queue.pop();
            if (now && now.time <= this.lastTime) {
                if (
                    now.signal.element.in_connections &&
                    typeof now.signal.element.in_connections[now.signal.no_source] !== 'string' &&
                    now.signal.element.state
                ) {
                    let conn = now.signal.element.in_connections[
                        now.signal.no_source
                    ] as lle.Types.Interface.Connection;
                    conn.state = now.signal.signal;
                    let states = now.signal.element.state(now.signal.element.inStateArray());
                    now.signal.element.out_connections.forEach((outConn, c) => {
                        outConn.state = states[c] as lle.Types.signal.it;
                        this.pushConnection(outConn, now.time, now.signal.element.delay[c]);
                    });
                }
            }
        }
    }

    optimizeTetModel() {
        this.graph.getAllElementsDFS().forEach((elem) => {
            if (elem.props.tet) {
                elem.props['tet'] = this.optimizeTet(elem.props.tet);
            }
        });
    }

    optimizeTet(tet: lle.Types.signal.timeTable) {
        let newtetOut: lle.Types.signal.timeTable = [];
        for (let i = tet.length - 1; i >= 0; i--) {
            let thistet = tet[i];
            thistet.time = parseFloat(thistet.time.toFixed(14));
            if (newtetOut.length > 0) {
                let last = newtetOut[0];
                if (last.time !== thistet.time) {
                    if (thistet.state === last.state) {
                        newtetOut[0].time = thistet.time;
                    } else {
                        newtetOut.unshift(thistet);
                    }
                }
            } else {
                newtetOut.unshift(thistet);
            }
        }
        return newtetOut;
    }

    exportConnection(conn: lle.Types.Interface.Connection): lle.Types.signal.timeTable {
        let res: lle.Types.signal.timeTable = [];
        if (conn.out.element.props['tet']) {
            conn.out.element.props.tet.forEach((t: lle.Types.signal.time) => {
                res.push({
                    time: t.time,
                    state: t.state[conn.out.no_source]
                });
            });
        }
        return this.optimizeTet(res);
    }
}

export {Model};

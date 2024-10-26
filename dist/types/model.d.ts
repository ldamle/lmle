import * as Types from './types';
import * as lle from '@ldamle/lle';
declare class Model {
    queue: Types.ModelQueue;
    graph: lle.Types.Interface.ElementGraph;
    lastTime: number;
    constructor(arg1: lle.Types.Interface.ElementGraph | lle.Types.Interface.Element, lastTime: number, optimizeTet?: boolean);
    modelGenerators(): void;
    pushConnection(connection: lle.Types.Interface.Connection, time: number, delay: number): void;
    pushTet(element: lle.Types.Interface.Element, stet: lle.Types.signal.time): void;
    tetElementOut(element: lle.Types.Interface.Element, no_source: number, time: number): void;
    runModel(): void;
    optimizeTetModel(): void;
    optimizeTet(tet: lle.Types.signal.timeTable): lle.Types.signal.timeTable;
    exportConnection(conn: lle.Types.Interface.Connection): lle.Types.signal.timeTable;
}
export { Model };

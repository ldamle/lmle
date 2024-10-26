import * as Types from './types';
import {Connection} from './controller/connection';

const Factories = {
    Connection: new Types.Factories.ConnectionFactory<Connection>(Connection)
};

export {Factories};

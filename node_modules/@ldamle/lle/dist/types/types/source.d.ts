import * as Types from '../types';
/**
 * * Определение входа/выхода для соединения
 */
type it = {
    name: string;
    element: Types.Interface.Element;
    no_source: number;
    is_out: boolean;
    delay?: number;
};
/**
 * * Массив входов/выходов для соединения
 */
type array = it[];
export { it, array };

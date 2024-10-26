import * as Types from '../../types';
/**
 *
 * @param array
 * @param elem
 */
declare function getFuncElement(array: Types.signal.detailStateArray, elem: Types.Interface.Element): Types.signal.func;
/**
 * Генерирует состояние на выходах элемента.
 * Про состояния подробнее см. {@link Types.signal.detailStateArray}
 * @param array Массив сигналов.
 * @param inLen
 * @param outLen
 * @param inNameArr
 * @returns Обновленный массив состояний.
 */
declare function getFunc(array: Types.signal.detailStateArray, inLen: number, outLen: number, inNameArr?: string[]): Types.signal.func;
export { getFunc, getFuncElement };

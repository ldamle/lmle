import * as Types from '../../types';
interface Connection {
    in: Types.source.array | false;
    readonly out: Types.source.it;
    state: Types.signal.it;
    style: Types.style.connection;
    /**
     * Подключает соединение ко входу
     * @param inSource Вход соединения
     * @returns Соединение
     */
    inConnect(inSource: Types.source.it): Connection;
    /**
     * Отключает соединение от входа
     * @param inSource Вход соединения
     * @returns Соединение
     */
    disConnect(inSource: Types.source.it): Connection;
    /**
     * Подключает соединение ко множеству входов
     * @param inSourceArray Массив входов соединения
     * @returns Соединение
     */
    inConnects(inSourceArray: Types.source.array): Connection;
    /**
     * Отключает соединение от множественных входов
     * @param inSourceArray Массив входов соединения
     * @returns Соединение
     */
    disConnects(inSourceArray: Types.source.array): Connection;
    lenInConnected(): number;
    /**
     * Клонирует текущее соединение с новыми элементами
     * @param element Элемент, к которому будет подключено новое соединение
     * @returns Новое соединение с клонированными входами
     */
    clone(element: Types.Interface.Element): Connection;
    getArrayInString(): string[];
    /**
     * Находит строковое представление входа по элементу
     * @param element Элемент, для которого нужно найти подключенный вход
     * @returns Название входа
     */
    findInString(element: Types.Interface.Element): string;
    /**
     * Находит вход, который принадлежит указанному элементу.
     * @param element элемент, для которого нужно найти подключенный вход
     * @returns вход
     */
    findInSource(element: Types.Interface.Element): Types.source.it;
    isConnected(): boolean;
}
export { Connection };

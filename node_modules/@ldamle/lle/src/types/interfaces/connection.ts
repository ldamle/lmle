import * as Types from '../../types';

interface Connection {
    // Массив подключенных входов или false, если входы отсутствуют
    in: Types.source.array | false;

    // Выход соединения (только для чтения)
    readonly out: Types.source.it;

    // Текущий сигнал соединения
    state: Types.signal.it;

    // Стили текущего соединения
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

    // Возвращает количество подключенных входов
    lenInConnected(): number;

    /**
     * Клонирует текущее соединение с новыми элементами
     * @param element Элемент, к которому будет подключено новое соединение
     * @returns Новое соединение с клонированными входами
     */
    clone(element: Types.Interface.Element): Connection;

    // Возвращает массив входов в виде строковых значений
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

    // Проверяет, подключено ли соединение хотя бы к одному входу
    isConnected(): boolean;
}

export {Connection};

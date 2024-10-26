import * as Types from '../types';
/**
 * Класс `Connection` позволяет соединять входы и выходы различных элементов.
 * Соединение всегда имеет обязательный выход, а входы могут быть
 * как отсутствовать, так и быть в единственном или множественном числе.
 */
declare class Connection implements Types.Interface.Connection {
    /**
     * * Массив подключенных входов или false, если входы отсутствуют
     */
    in: Types.source.array | false;
    /**
     * * Выход соединения (только для чтения)
     */
    readonly out: Types.source.it;
    /**
     * * Текущий сигнал соединения
     */
    state: Types.signal.it;
    style: Types.style.connection;
    /**
     * Создает новое соединение с подключением только выхода,
     * оставляя вход свободным.
     * @param outSource выход соединения
     */
    constructor(outSource: Types.source.it);
    /**
     * Создает новое соединение с одним выходом и одним входом.
     * @param outSource выход соединения
     * @param inSource вход соединения
     */
    constructor(outSource: Types.source.it, inSource: Types.source.it);
    /**
     * Создает новое соединение с одним выходом и несколькими входами.
     * @param outSource выход соединения
     * @param inSourceArray массив входов соединения
     */
    constructor(outSource: Types.source.it, inSourceArray: Types.source.array);
    /**
     * Создает новое соединение и его состояние с одним выходом и одним входом.
     * @param outSource выход соединения
     * @param inSource вход соединения
     * @param state Текущее состояние элемента
     */
    constructor(outSource: Types.source.it, inSource: Types.source.it, state: Types.signal.it);
    /**
     * Создает новое соединение и его состояние с одним выходом и несколькими входами.
     * @param outSource выход соединения
     * @param inSourceArray массив входов соединения
     * @param state Текущее состояние элемента
     */
    constructor(outSource: Types.source.it, inSourceArray: Types.source.array, state: Types.signal.it);
    /**
     * Подключает вход другого элемента к текущему соединению.
     * @param inSource вход элемента
     * @returns текущее соединение
     */
    inConnect(inSource: Types.source.it): Connection;
    /**
     * Отключает вход от текущего соединения.
     * @param inSource вход, который нужно отсоединить
     * @returns текущее соединение
     */
    disConnect(inSource: Types.source.it): Connection;
    /**
     * Подключает несколько входов к текущему соединению.
     * @param inSourceArray массив входов
     * @returns текущее соединение
     */
    inConnects(inSourceArray: Types.source.array): Connection;
    /**
     * Отключает несколько входов от текущего соединения.
     * @param inSourceArray массив входов, которые нужно отсоединить
     * @returns текущее соединение
     */
    disConnects(inSourceArray: Types.source.array): Connection;
    /**
     * Проверяет, подключено ли текущее соединение хотя бы к одному входу.
     * @returns true, если подключен хотя бы один вход
     */
    isConnected(): boolean;
    /**
     * Возвращает количество подключенных входов.
     * @returns количество входов
     */
    lenInConnected(): number;
    /**
     * Клонирует текущее соединение, создавая новое с такими же входами,
     * но подключенное к другому элементу.
     * @param element элемент, к которому подключен выход нового соединения
     * @returns новое соединение с клонированными входами
     */
    clone(element: Types.Interface.Element): Connection;
    /**
     * Возвращает массив имен входов, подключенных к текущему соединению.
     * @returns массив строк с именами входов
     */
    getArrayInString(): string[];
    /**
     * Находит вход, который принадлежит указанному элементу.
     * @param element элемент, для которого нужно найти подключенный вход
     * @returns название входа
     */
    findInString(element: Types.Interface.Element): string;
    /**
     * Находит вход, который принадлежит указанному элементу.
     * @param element элемент, для которого нужно найти подключенный вход
     * @returns вход
     */
    findInSource(element: Types.Interface.Element): Types.source.it;
}
export { Connection };

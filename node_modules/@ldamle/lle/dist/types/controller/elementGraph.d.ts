import * as Types from '../types';
/**
 * Класс, представляющий граф элементов. Он строит и обрабатывает граф на основе заданного элемента.
 * Граф элементов может быть использован для обхода, поиска элементов и анализа соединений.
 */
declare class ElementGraph implements Types.Interface.ElementGraph {
    /**
     * Массив нод, представляющий граф элементов.
     */
    tree: Types.elementGraph.node[];
    /**
     * Конструктор, инициализирующий граф и генерирующий его на основе начального элемента.
     * @param pointElement Элемент, с которого начинается генерация графа.
     */
    constructor(pointElement: Types.Interface.Element);
    /**
     * Генерирует граф элементов, начиная с указанного элемента.
     * @param pointElement Элемент, с которого начинается генерация графа.
     */
    genGraph(pointElement: Types.Interface.Element): void;
    /**
     * Рекурсивно ищет генераторы (начальные элементы) в графе и строит дерево элементов.
     * @param pointElement Элемент, с которого начинается поиск.
     * @param set Множество элементов, уже обработанных для предотвращения циклов.
     * @returns Массив нод графа.
     */
    private findGenerators;
    /**
     * Генерирует ноды графа и их связи.
     * @param node Текущая нода для обработки.
     * @param arregn Массив уже обработанных нод для предотвращения повторов.
     */
    private genGraphNode;
    /**
     * Находит элемент в графе.
     * @param pointElement Элемент для поиска.
     * @returns Нода графа с указанным элементом или `false`, если элемент не найден.
     */
    findElement(pointElement: Types.Interface.Element): Types.elementGraph.node | false;
    /**
     * Рекурсивно находит элемент в графе.
     * @param pointElement Элемент для поиска.
     * @param firstNode Нода, с которой начинается поиск.
     * @returns Нода графа с указанным элементом или `false`, если элемент не найден.
     */
    private findElementNode;
    /**
     * Получаем массив элементов из элементов нод
     * @param na элементы нод
     * @returns массив элементов
     */
    private getElementArrayFromNodeArray;
    /**
     * Возвращает массив выходов, которые ни к чему не подключены.
     * @returns Массив соединений.
     */
    getOutputs(): Types.Interface.Connection[];
    /**
     * Возвращает массив входов, которые ни к чему не подключены.
     * @returns Массив соединений.
     */
    getInputs(): Types.source.array;
    /**
     * Возвращает массив генераторов графа.
     * @returns Массив генераторов (начальных элементов).
     */
    getGenerators(): Types.Interface.Element[];
    /**
     * Возвращает обход графа в глубину.
     * @returns Массив элементов графа.
     */
    getAllElementsDFS(): Types.Interface.Element[];
    /**
     * Возвращает обход графа в ширину.
     * @returns Массив элементов графа.
     */
    getAllElementsBFS(): Types.Interface.Element[];
    /**
     * Возвращает массив всех нод в глубину.
     * @returns Массив нод графа.
     */
    getAllNodeDFS(): Types.elementGraph.node[];
    /**
     * Рекурсивно обходит граф в глубину.
     * @param node Нода для обработки.
     * @param ret Массив результата обхода.
     */
    private DFSrec;
    /**
     * Находит все соединения, к которым подключена данная нода
     * @param node Данная нода
     * @returns Массив соединений
     */
    getConnectionsNode(node: Types.elementGraph.node): Types.Interface.Connection[];
    /**
     * Возвращает массив всех нод в ширину.
     * @returns Массив нод графа.
     */
    getAllNodeBFS(): Types.elementGraph.node[];
    /**
     * Возвращает уникальные ноды графа после обхода в глубину.
     * @returns Массив уникальных нод графа.
     */
    getSetNodeDFS(): Types.elementGraph.node[];
    /**
     * Экспортирует граф для фронта
     * @returns Экспортированный граф
     */
    getDataElementGraph(): Types.server.elementGraph;
    /**
     * Рекурсивно обходим граф в глубину
     * @param node
     * @param ret
     * @param elems
     */
    private recExportElementGraph;
}
export { ElementGraph };

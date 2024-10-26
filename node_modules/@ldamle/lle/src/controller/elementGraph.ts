import * as Types from '../types';

/**
 * Класс, представляющий граф элементов. Он строит и обрабатывает граф на основе заданного элемента.
 * Граф элементов может быть использован для обхода, поиска элементов и анализа соединений.
 */
class ElementGraph implements Types.Interface.ElementGraph {
    /**
     * Массив нод, представляющий граф элементов.
     */
    tree: Types.elementGraph.node[];

    /**
     * Конструктор, инициализирующий граф и генерирующий его на основе начального элемента.
     * @param pointElement Элемент, с которого начинается генерация графа.
     */
    constructor(pointElement: Types.Interface.Element) {
        this.tree = [];
        this.genGraph(pointElement);
    }

    /**
     * Генерирует граф элементов, начиная с указанного элемента.
     * @param pointElement Элемент, с которого начинается генерация графа.
     */
    genGraph(pointElement: Types.Interface.Element): void {
        const set = new Set<Types.Interface.Element>();
        this.findGenerators(pointElement, set);
        const arregn: Types.elementGraph.node[] = [];
        for (let i = 0; i < this.tree.length; i++) {
            this.genGraphNode(this.tree[i], arregn);
        }
    }

    /**
     * Рекурсивно ищет генераторы (начальные элементы) в графе и строит дерево элементов.
     * @param pointElement Элемент, с которого начинается поиск.
     * @param set Множество элементов, уже обработанных для предотвращения циклов.
     * @returns Массив нод графа.
     */
    private findGenerators(
        pointElement: Types.Interface.Element,
        set: Set<Types.Interface.Element>
    ): Types.elementGraph.node[] {
        set.add(pointElement);
        if (pointElement.in_connections !== undefined) {
            for (let i = 0; i < pointElement.in_connections.length; i++) {
                if (typeof pointElement.in_connections[i] !== 'string') {
                    const elem = (pointElement.in_connections[i] as Types.Interface.Connection).out
                        .element;
                    if (!set.has(elem)) {
                        this.findGenerators(elem, set);
                    }
                }
            }
            for (let i = 0; i < pointElement.out_connections.length; i++) {
                if (pointElement.out_connections[i].in) {
                    for (
                        let j = 0;
                        j < (pointElement.out_connections[i].in as Types.source.array).length;
                        j++
                    ) {
                        const elem = (pointElement.out_connections[i].in as Types.source.array)[j]
                            .element;
                        if (!set.has(elem)) {
                            this.findGenerators(elem, set);
                        }
                    }
                }
            }
        } else {
            this.tree.push({element: pointElement, connection: [], out: []});
        }
        return this.tree;
    }

    /**
     * Генерирует ноды графа и их связи.
     * @param node Текущая нода для обработки.
     * @param arregn Массив уже обработанных нод для предотвращения повторов.
     */
    private genGraphNode(node: Types.elementGraph.node, arregn: Types.elementGraph.node[]) {
        const pointElement = node.element;
        for (let j = 0; j < pointElement.out_connections.length; j++) {
            if (pointElement.out_connections[j].in) {
                for (
                    let k = 0;
                    k < (pointElement.out_connections[j].in as Types.source.array).length;
                    k++
                ) {
                    const elem = (pointElement.out_connections[j].in as Types.source.array)[k]
                        .element;
                    const egn = arregn.find((el) => el.element === elem);
                    if (!egn) {
                        const newNode = {
                            element: elem,
                            connection: [pointElement.out_connections[j]],
                            out: []
                        };
                        node.out.push(newNode);
                        arregn.push(newNode);
                        this.genGraphNode(newNode, arregn);
                    } else {
                        egn.connection.push(pointElement.out_connections[j]);
                        node.out.push(egn);
                    }
                }
            }
        }
    }

    /**
     * Находит элемент в графе.
     * @param pointElement Элемент для поиска.
     * @returns Нода графа с указанным элементом или `false`, если элемент не найден.
     */
    findElement(pointElement: Types.Interface.Element): Types.elementGraph.node | false {
        for (let i = 0; i < this.tree.length; i++) {
            const e = this.findElementNode(pointElement, this.tree[i]);
            if (e) {
                return e;
            }
        }
        return false;
    }

    /**
     * Рекурсивно находит элемент в графе.
     * @param pointElement Элемент для поиска.
     * @param firstNode Нода, с которой начинается поиск.
     * @returns Нода графа с указанным элементом или `false`, если элемент не найден.
     */
    private findElementNode(
        pointElement: Types.Interface.Element,
        firstNode: Types.elementGraph.node
    ): Types.elementGraph.node | false {
        if (pointElement === firstNode.element) {
            return firstNode;
        }
        for (let j = 0; j < firstNode.out.length; j++) {
            const e = this.findElementNode(pointElement, firstNode.out[j]);
            if (e) {
                return e;
            }
        }
        return false;
    }

    /**
     * Получаем массив элементов из элементов нод
     * @param na элементы нод
     * @returns массив элементов
     */
    private getElementArrayFromNodeArray(na: Types.elementGraph.node[]): Types.Interface.Element[] {
        const ret: Types.Interface.Element[] = [];
        for (let i = 0; i < na.length; i++) {
            ret.push(na[i].element);
        }
        return ret;
    }

    /**
     * Возвращает массив выходов, которые ни к чему не подключены.
     * @returns Массив соединений.
     */
    getOutputs(): Types.Interface.Connection[] {
        const it = this.getSetNodeDFS();
        const ret: Types.Interface.Connection[] = [];
        for (let i = 0; i < it.length; i++) {
            if (it[i].element.out_connections.length !== it[i].out.length) {
                for (let j = 0; j < it[i].element.out_connections.length; j++) {
                    if (!it[i].element.out_connections[j].in) {
                        ret.push(it[i].element.out_connections[j]);
                    }
                }
            }
        }
        return ret;
    }

    /**
     * Возвращает массив входов, которые ни к чему не подключены.
     * @returns Массив соединений.
     */
    getInputs(): Types.source.array {
        const it = this.getSetNodeDFS();
        const ret: Types.source.array = [];
        for (let i = 0; i < it.length; i++) {
            if ('in_connections' in it[i].element) {
                const nuo = it[i].element.in_connections as (string | Types.Interface.Connection)[];
                if (nuo.length !== it[i].out.length) {
                    for (let j = 0; j < nuo.length; j++) {
                        if (typeof nuo[j] === 'string') {
                            ret.push({
                                name: nuo[j] as string,
                                element: it[i].element,
                                no_source: i,
                                is_out: false
                            });
                        }
                    }
                }
            }
        }
        return ret;
    }

    /**
     * Возвращает массив генераторов графа.
     * @returns Массив генераторов (начальных элементов).
     */
    getGenerators(): Types.Interface.Element[] {
        return this.getElementArrayFromNodeArray(this.tree);
    }

    /**
     * Возвращает обход графа в глубину.
     * @returns Массив элементов графа.
     */
    getAllElementsDFS(): Types.Interface.Element[] {
        return this.getElementArrayFromNodeArray(this.getSetNodeDFS());
    }

    /**
     * Возвращает обход графа в ширину.
     * @returns Массив элементов графа.
     */
    getAllElementsBFS(): Types.Interface.Element[] {
        return this.getElementArrayFromNodeArray(this.getAllNodeBFS());
    }

    /**
     * Возвращает массив всех нод в глубину.
     * @returns Массив нод графа.
     */
    getAllNodeDFS(): Types.elementGraph.node[] {
        const ret: Types.elementGraph.node[] = [];
        for (let i = 0; i < this.tree.length; i++) {
            this.DFSrec(this.tree[i], ret);
        }
        return ret;
    }

    /**
     * Рекурсивно обходит граф в глубину.
     * @param node Нода для обработки.
     * @param ret Массив результата обхода.
     */
    private DFSrec(node: Types.elementGraph.node, ret: Types.elementGraph.node[]): void {
        ret.push(node);
        for (let j = 0; j < node.out.length; j++) {
            this.DFSrec(node.out[j], ret);
        }
    }

    /**
     * Находит все соединения, к которым подключена данная нода
     * @param node Данная нода
     * @returns Массив соединений
     */
    getConnectionsNode(node: Types.elementGraph.node): Types.Interface.Connection[] {
        const ret: Types.Interface.Connection[] = [];
        for (let i = 0; i < node.element.out_connections.length; i++) {
            if (node.element.out_connections[i].in) {
                ret.push(node.element.out_connections[i]);
            }
        }
        return ret;
    }

    /**
     * Возвращает массив всех нод в ширину.
     * @returns Массив нод графа.
     */
    getAllNodeBFS(): Types.elementGraph.node[] {
        const ret = [...this.tree];
        const allel = this.getSetNodeDFS();
        const conn: Types.Interface.Connection[] = [];
        while (allel.length > 0) {
            for (let i = 0; i < allel.length; i++) {
                if (!ret.find((el) => el === allel[i])) {
                    let fl = true;
                    for (let j = 0; j < allel[i].connection.length; j++) {
                        if (!ret.find((el) => el.element === allel[i].connection[j].out.element)) {
                            fl = false;
                            break;
                        }
                    }
                    if (fl) {
                        ret.push(allel[i]);
                        conn.push(...allel[i].connection);
                        allel.splice(i, 1);
                        i--;
                    }
                } else {
                    allel.splice(i, 1);
                    i--;
                }
            }
        }
        return ret;
    }

    /**
     * Возвращает уникальные ноды графа после обхода в глубину.
     * @returns Массив уникальных нод графа.
     */
    getSetNodeDFS(): Types.elementGraph.node[] {
        const arr = this.getAllNodeDFS();
        return arr.filter((value, index, self) => self.indexOf(value) === index);
    }

    /**
     * Экспортирует граф для фронта
     * @returns Экспортированный граф
     */
    getDataElementGraph(): Types.server.elementGraph {
        const nodes = this.getAllNodeBFS();
        const elems = this.getElementArrayFromNodeArray(nodes);
        const elements: Types.server.exportElements = [];
        for (let i = 0; i < nodes.length; i++) {
            elements.push({
                name: nodes[i].element.name ? (nodes[i].element.name as string) : '',
                id: i,
                connections_in: [] as {conn_name: string; id: number}[],
                connections_out: [] as {conn_name: string; id: number[]}[]
            });
            if (nodes[i].element.in_connections) {
                const thisConns = nodes[i].element.in_connections as (
                    | string
                    | Types.Interface.Connection
                )[];
                for (let j = 0; j < thisConns.length; j++) {
                    if (typeof thisConns[j] === 'string') {
                        elements[i].connections_in.push({
                            conn_name: thisConns[j] as string,
                            id: -1
                        });
                    } else {
                        elements[i].connections_in.push({
                            conn_name: (thisConns[j] as Types.Interface.Connection).findInString(
                                nodes[i].element
                            ),
                            id: elems.indexOf(
                                (thisConns[j] as Types.Interface.Connection).out.element
                            )
                        });
                    }
                }
            }
            for (let j = 0; j < nodes[i].element.out_connections.length; j++) {
                const ids = [];
                if (nodes[i].element.out_connections[j].in) {
                    for (
                        let k = 0;
                        k < (nodes[i].element.out_connections[j].in as Types.source.array).length;
                        k++
                    ) {
                        ids.push(
                            elems.indexOf(
                                (nodes[i].element.out_connections[j].in as Types.source.array)[k]
                                    .element
                            )
                        );
                    }
                }

                elements[i].connections_out.push({
                    conn_name: nodes[i].element.out_connections[j].out.name,
                    id: ids
                });
            }
        }
        const eeg: Types.server.exportElementGraph = [];
        for (let i = 0; i < this.tree.length; i++) {
            this.recExportElementGraph(this.tree[i], eeg, elems);
        }
        return {
            elements: elements,
            elementGraph: eeg
        };
    }

    /**
     * Рекурсивно обходим граф в глубину
     * @param node
     * @param ret
     * @param elems
     */
    private recExportElementGraph(
        node: Types.elementGraph.node,
        ret: Types.server.exportElementGraph,
        elems: Types.Interface.Element[]
    ) {
        const id = elems.indexOf(node.element);
        ret.push({
            id: id,
            out: []
        });
        for (let j = 0; j < node.out.length; j++) {
            this.recExportElementGraph(node.out[j], ret[ret.length - 1].out, elems);
        }
    }
}

export {ElementGraph};

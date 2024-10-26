import * as Types from '../../types';
/**
 * Класс-шаблон, который предоставляет возможность другим классам
 * создавать объект типа Interface.Connection
 */
declare class ConnectionFactory<ConnectionType extends Types.Interface.Connection> {
    private connectionClass;
    /**
     * Конструктор фабрики, принимает класс, который необходимо создать
     * @param connectionClass класс который необходимо создать
     */
    constructor(connectionClass: new (outSource: Types.source.it, arg2?: Types.source.it | Types.source.array) => ConnectionType);
    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     */
    create(outSource: Types.source.it): ConnectionType;
    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     */
    create(outSource: Types.source.it, inSource: Types.source.it): ConnectionType;
    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     */
    create(outSource: Types.source.it, inSourceArray: Types.source.array): ConnectionType;
}
export { ConnectionFactory };

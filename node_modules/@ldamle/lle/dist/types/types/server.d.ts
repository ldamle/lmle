type exportElements = {
    name: string;
    id: number;
    connections_in: {
        conn_name: string;
        id: number;
    }[];
    connections_out: {
        conn_name: string;
        id: number[];
    }[];
}[];
type exportElementGraph = {
    id: number;
    out: exportElementGraph;
}[];
type elementGraph = {
    elements: exportElements;
    elementGraph: exportElementGraph;
};
type themeSCS = {
    globals: {
        accent: string;
        background: string;
        foreground: string;
        [key: string]: string;
    };
    rules: {
        name: string;
        scope: string;
        foreground: string;
        [key: string]: string;
    }[];
};
export { exportElements, exportElementGraph, elementGraph, themeSCS };

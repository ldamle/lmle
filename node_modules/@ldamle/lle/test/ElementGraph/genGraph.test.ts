import * as lle from '../../src/lle';
describe('Check genGraph functions', () => {
    const g1 = new lle.Generator('g1', 1);
    const g2 = new lle.Generator('g2', 2);
    const g3 = new lle.Generator('g3', 3);
    const g4 = new lle.Generator('g4', 4);
    const e1 = new lle.Element('e1', ['A', 'B'], ['A', 'B', 'C'], []);
    const e2 = new lle.Element('e2', ['A', 'B', 'C'], ['A', 'B'], []);
    const e3 = new lle.Element('e3', ['A', 'B'], ['A', 'B'], []);
    const e4 = new lle.Element('e4', ['A', 'B', 'C', 'D'], ['A', 'B', 'C'], []);
    e1.in('A', g1.out());
    e1.in('B', g2.out());
    e2.in('A', e1.out('B'));
    e2.in('B', e1.out('C'));
    e2.in('C', g3.out());
    e3.in('A', e2.out('B'));
    e3.in('B', g4.out());
    e4.in('A', e1.out('A'));
    e4.in('B', e2.out('A'));
    e4.in('C', e3.out('A'));
    e4.in('D', e3.out('B'));

    test('check graph', () => {
        const eg = new lle.ElementGraph(e2);
        expect(eg.tree).toEqual([
            {
                element: g1,
                connection: [],
                out: [
                    {
                        element: e1,
                        connection: e1.in_connections,
                        out: [
                            {
                                element: e4,
                                connection: e4.in_connections,
                                out: []
                            },
                            {
                                element: e2,
                                connection: e2.in_connections,
                                out: [
                                    {
                                        element: e4,
                                        connection: e4.in_connections,
                                        out: []
                                    },
                                    {
                                        element: e3,
                                        connection: e3.in_connections,
                                        out: [
                                            {
                                                element: e4,
                                                connection: e4.in_connections,
                                                out: []
                                            },
                                            {
                                                element: e4,
                                                connection: e4.in_connections,
                                                out: []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                element: e2,
                                connection: e2.in_connections,
                                out: [
                                    {
                                        element: e4,
                                        connection: e4.in_connections,
                                        out: []
                                    },
                                    {
                                        element: e3,
                                        connection: e3.in_connections,
                                        out: [
                                            {
                                                element: e4,
                                                connection: e4.in_connections,
                                                out: []
                                            },
                                            {
                                                element: e4,
                                                connection: e4.in_connections,
                                                out: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                element: g2,
                connection: [],
                out: [
                    {
                        element: e1,
                        connection: e1.in_connections,
                        out: [
                            {
                                element: e4,
                                connection: e4.in_connections,
                                out: []
                            },
                            {
                                element: e2,
                                connection: e2.in_connections,
                                out: [
                                    {
                                        element: e4,
                                        connection: e4.in_connections,
                                        out: []
                                    },
                                    {
                                        element: e3,
                                        connection: e3.in_connections,
                                        out: [
                                            {
                                                element: e4,
                                                connection: e4.in_connections,
                                                out: []
                                            },
                                            {
                                                element: e4,
                                                connection: e4.in_connections,
                                                out: []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                element: e2,
                                connection: e2.in_connections,
                                out: [
                                    {
                                        element: e4,
                                        connection: e4.in_connections,
                                        out: []
                                    },
                                    {
                                        element: e3,
                                        connection: e3.in_connections,
                                        out: [
                                            {
                                                element: e4,
                                                connection: e4.in_connections,
                                                out: []
                                            },
                                            {
                                                element: e4,
                                                connection: e4.in_connections,
                                                out: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                element: g4,
                connection: [],
                out: [
                    {
                        element: e3,
                        connection: e3.in_connections,
                        out: [
                            {
                                element: e4,
                                connection: e4.in_connections,
                                out: []
                            },
                            {
                                element: e4,
                                connection: e4.in_connections,
                                out: []
                            }
                        ]
                    }
                ]
            },
            {
                element: g3,
                connection: [],
                out: [
                    {
                        element: e2,
                        connection: e2.in_connections,
                        out: [
                            {
                                element: e4,
                                connection: e4.in_connections,
                                out: []
                            },
                            {
                                element: e3,
                                connection: e3.in_connections,
                                out: [
                                    {
                                        element: e4,
                                        connection: e4.in_connections,
                                        out: []
                                    },
                                    {
                                        element: e4,
                                        connection: e4.in_connections,
                                        out: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]);
    });
});

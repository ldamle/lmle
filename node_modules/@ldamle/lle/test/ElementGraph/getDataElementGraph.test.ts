import * as lle from '../../src/lle';
describe('Check getDataElementGraph', () => {
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
    const eg = new lle.ElementGraph(e2);

    test('check getDataElementGraph', () => {
        expect(eg.getDataElementGraph()).toEqual({
            elements: [
                {
                    name: '',
                    id: 0,
                    connections_in: [],
                    connections_out: [{conn_name: 'g1', id: [4]}]
                },
                {
                    name: '',
                    id: 1,
                    connections_in: [],
                    connections_out: [{conn_name: 'g2', id: [4]}]
                },
                {
                    name: '',
                    id: 2,
                    connections_in: [],
                    connections_out: [{conn_name: 'g4', id: [6]}]
                },
                {
                    name: '',
                    id: 3,
                    connections_in: [],
                    connections_out: [{conn_name: 'g3', id: [5]}]
                },
                {
                    name: 'e1',
                    id: 4,
                    connections_in: [
                        {conn_name: 'A', id: 0},
                        {conn_name: 'B', id: 1}
                    ],
                    connections_out: [
                        {conn_name: 'A', id: [7]},
                        {conn_name: 'B', id: [5]},
                        {conn_name: 'C', id: [5]}
                    ]
                },
                {
                    name: 'e2',
                    id: 5,
                    connections_in: [
                        {conn_name: 'A', id: 4},
                        {conn_name: 'B', id: 4},
                        {conn_name: 'C', id: 3}
                    ],
                    connections_out: [
                        {conn_name: 'A', id: [7]},
                        {conn_name: 'B', id: [6]}
                    ]
                },
                {
                    name: 'e3',
                    id: 6,
                    connections_in: [
                        {conn_name: 'A', id: 5},
                        {conn_name: 'B', id: 2}
                    ],
                    connections_out: [
                        {conn_name: 'A', id: [7]},
                        {conn_name: 'B', id: [7]}
                    ]
                },
                {
                    name: 'e4',
                    id: 7,
                    connections_in: [
                        {conn_name: 'A', id: 4},
                        {conn_name: 'B', id: 5},
                        {conn_name: 'C', id: 6},
                        {conn_name: 'D', id: 6}
                    ],
                    connections_out: [
                        {conn_name: 'A', id: []},
                        {conn_name: 'B', id: []},
                        {conn_name: 'C', id: []}
                    ]
                }
            ],
            elementGraph: [
                {
                    id: 0,
                    out: [
                        {
                            id: 4,
                            out: [
                                {id: 7, out: []},
                                {
                                    id: 5,
                                    out: [
                                        {id: 7, out: []},
                                        {
                                            id: 6,
                                            out: [
                                                {id: 7, out: []},
                                                {id: 7, out: []}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 5,
                                    out: [
                                        {id: 7, out: []},
                                        {
                                            id: 6,
                                            out: [
                                                {id: 7, out: []},
                                                {id: 7, out: []}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 1,
                    out: [
                        {
                            id: 4,
                            out: [
                                {id: 7, out: []},
                                {
                                    id: 5,
                                    out: [
                                        {id: 7, out: []},
                                        {
                                            id: 6,
                                            out: [
                                                {id: 7, out: []},
                                                {id: 7, out: []}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 5,
                                    out: [
                                        {id: 7, out: []},
                                        {
                                            id: 6,
                                            out: [
                                                {id: 7, out: []},
                                                {id: 7, out: []}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    out: [
                        {
                            id: 6,
                            out: [
                                {id: 7, out: []},
                                {id: 7, out: []}
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    out: [
                        {
                            id: 5,
                            out: [
                                {id: 7, out: []},
                                {
                                    id: 6,
                                    out: [
                                        {id: 7, out: []},
                                        {id: 7, out: []}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    });
});

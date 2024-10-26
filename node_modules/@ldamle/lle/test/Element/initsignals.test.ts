import * as lle from '../../src/lle';
describe('Element initialization by arrays of strings and signals', () => {
    const element1 = new lle.Element(
        ['A_2', 'A_1', 'A_0', 'E_n'],
        ['F_0', 'F_1', 'F_2', 'F_3', 'F_4', 'F_5', 'F_6', 'F_7'],
        [
            {name: 'E_n', state: 0, out: '00000000'},
            '10000000',
            '01000000',
            '00100000',
            '00010000',
            '00001000',
            '00000100',
            '00000010',
            '00000001'
        ]
    );
    test('in_connections should be set correctly', () => {
        const expectedInConnections = ['A_2', 'A_1', 'A_0', 'E_n'];
        expect(element1.in_connections).toEqual(expectedInConnections);
    });

    // test('out_connections should be set correctly', () => {
    //     const expectedOutConnections = [
    //         {in: false, out: {name: 'F_0', element: element1, no_source: 0, is_out: true}, state: 'z'},
    //         {in: false, out: {name: 'F_1', element: element1, no_source: 1, is_out: true}, state: 'z'},
    //         {in: false, out: {name: 'F_2', element: element1, no_source: 2, is_out: true}, state: 'z'},
    //         {in: false, out: {name: 'F_3', element: element1, no_source: 3, is_out: true}, state: 'z'},
    //         {in: false, out: {name: 'F_4', element: element1, no_source: 4, is_out: true}, state: 'z'},
    //         {in: false, out: {name: 'F_5', element: element1, no_source: 5, is_out: true}, state: 'z'},
    //         {in: false, out: {name: 'F_6', element: element1, no_source: 6, is_out: true}, state: 'z'},
    //         {in: false, out: {name: 'F_7', element: element1, no_source: 7, is_out: true}, state: 'z'}
    //     ];
    //     expect(element1.out_connections).toEqual(expectedOutConnections);
    // });
});

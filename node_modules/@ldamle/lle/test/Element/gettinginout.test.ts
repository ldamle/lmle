import * as lle from '../../src/lle';
describe('In and Out connections check', () => {
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

    test('get element in', () => {
        expect(element1.in('A_2')).toEqual('A_2');
    });

    test('get element out', () => {
        element1.in('A_2', element1.out('F_0'));
    });

    test('get element as connection', () => {
        expect(element1.in('A_2')).toEqual(element1.out('F_0'));
    });

    test('connection in not found', () => {
        expect(element1.in('A2')).toEqual('');
    });

    test('connection out not found', () => {
        expect(element1.out('A2')).toEqual({});
    });

    test('inIndex check', () => {
        expect(element1.inIndex('A_2')).toEqual(0);
    });

    test('inIndex check not found', () => {
        expect(element1.inIndex('A2')).toEqual(-1);
    });
});

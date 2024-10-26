import * as lle from '../../src/lle';
describe('Check bool functions', () => {
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

    test('isAllInConnected => false', () => {
        expect(element1.isAllInConnected()).toEqual(false);
    });

    test('isAllInConnected => true', () => {
        for (let i = 0; i < element1.in_connections.length; i++) {
            element1.in(
                element1.in_connections[i] as string,
                element1.out(element1.out_connections[i].out.name)
            );
        }
        expect(element1.isAllInConnected()).toEqual(true);
    });
});

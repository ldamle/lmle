import * as lle from '../../src/lle';
describe('bool function', () => {
    test('should return false when there are no connections', () => {
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            []
        );
        expect(connect.isConnected()).toBe(false);
    });

    test('should return true when there are connections', () => {
        const elem = new lle.Element();
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            [{name: 'A', element: elem, no_source: 1, is_out: false}]
        );
        expect(connect.isConnected()).toBe(true);
    });

    test('should return 0 when there are no connections', () => {
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            []
        );
        expect(connect.lenInConnected()).toBe(0);
    });

    test('should return 0 when there are no connections', () => {
        const connect = new lle.Connection({
            name: 'A',
            element: new lle.Element(),
            no_source: 1,
            is_out: true
        });
        expect(connect.lenInConnected()).toBe(0);
    });

    test('should return the correct number of connections', () => {
        const elem = new lle.Element();
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            [
                {name: 'A', element: elem, no_source: 1, is_out: false},
                {name: 'B', element: elem, no_source: 1, is_out: false}
            ]
        );
        expect(connect.lenInConnected()).toBe(2);
    });
});

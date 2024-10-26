import * as lle from '../../src/lle';
describe('clone function', () => {
    test('should clone the connection with a new element', () => {
        const elem = new lle.Element();
        const connect = new lle.Connection({name: 'A', element: elem, no_source: 1, is_out: true});
        const clonedConnection = connect.clone(new lle.Element());
        expect(clonedConnection.out.name).toBe('A');
        expect(clonedConnection.out.element).not.toBe(elem); // Ensure it's a new element
    });
});

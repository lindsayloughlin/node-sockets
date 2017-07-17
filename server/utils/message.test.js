/**
 * Created by lloughlin on 16/7/17.
 */

const expect = require('expect');

var {generateMessage, generateLocation} = require('./message');

describe('generateMessage', () => {
    it('should generate corret message object', () => {

        let from = 'me';
        let text = 'best text ever';
        let result = generateMessage(from, text);
        expect(result.from).toBe(from);
        expect(result.text).toBe(text);
        expect(result.createdAt).toBeA('number');
        // same test done below.
        expect(result).toInclude({
            from,
            text
        });
    });
});

describe('generateLocationMessage', () => {
    it('it should generate url', () => {
        const from = 'me';
        const lat = 12.12;
        const lng = -44.33;
        let message = generateLocation(from, lat, lng);
        let url = `https://www.google.com/maps?q=${lat},${lng}`;
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            url
        });
    });
});
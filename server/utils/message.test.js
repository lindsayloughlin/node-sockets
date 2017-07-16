/**
 * Created by lloughlin on 16/7/17.
 */

const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate corret message object', ()=>{

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
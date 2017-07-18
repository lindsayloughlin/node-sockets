/**
 * Created by lloughlin on 17/7/17.
 */

var {isRealString} = require('./validation');
var expect = require('expect');

describe('valid str testing', ()=>{

    it('should reject non-string value', ()=>{

        var nonAString;
        expect(isRealString(nonAString)).toBe(false);
    });

    it('should reject string with only spaces',()=>{
        var spacesString =' ';
        expect(isRealString(spacesString)).toBe(false);
    });

    it('should allow string with non-space characters',()=>{
        var withSpace = 'hello world ';
        expect(isRealString(withSpace)).toBe(true);
    });
});
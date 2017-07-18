/**
 * Created by lloughlin on 18/7/17.
 */

var expect = require('expect');
var {Users} = require('./users');

describe('Users test', () => {

    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: 2,
            name: 'Sam',
            room: 'Node Course'
        },
        {
            id: 5,
            name: 'Jenny',
            room: 'Node Course'
        },
        {
            id: 10,
            name: 'Bill',
            room: 'React Course'
        }
        ];
    });

    it(': should be able to add in new user', () => {
        var users = new Users();

        var testUser = {
            id: 123,
            name: 'Lindsay',
            room: 'My Desk'
        };

        var resUser = users.addUser(testUser.id, testUser.name, testUser.room);
        expect(users.users).toEqual([testUser]);
    });

    it('should return names for node course', ()=>{
        var nodeUsers = users.getUserList('Node Course');
        expect(nodeUsers).toEqual(['Mike', 'Sam', 'Jenny']);
    });

    it('should remove a user from list ', ()=>{
        var user = users.removeUser(1);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should not remove user', ()=>{
        users.removeUser(100);
        expect(users.users.length).toBe(4);
    });

    it('should find the user', ()=>{
        let resultUser = users.getUser(1);
        expect(resultUser).toEqual(users.users[0]);
    });

    it('should not find the user', ()=>{
        let resultUser = users.getUser(100);
        expect(resultUser).toNotExist();
    });


});
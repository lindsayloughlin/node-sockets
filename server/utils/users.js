/**
 * Created by lloughlin on 18/7/17.
 */

var _  = require('lodash');

// [{
//     id: '/#helloworldtest',
//     name: 'Lindsay',
//     room: 'My Desk'
// }];


// addUser
// removeUser
// getUser
// getuserList


let users = [];

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room};
        this.users.push(user);
    }
    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((eachUser)=>{
                return eachUser.id !== id;
            });
        }
        return user;
    }
    getUser(id) {

        // for (var user : this.users.values()) {
        //
        // }
        //let song = _.find(songs, {id});

        var filteredList = this.users.filter((user)=> {
            return user.id === id;
        });
        if (filteredList.length > 0) {
            return filteredList[0];
        }

    }
    getUserList(roomName) {
        var users = this.users.filter((user)=> {
           return user.room === roomName;
        });

        var namesOfUsers = users.map((user)=>{
           return user.name;
        });
        return namesOfUsers;
    }
}

class Person {
    constructor(name, age) {
        // console.log(name, age);
        this.name = name;
        this.age = age;

    }

    getUserDescription() {
        return `${this.name} is ${this.age} years old`;
    }
}

module.exports = {
    Users
};

var me = new Person('Lindsay', 35);

console.log(me.getUserDescription());


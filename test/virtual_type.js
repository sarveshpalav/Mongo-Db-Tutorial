const assert = require('assert');
const User = require('../src/user');


describe('Virtual types',()=>{
    it('postCount returns number of posts',()=>{
        const joe = new User({
            name:'Joe',
            posts:[{title:'PostTitle'}]
        });
        joe.save()
        .then((user)=>{
            assert(joe.postCount ==1);
            done()
        })
    })
})
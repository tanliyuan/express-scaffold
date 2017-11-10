const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('D:\\ab.json');
const db = low(adapter);

// Set some defaults
db.defaults({ posts: [], user: {} })
  .write();

// Add a post
db.get('posts')
  .push({ id: 1, title: 'lowdb is awesome'})
  .write();

// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode')
  .write();
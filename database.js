const users = [
  { userName: 'dev', password: 'dev' },
  { userName: 'test', password: 'test' }
];
const tasks = {
  dev: [{description: '1', status: false}, {description: '2', status: true}, {description: '3', status: false}],
  test: [{description: 'a', status: true}, {description: 'b', status: false}, {description: 'c', status: true}]
};

module.exports = { users, tasks }
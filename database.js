const users = [
  { userName: 'dev', password: 'dev' },
  { userName: 'test', password: 'test' }
];
const tasks = {
  dev: [{description: 'Hello World !!', status: false}, {description: 'Stay Safe, Stay Healthy', status: true}],
  test: []
};

module.exports = { users, tasks }
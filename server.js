'use strict';
const Hapi = require('@hapi/hapi');
const { users, tasks } = require('./database')
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: {
      cors: true
    }
  });

  server.route({
    method: 'GET',
    path: '/signup',
    handler: (request, h) => {
      return 'Hello World!';
    }
  });

  server.route({
    method: 'POST',
    path: '/signup',
    handler: async (request, h) => {
      let exist = false;
      try {
        const userName = request.payload.userName;
        for (const user of users) {
          if (user.userName === userName) {
            exist = true;
            break;
          } else {
            exist = false;
          }
        };
        if (!exist) {
          await users.push(request.payload);
          tasks[userName] = [];
        }
        return !exist;
      } catch (error) {
        console.log(error);
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/login',
    handler: async (request, h) => {
      try {
        let result = 'signup';
        for (const user of users) {
          if (user.userName === request.payload.userName) {
            if (user.password === request.payload.password) {
              result = 'success';
              break;
            } else {
              result = 'failed';
              break;
            }
          }
        }
        return result;
      } catch (error) {
        console.log(error);
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/database',
    handler: (request, h) => {
      return { users, tasks };
    }
  });

  server.route({
    method: 'POST',
    path: '/gettasks',
    handler: async (request, h) => {
      try {
        const prop = request.payload.userName;
        const result = await tasks[prop];
        return result || [];
      } catch (error) {
        console.log(error);
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/addtask',
    handler: async (request, h) => {
      try {
        const allTasks = await tasks[request.payload.userName];
        await allTasks.push(request.payload.task);
        const result = await tasks[request.payload.userName].includes(request.payload.task);
        return result;
      } catch (error) {
        console.log(error);
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/deletetask',
    handler: async (request, h) => {
      try {
        const allTasks = await tasks[request.payload.userName];
        await allTasks.splice(request.payload.index, 1)
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/togglestatus',
    handler: async (request, h) => {
      try {
        const userName = await request.payload.userName;
        const index = await request.payload.index;
        tasks[userName][index].status = !tasks[userName][index].status;
        const newStatus = await tasks[userName][index].status;
        return newStatus;
      } catch (error) {
        console.log(error);
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/updatedescription',
    handler: async (request, h) => {
      try {
        const userName = await request.payload.userName;
        const index = await request.payload.index;
        const description = await request.payload.description;
        tasks[userName][index].description = description;
        const newDescription = await tasks[userName][index].description;
        return newDescription;
      } catch (error) {
        console.log(error);
      }
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
const Bcrypt = require('bcrypt');
const Hapi = require('@hapi/hapi');

const users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

const validate = async (request, username, password) => {

    const user = users[username];
    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, name: user.name };

    return { isValid, credentials };
};

// create new server instance
const server = new Hapi.Server({  
  host: 'localhost',
  port: 3000
})

async function liftOff () {  
  await server.register({
    plugin: require('@hapi/basic')
  })

  await server.register({
    plugin: require('@hapi/inert')
  })

  await server.start()
  console.log('Server started at: ' + server.info.uri)
}

liftOff()  

server.auth.strategy('simple', 'basic', { validate });

server.route({  
    method: 'GET',
    path: '/',
    options: {
        auth: 'simple'
    },
    handler: (request, h) => {
      return h.file('./index.html')
    }
})

server.route({  
    method: 'GET',
    path: '/css',
    handler: (request, h) => {
      return h.file('./css/style.css')
    }
})

server.route({  
    method: 'GET',
    path: '/script',
    handler: (request, h) => {
      return h.file('./script/script.js')
    }
})

server.route({  
    method: 'GET',
    path: '/img/brightness.png',
    handler: (request, h) => {
      return h.file('./img/brightness.png')
    }
})

server.route({  
    method: 'GET',
    path: '/img/darkMode.png',
    handler: (request, h) => {
      return h.file('./img/darkMode.png')
    }
})

server.route({  
  method: 'GET',
  path: '/img/fruit.png',
  handler: (request, h) => {
    return h.file('./img/fruit.png')
  }
})

server.route({  
  method: 'GET',
  path: '/img/favico.ico',
  handler: (request, h) => {
    return h.file('./img/favico.ico')
  }
})

server.route({  
  method: 'GET',
  path: '/img/github.png',
  handler: (request, h) => {
    return h.file('./img/github.png')
  }
})

server.route({  
  method: 'GET',
  path: '/img/linkedin.png',
  handler: (request, h) => {
    return h.file('./img/linkedin.png')
  }
})

server.route({  
  method: 'GET',
  path: '/img/restart.png',
  handler: (request, h) => {
    return h.file('./img/restart.png')
  }
})

server.route({  
  method: 'GET',
  path: '/img/playButton.png',
  handler: (request, h) => {
    return h.file('./img/playButton.png')
  }
})
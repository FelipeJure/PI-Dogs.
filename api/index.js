//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fetch = require('node-fetch');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { User, Temperament } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
      console.log('%s listening at 3001'); 
      await User.create({
        name: 'felipe',
        email: 'felipe.jure05@gmail.com',
        password: 1234,
        access: 'admin'
      });
      let dogs = await fetch('https://api.thedogapi.com/v1/breeds')
      dogs = await dogs.json()
      let temperaments = []
      dogs.forEach(curr => {
        if (curr.temperament) temperaments = [...temperaments, ...curr.temperament.split(", ")]
      })
      temperaments = new Set (temperaments)
      arrayTemperaments = Array.from(temperaments)
      arrayTemperaments = arrayTemperaments.map(t => Temperament.create({
        name: t
      }))
      Promise.all(arrayTemperaments)
      // eslint-disable-line no-console
  });
});

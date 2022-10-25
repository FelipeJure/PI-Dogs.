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
const { Temperament } = require('./src/db.js');

const addToDb = async () => {
      let dogs = await fetch('https://api.thedogapi.com/v1/breeds')
      dogs = await dogs.json()
      let temperaments = []
      dogs.forEach(curr => {
        if (curr.temperament) temperaments = [...temperaments, ...curr.temperament.split(", ")]
          })
      temperaments = new Set (temperaments)
      let arrayTemperaments = Array.from(temperaments)
      arrayTemperaments = arrayTemperaments.sort((a,b)=> (a > b ? 1 : -1))
      arrayTemperaments.forEach(t => {
        Temperament.findOrCreate({
          where: {
            name: t
          }
        })
      })
  
}

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
      console.log(`%s listening at ${process.env.PORT}`);
      addToDb() 
      // eslint-disable-line no-console
  });
});

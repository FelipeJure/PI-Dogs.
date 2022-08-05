const { Router } = require('express');
const router = Router();
const { User } = require('../../src/db.js');

// const isAuthenticated = (req, res, next) => {
//     const user = users.find(u => u.id === Number(req.cookies.userId))
//     if(!user) return res.redirect('/login')
//     next()
// }
// const isNotAuthenticated = (req, res, next) => {
//     const user = users.find(u => u.id === Number(req.cookies.userId))
//     if(user) return res.redirect('/home')
//     next()
// }

// router.get('/login', (req,res) => {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(404).send({message: 'Complete all fields'})
//     User.findOne({
//         where:{
//             email,
//             password
//         }
//     })
//     .then(user=>{
//         if (user) res.send({response: true})
//     })
//     res.status(404).send({response:false})
// })

// router.post('/register', (req,res)=>{
//     let { name, email, password } = req.body;
//      email = email.toLowerCase()
//     User.create({name, email, password})
//     .then(()=>{
//         res.json({response: 'User created saccessfully'})
//     })
// })



module.exports = router;
var express = require('express');
var router = require('express-promise-router')();

const usersService= require('../service/users');

/* GET users listing. */
router.get('/', async (req, res)=> {
  const users=await usersService.getUsers();
  res.send(users);
});

router.get('/error', async (req, res)=> {
  throw new Error("test error");
});

module.exports = router;

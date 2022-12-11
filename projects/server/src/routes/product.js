const {
  models: { Example },
} = require('../models');
const router = require('express').Router();
const customer = require('../models/example');
// const { Sequelize, Op } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/get', async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = 6;
  const search = req.query.search || '';
  const offset = limit * page;
  const exampleLength = await Example.findAll({});

  const sort = req.query.sort || 'id';

  const result = await Example.findAll({
    limit: limit,
    offset: page * limit,
    order: [[sort, 'ASC']],
    ...(req.query.search && {
      where: {
        name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
    }),
  });
  const resultCount = await Example.findAll({
    offset: page * limit,
    order: [[sort, 'ASC']],
    ...(req.query.search && {
      where: {
        name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
    }),
  });
  const pages = Math.ceil(resultCount.length / limit);

  res.json({
    result: result,
    pages: pages,
    page: page,
    order: sort,
    search: search,
  });
});

module.exports = router;

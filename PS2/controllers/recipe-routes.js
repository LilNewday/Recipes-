const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('login')
  console.log('rec routes log')
});

module.exports = router;
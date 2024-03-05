const { Router } = require('express');

const router = Router();

router.get("/", (req, res) => {
  res.send("api");
});

module.exports = router;
import { Router } from "express";
const catergoryController = require("../controllers/categoryController")
const router = Router();

router.post('/', catergoryController.createCategory)
router.get('/', catergoryController.getAllCategories)
router.get('/random', catergoryController.getRandomCategory)

module.exports = router;
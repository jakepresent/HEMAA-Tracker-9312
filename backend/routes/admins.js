const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");

router.post(`/create/`, AdminController.createAdmin);
router.post(`/login/`, AdminController.getAdminByEmailandPassword);

module.exports = router;

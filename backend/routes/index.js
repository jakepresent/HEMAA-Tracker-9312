const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const MemberController = require("../controllers/memberController");

router.get(`/member/find/:email`, MemberController.validate('getMemberByEmail'), MemberController.getMemberByEmail);
router.post(`/member/update/`, MemberController.updateMembers);
router.post(`/admin/login/`, AdminController.loginAdmin);

module.exports = router;
const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const MemberController = require("../controllers/memberController");

router.post(`/member/create/`, MemberController.validate('createMember'), MemberController.createMember);
router.get(`/member/find/:email`, MemberController.validate('getMemberByEmail'), MemberController.getMemberByEmail);
router.post(`/admin/login/`, AdminController.loginAdmin);

module.exports = router;
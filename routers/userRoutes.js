const express = require("express")
const router = new express.Router()

const { users, createUser, deleteUser } = require("../controller/userController")

router.get("/getusers", users)
router.post("/createusers", createUser)
router.delete("/users/:id", deleteUser)

module.exports = router


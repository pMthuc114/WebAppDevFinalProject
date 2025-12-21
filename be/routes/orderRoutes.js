const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrderById
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", authenticateUser, createOrder);

router.get("/my-orders", authenticateUser, getMyOrders);

router.get("/", authenticateUser, authorizeRoles("admin"), getAllOrders);

router.put("/:id/status", authenticateUser, authorizeRoles("admin"), updateOrderStatus);

router.delete("/:id", authenticateUser, authorizeRoles("admin"), deleteOrderById);

module.exports = router;

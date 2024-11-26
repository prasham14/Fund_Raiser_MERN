// routes/userDetailsRoutes.js
const express = require("express");
const router = express.Router();
const UserDetails = require("../models/userDetails");

// Create or Update User Details
router.post("/user-details", async (req, res) => {
  const { userId, AccountNo, Bank, AdhaarNo, Address, mobileNo, Upi } = req.body;

  try {
    let userDetails = await UserDetails.findOne({ userId });

    if (userDetails) {
      // Update user details if they already exist
      userDetails.AccountNo = AccountNo;
      userDetails.Bank = Bank;
      userDetails.AdhaarNo = AdhaarNo;
      userDetails.Address = Address;
      userDetails.mobileNo = mobileNo;
      userDetails.Upi = Upi;

      await userDetails.save();
      return res.status(200).json({ message: "User details updated successfully", userDetails });
    } else {
      // Create new user details if not exists
      userDetails = new UserDetails({
        userId,
        AccountNo,
        Bank,
        AdhaarNo,
        Address,
        mobileNo,
        Upi
      });
      await userDetails.save();
      return res.status(201).json({ message: "User details created successfully", userDetails });
    }
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while saving user details" });
  }
});

// Get User Details by User ID
router.get("/user-details/:userId", async (req, res) => {
  try {
    const userDetails = await UserDetails.findOne({ userId: req.params.userId });
    if (userDetails) {
      return res.status(200).json(userDetails);
    } else {
      return res.status(404).json({ message: "User details not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while retrieving user details" });
  }
});

module.exports = router;

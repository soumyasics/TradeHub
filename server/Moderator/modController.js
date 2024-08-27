const Moderator = require("./modSchema");
const User = require("../User/userModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const secret = "ModeratorSecretKey"; // Replace this with your own secret key

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = "prefix-";
    const originalname = file.originalname;
    const extension = originalname.split(".").pop();
    const filename = `${uniquePrefix}${originalname.substring(
      0,
      originalname.lastIndexOf(".")
    )}-${Date.now()}.${extension}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single("profile");

const registerModerator = async (req, res) => {
  try {
    const { firstname, lastname, contact, email, password, gender } = req.body;
    const profile = req.file;

    let existingModerator = await Moderator.findOne({ email });
    if (existingModerator) {
      return res.json({
        status: 409,
        msg: "Email already registered with us!",
        data: null,
      });
    }

    existingModerator = await Moderator.findOne({ contact });
    if (existingModerator) {
      return res.json({
        status: 409,
        msg: "Contact number already registered with us!",
        data: null,
      });
    }

    let existingUser1 = await User.findOne({ email });
    if (existingUser1) {
      return res.json({
        status: 409,
        msg: "email Already Registered With Us !!",
        data: null,
      });
    }
    existingUser1 = await User.findOne({ contact });
    if (existingUser1) {
      return res.json({
        status: 409,
        msg: "contact Number Already Registered With Us !!",
        data: null,
      });
    }

    const newModerator = new Moderator({
      firstname,
      lastname,
      contact,
      email,
      password,
      gender,
      profile,
    });

    await newModerator
      .save()
      .then((data) => {
        res.json({
          status: 200,
          msg: "Inserted successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Data not inserted",
          data: err,
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all Moderators
const viewModerators = (req, res) => {
  Moderator.find()
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          data: [],
          msg: "No data obtained",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};

const allPendingMods = async (req, res) => {
  try {
    const allMods = await Moderator.find({ adminApproved: "pending" });
    return res.status(200).json({ msg: "all pending mods", data: allMods });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const allApprovedMods = async (req, res) => {
  try {
    const allMods = await Moderator.find({ adminApproved: "approve" });
    return res.status(200).json({ msg: "all approved mods", data: allMods });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const allRejectedMods = async (req, res) => {
  try {
    const allMods = await Moderator.find({ adminApproved: "reject" });
    return res.status(200).json({ msg: "all rejected mods", data: allMods });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const approveModById = async (req, res) => {
  try {
    const { id } = req.params;
    const mod = await Moderator.findById(id);
    if (!mod) {
      return res.status(404).json({ msg: "Moderator not found", data: null });
    }

    const updatedMod = await Moderator.findByIdAndUpdate(
      id,
      {
        adminApproved: "approve",
      },
      { new: true }
    );

    return res.status(200).json({
      msg: "Moderator approved successfully",
      data: updatedMod,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const rejectModById = async (req, res) => {
  try {
    const { id } = req.params;
    const mod = await Moderator.findById(id);
    if (!mod) {
      return res.status(404).json({ msg: "Moderator not found", data: null });
    }

    const updatedMod = await Moderator.findByIdAndUpdate(
      id,
      {
        adminApproved: "reject",
      },
      { new: true }
    );

    return res.status(200).json({
      msg: "Moderator rejected successfully",
      data: updatedMod,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Update Moderator by ID
const editModeratorById = async (req, res) => {
  try {
    const { firstname, lastname, email, contact } = req.body;

    const userId = req.params.id;
    const user = await Moderator.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const updateField = {};
    if (firstname) updateField.firstname = firstname;
    if (lastname) updateField.lastname = lastname;
    if (email) {
      const existingUser = await Moderator.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(409).json({ msg: "Email already exists" });
      }
      updateField.email = email;
    }
   
    if (contact) updateField.contact = contact;
    if (req.file) {
      updateField.profile = req.file;
    }

    const newUser = await Moderator.findByIdAndUpdate(userId, updateField, {
      new: true,
    });

    if (newUser) {
      return res.status(200).json({
        msg: "Moderator Updated successfully",
        data: newUser,
      });
    }

    return res.status(404).json({
      msg: "Moderator not found",
      data: newUser,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong", error: err.message });
  }
};

// View Moderator by ID
const viewModeratorById = (req, res) => {
  Moderator.findById(req.params.id)
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Moderator data found.",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "No data obtained",
        Error: err,
      });
    });
};

// Activate Moderator by ID
const activateModeratorById = (req, res) => {
  Moderator.findByIdAndUpdate(req.params.id, { isActive: true })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Moderator activated successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "No data obtained",
        Error: err,
      });
    });
};

// Deactivate Moderator by ID
const deactivateModeratorById = (req, res) => {
  Moderator.findByIdAndUpdate(req.params.id, { isActive: false })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Moderator deactivated successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "No data obtained",
        Error: err,
      });
    });
};

// Forgot Password for Moderator
const forgotPassword = (req, res) => {
  Moderator.findOneAndUpdate(
    { email: req.body.email },
    { password: req.body.password }
  )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
        });
      else
        res.json({
          status: 500,
          msg: "User not found",
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Data not updated",
        Error: err,
      });
    });
};

// Reset Password for Moderator
const resetPassword = async (req, res) => {
  let pwdMatch = false;

  await Moderator.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      if (data.password === req.body.oldpassword) pwdMatch = true;
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Data not updated",
        Error: err,
      });
    });

  if (pwdMatch) {
    await Moderator.findByIdAndUpdate(
      { _id: req.params.id },
      { password: req.body.newpassword }
    )
      .exec()
      .then((data) => {
        if (data != null)
          res.json({
            status: 200,
            msg: "Updated successfully",
          });
        else
          res.json({
            status: 500,
            msg: "User not found",
          });
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          msg: "Data not updated",
          Error: err,
        });
      });
  } else {
    res.json({
      status: 405,
      msg: "Your old password doesn't match",
    });
  }
};

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });
};

const login = (req, res) => {
  const { email, password } = req.body;

  Moderator.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({
          status: 405,
          msg: "Please check your email and password",
        });
      }

      if (user.password !== password) {
        return res.json({
          status: 405,
          msg: "Please check your email and password!",
        });
      }

      // if (user.adminApproved === "pending") {
      //   return res.json({
      //     status: 410,
      //     msg: "Your account is not approved by admin yet.",
      //   });
      // }
      if (user.adminApproved === "reject") {
        return res.json({
          status: 410,
          msg: "Your account is rejected by admin.",
        });
      }

      if (!user.isActive) {
        return res.json({
          status: 410,
          msg: "Your account is currently not active state.",
        });
      }

      const token = createToken(user);

      return res.json({
        status: 200,
        data: user,
        msg: "Login successful",
        token,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: 500, msg: "Something went wrong" });
    });
};

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.json({ status: 401, msg: "Unauthorized" });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.json({ status: 401, msg: "Unauthorized", err: err });
    }

    req.user = decodedToken.userId;
    next();
  });
};

const addTestScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;
    const mod = await Moderator.findById(id);
    if (!mod) {
      return res.status(404).json({ msg: "Moderator not found", data: null });
    }
    let passed = false;

    if (score >= 0 && score <= 10) {
      if (score >= 5) {
        passed = true;
      }
      const updatedMod = await Moderator.findByIdAndUpdate(
        id,
        { score: score, isTestTaken: true, isTestPassed: passed },
        { new: true }
      );
      return res.status(200).json({
        msg: "Moderator evaluation score added successfully",
        data: updatedMod,
      });
    } else {
      return res.status(400).json({ msg: "Invalid score", data: null });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

module.exports = {
  registerModerator,
  login,
  viewModerators,
  editModeratorById,
  allPendingMods,
  allApprovedMods,
  allRejectedMods,
  viewModeratorById,
  deactivateModeratorById,
  activateModeratorById,
  forgotPassword,
  resetPassword,
  upload,
  approveModById,
  rejectModById,
  addTestScore,
};

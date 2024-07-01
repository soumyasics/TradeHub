const Moderator = require("./modSchema");
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

    const newModerator = new Moderator({
      firstname,
      lastname,
      contact,
      email,
      password,
      gender,
      profile,
    });

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

// Update Moderator by ID
const editModeratorById = async (req, res) => {
  const { firstname, lastname, contact, email, gender } = req.body;
  const profile = req.file;

  await Moderator.findByIdAndUpdate(
    { _id: req.params.id },
    {
      firstname,
      lastname,
      contact,
      email,
      gender,
      profile,
    }
  )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
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

// Admin Approve Moderator by ID
const adminApproveModeratorById = (req, res) => {
  Moderator.findByIdAndUpdate(
    { _id: req.params.id },
    { adminApproved: true, isActive: true }
  )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Moderator approved successfully",
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

// Admin Disapprove Moderator by ID
const adminDisapproveModeratorById = (req, res) => {
  Moderator.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Moderator disapproved successfully",
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

      if (!user.isActive) {
        return res.json({
          status: 410,
          msg: "Your account is currently not active state.",
        });
      }

      const token = createToken(user);

      res.json({
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

module.exports = {
  registerModerator,
  viewModerators,
  editModeratorById,
  viewModeratorById,
  deactivateModeratorById,
  activateModeratorById,
  adminApproveModeratorById,
  adminDisapproveModeratorById,
  forgotPassword,
  resetPassword,
  upload,
  login,
};

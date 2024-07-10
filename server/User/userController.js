const User = require("./userModel");
const secret = "User"; // Replace this with your own secret key
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },

  filename: function (req, file, cb) {
    const uniquePrefix = "prefix-"; // Add your desired prefix here
    const originalname = file.originalname;
    const extension = originalname.split(".").pop();
    const filename =
      uniquePrefix +
      originalname.substring(0, originalname.lastIndexOf(".")) +
      "-" +
      Date.now() +
      "." +
      extension;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single("profile");

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, gender, contact, email, password } = req.body;

    const newUser = new User({
      firstname,
      lastname,
      contact,
      email,
      profile: req.file,
      password,
      gender,
    });

    let existingUser1 = await User.findOne({ email });
    if (existingUser1) {
      return res.json({
        status: 409,
        msg: "email Already Registered With Us !!",
        data: null,
      });
    }
    let existingUser = await User.findOne({ contact });
    if (existingUser) {
      return res.json({
        status: 409,
        msg: "contact Number Already Registered With Us !!",
        data: null,
      });
    }
    await newUser
      .save()
      .then((data) => {
        return res.json({
          status: 200,
          msg: "Inserted successfully",
          data: data,
        });
      })
      .catch((err) => {
        return res.json({
          status: 500,
          msg: "Data not Inserted",
          data: err,
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all Users
const viewUsers = (req, res) => {
  User.find()
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
          msg: "No Data obtained",
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

// Update User by ID
const editUserById = async (req, res) => {
  try {
    const { firstname, lastname, email, contact } = req.body;

    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const updateField = {};
    if (firstname) updateField.firstname = firstname;
    if (lastname) updateField.lastname = lastname;
    if (email) updateField.email = email;
    if (contact) updateField.contact = contact;

    const newUser = await User.findByIdAndUpdate(userId, updateField, {
      new: true,
    });

    if (newUser) {
      return res.status(200).json({
        msg: "User Updated successfully",
        data: newUser,
      });
    }

    return res.status(404).json({
      msg: "User not found",
      data: newUser,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong", error: err.message });
  }
};

// View User by ID
const viewUserById = (req, res) => {
  User.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
// View User by ID
const activateUserById = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "User Activated successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
// Delete User by ID
const deActivateUserById = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { isActive: false })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "User deactivated successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

// Forgot Password for User
const forgotPassword = (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      password: req.body.password,
    }
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
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

// Reset Password for User
const resetPassword = async (req, res) => {
  let pwdMatch = false;

  await User.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      if (data.password === req.body.oldpassword) pwdMatch = true;
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });

  if (pwdMatch) {
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        password: req.body.newpassword,
      }
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
            msg: "User Not Found",
          });
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          msg: "Data not Updated",
          Error: err,
        });
      });
  } else {
    res.json({
      status: 405,
      msg: "Your Old Password doesn't match",
    });
  }
};

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({ status: 405, msg: "User not found" });
      }

      if (user.password != password) {
        return res.json({ status: 405, msg: "Password Mismatch !!" });
      }

      if (!user.isActive) {
        return res.json({ status: 405, msg: "Your account is deactivated" });
      }
      const token = createToken(user);

      res.json({
        status: 200,
        data: user,
        token,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: 500, msg: "Something went wrong" });
    });
};

//validate

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  console.log("t1", token);
  console.log("secret", secret);
  if (!token) {
    return res.json({ status: 401, msg: "Unauthorized" });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return res.json({ status: 401, messagge: "Unauthorized", err: err });
    }

    req.user = decodedToken.userId;
    next();
    return res.json({ status: 200, msg: "ok", user: decodedToken.userId });
  });
  console.log(req.user);
};

//Login Custome --finished

module.exports = {
  registerUser,
  viewUsers,
  editUserById,
  viewUserById,
  deActivateUserById,
  activateUserById,
  forgotPassword,
  resetPassword,
  login,
  requireAuth,
  upload,
};

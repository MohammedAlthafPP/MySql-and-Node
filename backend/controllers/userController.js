const bcrypt = require("bcrypt");
const ErrorHander = require("../utils/errorHandler");
const db = require("../config/config");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");

module.exports.registerUser = async (req, res, next) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new ErrorHander("Confirmpassword doesn't match", 400));
  }

  const create_Table = `create table if not exists users(id varchar(255) primary key ,name varchar(255) not null,email varchar(255) unique not null,phone varchar(255) not null,role varchar(255) default 'user',password varchar(255) not null)`;
  db.query(create_Table, (err, data) => {
    if (err) {
      return next(
        new ErrorHander("There was something wrong, so try again later", 400)
      );
    }

    if (data) {
      db.query(
        `SELECT email FROM users WHERE email =?`,
        [email],
        async (err, results) => {
          if (err) {
            return next(
              new ErrorHander(
                "There was something wrong, so try again later",
                400
              )
            );
          }
          if (results && results.length > 0) {
            return next(new ErrorHander("user Already Exist", 400));
          }

          let hashedPassword = await bcrypt.hash(password, 10);

          if (email == process.env.ADMIN_EMAIL) {
            db.query(
              `INSERT INTO users SET ?`,
              {
                id: Date.now(),
                name: name,
                email: email,
                phone: phone,
                role: "admin",
                password: hashedPassword,
              },
              (err, results) => {
                if (err) {
                  return next(
                    new ErrorHander(
                      "An error occurred when registering the user",
                      400
                    )
                  );
                } else {
                  return res.status(200).json({
                    success: true,
                    message: "User registerd sucessfully",
                  });
                }
              }
            );
          } else {
            db.query(
              `INSERT INTO users SET ?`,
              {
                id: Date.now(),
                name: name,
                email: email,
                phone: phone,
                password: hashedPassword,
              },
              (err, results) => {
                if (err) {
                  return next(
                    new ErrorHander(
                      "An error occurred when registering the user",
                      400
                    )
                  );
                } else {
                  return res.status(200).json({
                    success: true,
                    message: "User registered sucessfully",
                  });
                }
              }
            );
          }
        }
      );
    }
  });
};

// Login User
module.exports.LoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return next(new ErrorHander("Please Enter Email and Password", 400));
  }

  db.query(`SELECT * FROM users WHERE email =?`, [email], async (err, data) => {
    if (err) {
      return next(new ErrorHander("Please Enter valid the Credentials", 404));
    }

    if (data.length > 0) {
      if (data[0].password) {
        const userPassword = data[0].password;
        const isPasswordMatch = await bcrypt.compareSync(
          password,
          userPassword
        );

        if (!isPasswordMatch) {
          return next(new ErrorHander("Invalid Email or Password", 401));
        }

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const message = `Hi ${data[0].name}, you've been logged in successfully`;
        req.user = data[0];
        sendToken(data[0], 201, res, token, message);
      } else {
        res.status(404).json({
          message: "Please Enter valid the Credentials",
          success: false,
        });
      }
    } else {
      res.status(404).json({
        message: "Please Enter valid the Credentials",
        success: false,
      });
    }
  });
};

// Logged user
module.exports.LoggedUser = async (req, res, next) => {
  db.query(
    `SELECT id,name,email,phone,role FROM users WHERE id =?`,
    [req.params.id],
    (err, data) => {
      if (err) {
        return next(new ErrorHander("Invalid user", 404));
      }

      res.status(200).json({
        success: true,
        user: data[0],
      });
    }
  );
};

//Logout User
exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

// Get ALL USERS
module.exports.getAllUsers = async (req, res, next) => {
  db.query(
    `SELECT id,name,email,phone,role FROM users ORDER BY id DESC `,
    (err, data) => {
      if (err) {
        return next(new ErrorHander("Invalid user", 404));
      }
      let users = JSON.parse(JSON.stringify(data));
      users = users.filter((user) => user.role !== "admin");

      res.status(200).json({
        success: true,
        users,
      });
    }
  );
};

// Delete user
module.exports.deleteUser = async (req, res, next) => {
  db.query(`DELETE FROM users WHERE id=?`, [req.params.id], (err, data) => {
    if (err) {
      return next(new ErrorHander("Invalid user", 404));
    }
    res.status(200).json({
      success: true,
      message: `User Deleted Successfully`,
    });
  });
};


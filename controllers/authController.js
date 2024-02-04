import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name) {
        next("name is required");
      }
      if (!email) {
        next("email is required");
      }
      if (!password) {
        next("password is required and greater than 6 character");
      }
      const exisitingUser = await userModel.findOne({ email });
      if (exisitingUser) {
        next("Email Already Register Please Login");
      }
      const user = await userModel.create({ name, email, password });
      const token = user.createJWT();
      user.save()
      res.status(200).send({
          apiStatues: true,
          data: { token, user },
          message: "User Created Successfully",
      })
    }
    catch (e) {
        res.status(400).send({
            apiStatues: false,
            data: e.message,
            message: "cannot register ",
        });
    }
};

export const loginController = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      //   const user = await userModel.login(req.body.email, req.body.password)
      if (!email || !password) {
        next("Please Provide All Fields");
      }
      const user = await userModel.findOne({ email }).select("+password");
      console.log(user);
      if (!user) {
        next("Invalid Useraname or password");
      }
      const isMatch = await user.comparePassword(password);
      console.log(isMatch)
      if (!isMatch) {
        next("Invalid Useraname or password");
      }
      const token = user.createJWT();
      user.save()
      res.status(200).send({
        apiStatues: true,
        data: { token, user },
        message: "user loggedin",
      })
    }
    catch (e){
      res.status(400).send({
        apiStatues: false,
        data: e.message,
        message: "cannot login ",
      });
    }
};
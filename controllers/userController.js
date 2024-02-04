import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
    try {
        const { name, email, lastName, location } = req.body;
        if (!name || !email || !lastName || !location) {
          next("Please Provide All Fields");
        }
        const user = await userModel.findOne({ _id: req.user.userId });
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.location = location;
      
        await user.save();
        const token = user.createJWT();

        res.status(200).send({
            apiStatues: true,
            data: { token, user },
            message: "Success"
        });
    }
    catch (e){
        res.status(400).send({
            apiStatues: false,
            data: e.message,
            message: "Failed ",
        });
    }
};
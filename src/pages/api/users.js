import dbConnect from "../../../backend/dbconnect.js";
import { userController } from "../../../backend/controllers/user.controller.js";
import User from "../../../backend/models/User.js";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET": {
      const users = await userController.getAllUsers();
      if (users.success) {
        return res.status(200).json(users.data);
      }
      return res.status(500).json({ error: users.error });
    }

    case "POST": {
      const newUser = await userController.createUser(req.body);
      if (newUser.success) {
        return res.status(201).json(newUser.data);
      }
      return res.status(400).json({ error: newUser.error });
    }

    case "PATCH": {
		const { email, paymentStatus } = req.body;
		console.log("PATCH /api/users called with:", email, paymentStatus);

		if (!email || !paymentStatus) {
			return res.status(400).json({ error: "Email and paymentStatus required" });
		}

		const updateResult = await userController.updatePaymentStatus(email, paymentStatus);
		if (updateResult.success) {
			return res.status(200).json({ message: updateResult.message });
		}
		return res.status(400).json({ error: updateResult.error });
	}

  case "PUT": {
    const { email, masterNumber } = req.body;
    
    const masterNumberForUser = await User.findOneAndUpdate(
      {email},
      {$set: { masterNumber } }
      );

    }
  }
}
import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
	// const token = req.header("x-access-token");
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token)
		return res
			.status(403)
			.json({ error: true, message: "Access Denied: No token provided" });
	try {
		const tokenDetails = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_PRIVATE_KEY
		);
		req.user = tokenDetails;
		console.log(tokenDetails);
		next();
	} catch (err) {
		console.log(err);
		res
			.status(403)
			.json({ error: true, message: "Access Denied: Invalid token" });
	}
};

export default auth;

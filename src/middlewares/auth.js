const jwt = require("../lib/jwt");

function auth(request, response, next) {
  try {
    const { authorization: token } = request.headers;
    console.log("token: ", token);
    const validToken = jwt.verify(token);
    console.log("Valid token: ", validToken);

    if (!validToken) throw new Error("You don't authorized");
    next();
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      message: "User not authorized",
      error: error.message,
    });
  }
}
module.exports = auth;

import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);
  
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified token:", verified); 
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};


export const authorize = (roles) => {
  return (req, res, next) => {
    console.log("User role:", req.user.role);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};


// middleware/authorize.js

const authorize = (roles = []) => {
    return (req, res, next) => {
      if (roles.length && (!req.user || !roles.includes(req.user.role))) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }
      next();
    };
  };
  
  export default authorize;
  

module.exports = async (req, res, next) => {
  
    const user_id = 1
    const product_id = 1
    res.locals.user = user_id;
    req.params = product_id
    next();
 
};

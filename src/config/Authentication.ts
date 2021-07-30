export default {
  secret: process.env.JWT_SECRET || 'default',
  expiresIn: process.env.JWT_EXPIRESIN || '1d',
};

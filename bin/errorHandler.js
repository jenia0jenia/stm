const Logger = require('../logger');
const logger = new Logger();

function handler(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') !== 'development' ? err : {};

  logger.error(err);
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
}

module.exports = handler;
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
//morgan在控制台中，显示req请求的信息
var morgan = require('morgan');
var hbs = require('hbs');
var port = process.env.PORT || "9999";

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');

//__dirname变量获取当前模块文件所在目录的完整绝对路径
// 视图引擎设置
app.set('views', path.join(__dirname, '../app/'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
hbs.registerPartials(__dirname + '../app/');


app.use(express.static(path.join(__dirname, '../app')));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.param('user', function(req, res, next, id) {
  User.find(id, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});

app.use("/", function(req, res) {
  var path = req.path;
  var renderUrl = path;
  res.render(renderUrl);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});



module.exports = app;

const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3500;

// سرو کردن مسیرهای استاتیک برای تصاویر بلاگ و محصول
server.use('/image', jsonServer.defaults({ static: path.join(__dirname, 'image') }));

// سایر میدلورها (logger, cors و ...)
server.use(middlewares);

// استفاده از روتر برای API
server.use(router);

// اجرای سرور
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});

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

// ارسال داده‌ها به بخش BuyForm و contact
server.use(jsonServer.bodyParser);

// افزودن داده‌ها به BuyForm
server.post('/buyform', (req, res) => {
  const db = router.db;
  const { namePerson, phone, email, title, comment } = req.body;

  // ایجاد شناسه جدید به صورت خودکار
  const newBuyForm = {
    id: Date.now().toString(),
    namePerson,
    phone,
    email,
    title,
    comment,
  };

  db.get('BuyForm').push(newBuyForm).write();
  res.status(201).json(newBuyForm); // پاسخ موفق
});

// افزودن داده‌ها به بخش contact
server.post('/contact', (req, res) => {
  const db = router.db;
  const { fullName, phone, title, message } = req.body;

  // ایجاد شناسه جدید به صورت خودکار
  const newContact = {
    id: Date.now().toString(),
    fullName,
    phone,
    title,
    message,
  };

  db.get('contact').push(newContact).write();
  res.status(201).json(newContact); // پاسخ موفق
});

// استفاده از روتر برای API
server.use(router);

// اجرای سرور
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});

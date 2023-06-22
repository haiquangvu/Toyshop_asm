var express = require('express');
const ToyModel = require('../model/ToyModel')
const OrderModel = require ('../model/OrderModel')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Product', async(req, res ) => {
  var toy = await ToyModel.find({});
  res.render('Product', { toy: toy });
});
router.get('/order/:id', async (req, res) => {
  var toy = await ToyModel.findById(req.params.id);
  res.render('order', { toy: toy })
})

router.get('/list', async (req, res) => {
  //SQL: SELECT * FROM Book
  var toy = await ToyModel.find({});
  //console.log(books);
  //res.send(books);
  res.render('list', { toy : toy })
})

router.get('/add', (req, res) => {
  res.render('add');
})

router.post('/add', async (req, res) => {
  var toy = req.body;
  await ToyModel.create(toy)
  .then(() => { console.log ('Add new toy succeed !')});
  res.redirect('/Product');
})

router.get('/delete/:id', async (req, res) => {
  var id = req.params.id;
  //SQL: DELETE * FROM Book WHERE id = 'id'
  await ToyModel.findByIdAndDelete(id)
    .then(() => { console.log("Delete toy succeed !") })
    .catch((err) => { console.log(err) });
  res.redirect('/');
})

router.get('/deleteall', async (req, res) => {
  await ToyModel.deleteMany({})
    .then(() => { console.log("Delete all toys succeed !") })
    .catch((err) => { console.log(err) });
  res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
  var toy = await ToyModel.findById(req.params.id);
  res.render('edit', { toy : toy});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  await ToyModel.findByIdAndUpdate(id, {
     name: req.body.name, stock_quantity: req.body.stock_quantity, manufacturer: req.body.manufacturer, size : req.body.size,
     material : req.body.material, price: req.body.price, image: req.body.image
  })
     .then(() => { console.log('Edit toy succeed!') });
  res.redirect('/list');
})


// order
router.post('/confirm', async (req, res) => {
  var order = req.body;
  var name = order.name;
  var quantity = order.quantity;
  var price = order.price;
  var total = order.price * order.quantity;
  console.log("Toy Name: " + name);
  console.log("Price: " + price);
  console.log("Order quantity : " + quantity);
  console.log("Total price: " + total);

  // Lưu thông tin đơn hàng vào cơ sở dữ liệu
  await OrderModel.create({ name: name, quantity: quantity, price: price, total: total })
    .then(() => { console.log('Order saved successfully!'); })
    .catch((err) => { console.log(err); });

  res.render('confirm', { name: name, quantity: quantity, price: price, total: total });
});

// Các tuyến đường khác...

router.get('/orderlist', async (req, res) => {
  // Truy vấn tất cả các đơn hàng từ cơ sở dữ liệu
  var order = await OrderModel.find({});
  res.render('orderlist', { order: order });
});

router.get('/delete1/:id', async (req, res) => {
  var id = req.params.id;
  //SQL: DELETE * FROM Book WHERE id = 'id'
  await OrderModel.findByIdAndDelete(id)
    .then(() => { console.log("Delete order succeed !") })
    .catch((err) => { console.log(err) });
  res.redirect('/orderlist');
})

module.exports = router;
const express = require('express');
const Article = require('./../models/articleModel')
const Order = require('./../models/orderModel')
const User = require('./../models/userModel')

const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const zeroStocks = await Article.find({stock: {$lt: 1}})
  const admin = await User.findOne({status: 'admin'})
  
  const unreadMsg = admin.messages.filter(msg => msg.read === false).length
  const tasks = admin.tasks.filter(task => task.dateCloture === null).length

  res.render('index', {zeroStocks, unreadMsg, tasks});
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {
  const admin = await User.findOne({status: 'admin'})
  const tasks = admin.tasks
  res.render('tasks', {tasks});
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {
  const admin = await User.findOne({status: 'admin'})
  const messages = admin.messages

  res.render('messages', {messages});
});

/* GET Users page. */
router.get('/users-page', async function(req, res, next) {
  const users = await User.find( { status: 'customer'})
  res.render('users', { users });
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {
  const products = await Article.find()

  console.log(products)

  res.render('catalog', { products });
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function(req, res, next) {
  const orders = await Order.find();
  console.log(orders);
  res.render('orders-list', { orders });
});

 /* GET Order detail page. */
router.get('/order-page', async function(req, res, next) {
  const order = await Order.findById(req.query.orderId).populate('articles')
  res.render('order', {order});
});

/* GET chart page. */
router.get('/charts', async function(req, res, next) {
  try {

    const genderedUsers = await User.aggregate([
      { $group: { _id: '$gender', total: { $sum: 1 } } }, {$sort: {'total':-1}}])

    const readMessages = await User.aggregate(
      [
        { 
          $match: { status: 'admin'} 
        },
        {
          $unwind: {
            path: '$messages'
          }
        },
        { 
          $group: { 
            _id: '$messages.read', 
            total: { $sum: 1} 
          }
        },
        {
          $sort: {
            'total': 1
          }
        }
      ]
    )

    const shippedOrders = await Order.aggregate(
      [
        {
          $match: {status_payment: 'validated'}
        },
        {
          $group: {
            _id: '$status_shipment',
            total: { $sum: 1}
          }
        },
        {
          $sort: {
            'total':-1
          }
        }
      ]
    )

    const moneyByMonth = await Order.aggregate(
      [
        {
          $match : {status_payment: 'validated'}
        },
        {
          $group: {
              _id:{ $month: '$date_payment' },
              totalByMonth: { $sum: '$total'}
            }
        },
        {
          $sort: {
            '_id': 1
          }
        }
      ]
    )

    console.log(moneyByMonth)

    res.render('charts', {genderedUsers, readMessages, shippedOrders, moneyByMonth} );
  } catch(err) {
    console.log(err)
  }
});



module.exports = router;

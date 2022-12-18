const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));

})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

const port = 4000;
sequelize
  .sync()
  // .sync({force : true})
  .then((result) => {
    return User.findByPk(1);
  })
  .then(user => {
    if(!user){
      return User.create({name : 'Zuber', email : 'zuber@gmail.com'})
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    console.log(`listening to the ${port}`);
    app.listen(port);
  })
  .catch(err => console.log(err))


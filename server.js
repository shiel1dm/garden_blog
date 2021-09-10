const express = require('express')
const session = require('express-session')
const handle = require('express-handlebars')
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');



const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
  secret: 'test',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}
app.use(session(sess))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'hbs');
app.engine('hbs', handle({
  extname: 'hbs',
  defaultView: 'home',
  layoutDir: __dirname + 'views/layouts'
}));
app.use(routes);
      
// port where app is served
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening to port ${PORT}`))
});


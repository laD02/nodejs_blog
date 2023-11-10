const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const path = require('path')
const port = 5000
const cors = require('cors')

const db = require('./config/db')
const route = require('./routes/index')

app.use(express.static(path.join(__dirname,'public')))
app.use(
  express.urlencoded({
      extended: true,
  }),
);

app.use(cors())

app.use(methodOverride('_method'))
app.use(express.json());
app.use(morgan('combined'))
app.engine('hbs', handlebars({
  extname : '.hbs',
  helpers : {
    sum: (a, b) => a+b
  }
  
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app)
db.connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
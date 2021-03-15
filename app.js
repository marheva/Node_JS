const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const { get404 } = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const aminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', aminRoutes);
app.use(shopRoutes);

app.use(get404);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`The server is running on port ${port}`);
});


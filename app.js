const express = require('express');
const config = require('config');
const mongoose=require('mongoose');
const path = require('path');
const admAboutRoutes = require('./routes/admAboutRouter');

const app = express();

app.use(express.static(path.join(__dirname, 'img')));
// app.use(bodyParser.json());
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
// app.use('/', homeRoutes);
app.use('/api/adm/about', admAboutRoutes);

const PORT = config.get('port') || 5000 ;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`Server is launched. Port: ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start();

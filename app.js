const express = require('express');
const config = require('config');
const mongoose=require('mongoose');

const app = express();
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
// app.use('/api', require('./routes/admin.routes'));
// app.post('/api', (req,res)=>{
//   console.log('works!')
// });

const PORT = config.get('port') || 5000 ;

async function start() {
  try {
    /*await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true
    })*/
    app.listen(PORT, () => console.log(`Server is launched. Port: ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start();

const mongoose = require('mongoose');

function connect(){
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection.on('connected', () => {
    console.log('Connected to DB');
  });
  
  mongoose.connection.on('error', () => {
    console.error('Cannot connect to DB');
  });
}

module.exports = connect;

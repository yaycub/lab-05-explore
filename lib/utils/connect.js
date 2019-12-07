const mongoose = require('mongoose');

function connect(){
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection.on('connected', () => {
  });
}

module.exports = connect;

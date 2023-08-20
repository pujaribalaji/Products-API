const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://alonebalaji152:balaji@cluster0.amoaf8s.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
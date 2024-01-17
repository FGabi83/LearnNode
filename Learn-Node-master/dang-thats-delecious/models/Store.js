const mongoose = require('mongoose'); //mongoose package to interface with MongoDB
mongoose.Promise = global.Promise; //built in ES6 promise, set the mongoose promise property to global
const slug = require('slugs'); //package to create url friendly slugs

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, // removes white space
    required: 'Please enter a store name!' // true or error message
  },
  slug: String,
  description: {
    type: String,
    trim: true
  }, 
  tags: [String]
});

// pre-save hook in MongoDB
storeSchema.pre('save', function(next) {
    if(!this.isModified('name')) {
        next(); // skip it
        return; // stop this function from running
    }
    this.slug = slug(this.name);
    next();
    // TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Store', storeSchema);
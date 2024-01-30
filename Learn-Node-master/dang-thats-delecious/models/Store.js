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
  tags: [String],
  created: {
    type: Date,
    default: Date.now()
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  },
  photo: String
});

// pre-save hook in MongoDB
storeSchema.pre('save', async function(next) {
    if(!this.isModified('name')) {
        next(); // skip it
        return; // stop this function from running
    }
    this.slug = slug(this.name);
    // find other stores that have a slug of wes, wes-1, wes-2, etc.
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`,'i');
    const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
    if(storesWithSlug.length) {
      this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
    }
    next();
    
});

storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 }  }},
    { $sort: { count: -1 }}
  ]);
}

module.exports = mongoose.model('Store', storeSchema);
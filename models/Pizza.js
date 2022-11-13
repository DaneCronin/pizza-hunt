const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


//Creating the Schema:
const PizzaSchema = new Schema(
    {
      pizzaName: {
        type: String,
        required: 'You need to enter a name for the pizza!',
        trim: true
      },
      createdBy: {
        type: String,
        required: true,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      size: {
        type: String,
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
      },
      toppings: [],
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      // prevents virtuals from creating duplicate of _id as `id`
      id: false
    }
  );

//Get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.lenght +1, 0);
});


//create the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export Pizza model
module.exports = Pizza;


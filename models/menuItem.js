const mongoose = require('mongoose');
//const {Schema} = mongoose.Schema;


const menuItemSchema = new mongoose.Schema({
      name: {
        type: String,
      },
      ingredients: {
          type: String,
          enum : ['dosa','samosa','burger']
      }
});

const MenuItemLucky = mongoose.model('MenuItems', menuItemSchema);
module.exports = MenuItemLucky;

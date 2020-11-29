// const mongoose = require('mongoose');
//  const Schema = mongoose.Schema;

// //  create Schema
// const ItemSchema = new Schema ({
// name:
// {
//     type:String,
//     required:true
// }
// });

// module.exports = Item = mongoose.model('item', ItemSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  create Schema
const ItemSchema = new Schema({
   Graph1:{

     question1:{ 
       type: String,
     },
     question2:{ 
      type: String,
    },
    question3:{ 
      type: String,
    },
    question4:{ 
      type: String,
    },
    question5:{ 
      type: Number,
    },
   },
   Graph2:{

    question1:{ 
      type: String,
    },
    question2:{ 
     type: String,
   },
   question3:{ 
     type: String,
   },
   question4:{ 
     type: String,
   },
   question5:{ 
     type: Number,
   },
  },
  Graph3:{

    question1:{ 
      type: Number,
    },
    question2:{ 
     type: Number,
   },
   question3:{ 
     type: Number,
   },
   question4:{ 
     type: Number,
   },
   question5:{ 
     type: Number,
   },
  }

});
module.exports = Item = mongoose.model('item', ItemSchema);

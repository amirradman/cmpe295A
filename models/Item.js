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
       required: true
     },
     question2:{ 
      type: String,
      required: true
    },
    question3:{ 
      type: String,
      required: true
    },
    question4:{ 
      type: String,
      required: true
    },
    question5:{ 
      type: Number,
      required: true
    },
   },
   Graph2:{

    question1:{ 
      type: String,
      required: true
    },
    question2:{ 
     type: String,
     required: true
   },
   question3:{ 
     type: String,
     required: true
   },
   question4:{ 
     type: String,
     required: true
   },
   question5:{ 
     type: Number,
     required: true
   },
  },
  Graph3:{

    question1:{ 
      type: Number,
      required: true
    },
    question2:{ 
     type: Number,
     required: true
   },
   question3:{ 
     type: Number,
     required: true
   },
   question4:{ 
     type: Number,
     required: true
   },
   question5:{ 
     type: Number,
     required: true
   },
  }

});
module.exports = Item = mongoose.model('item', ItemSchema);

const mongoose = require("mongoose");
const { number } = require("yargs");
require("dotenv").config();

const { MONGO_HOST, MONGO_DBNAME } = process.env;
const conn = mongoose.createConnection(
  `mongodb://${MONGO_HOST}/${MONGO_DBNAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// ========================================

// const courseIDs = courses.map((course) => course.id);
// const selections = {};
// courseIDs.forEach((courseID) => {
//   selections[courseID] = [String];
// });

const teamSchema = new mongoose.Schema({
  teamID: {
    type: String,
    required: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
    immutable: false,
  },
  teamName: {
    type: String,
    required: true,
    immutable: false,
  },
  authority: {
    type: Number,
    required: true,
    immutable: false,
  },
  // selections,
});

const Team = conn.model("Team", teamSchema);


const requestSchema = new mongoose.Schema({
  requestID:{ //如:team6_request_1之類
    type: String,
    required: true,
  },
  borrower:{ //租借者，以team為單位
    type: mongoose.Types.ObjectId, ref: "Team",
    required: true,
  },
  sendingTime:{ //發送要求時間
    type: Date,
    required: true,
  },
  status:{
    type: String,
    required: true,
  },
  requestBody:[{ //提的要求
    board:{type: mongoose.Types.ObjectId, ref: "Board",},
    quantity:{type: Number},
  }]
})

const Request = conn.model("Request", requestSchema);

// ========================================

module.exports = {
  Team,
  Request,
  conn,
};

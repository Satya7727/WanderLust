const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongourl = "mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
  console.log("Connected to DB");
}).catch((err)=>{
  console.log(err);
});
async function main(){
  await mongoose.connect(mongourl);
}
const initDB = async ()=>{
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({...obj,owner:"6835b18e941780d1196018cc"}));
  await Listing.insertMany(initData.data);
  console.log("Data was initialised");
}

initDB();
if(process.env.NODE_ENV != "production"){
  require("dotenv").config({ path: "../.env" });
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongourl = process.env.ATLASDB_URL;
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
  initData.data = initData.data.map((obj)=>({...obj,owner:"683b15cf07c6bdc00eb0c0e1"}));
  await Listing.insertMany(initData.data);
  console.log("Data was initialised");
}

initDB();


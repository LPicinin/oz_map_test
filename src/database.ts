import mongoose from 'mongoose';

const env = {
  MONGO_URI: 'mongodb://root:example@localhost:27017/oz-tech-test?authSource=admin',
};

const init = async function() {
  await mongoose.connect(env.MONGO_URI);
};

export default init();

//localhost:27017
//mongodb:27017


//docker-compose up -d
//docker-compose down
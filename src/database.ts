import mongoose from 'mongoose';

const env = {
  MONGO_URI: 'mongodb://root:example@mongodb:27017/oz-tech-test?authSource=admin',
};

const init = async function() {
  console.log("Iniciando conexão com o banco");
  await mongoose.connect(env.MONGO_URI);
  console.log("Banco conectado");
};

export default init();

//localhost:27017
//mongodb:27017


//docker-compose up -d
//docker-compose down
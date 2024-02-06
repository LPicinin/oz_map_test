import mongoose from 'mongoose';

const env = {
  MONGO_URI: 'mongodb://root:example@192.168.5.31:27021/oz-tech-test?authSource=admin',
};

const init = async function() {
  console.log("iniciando conexão com o banco");
  await mongoose.connect(env.MONGO_URI);
  console.log("Banco conectado");
};

export default init();

//localhost:27017
//127.0.0.1:27021
//mongodb:27021
//192.168.5.31:27021


//docker-compose up -d
//docker-compose down
import mongoose from 'mongoose';

const env = {
  MONGO_URI: 'mongodb://root:example@localhost:27017/oz-tech-test?authSource=admin',
};

const init = async function() {
  console.log("iniciando conexão com o banco");
  await mongoose.connect(env.MONGO_URI);
  console.log("Banco conectado");
};

export default init();

//localhost:27017
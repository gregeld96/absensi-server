require('dotenv').config();

const { saveLog } = require('./src/modules/third_party/rabbit.controller');

saveLog();

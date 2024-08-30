const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require('./models/index');
const { User, Role } = require('./models/index');

const apiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig');

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api', apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }

    // const u1 = await User.findByPk(4);
    // const r1 = await Role.findByPk(1);
    // // u1.addRole(r1);
    // const response = await u1.getRoles();
    // console.log(response);
    // const result = await u1.hasRole(r1);
    // console.log(result);
  });
};
prepareAndStartServer();

const forceDatabaseRefresh = false;  

import express from 'express';
import sequelize from './config/connection.js'; 
import routes from './routes/index.js'; 
import bodyParser from 'body-parser';
import triviaRoutes from './routes'; 

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/', triviaRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist'));

app.use(express.json());  
app.use(routes);  

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {  
    console.log(`Server is listening on port ${PORT}`);  
  });
});

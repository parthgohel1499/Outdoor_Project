import express from 'express';
const app = express();
import userRoutes from './source/routes/userRoute';
import adminRoutes from './source/routes/adminRoute';
import categoryRoutes from './source/Admin/Category/categoryroute';
import areaRoutes from './source/Admin/Area/areaRoutes';
import PackageRoutes from './source/Admin/Package/PackageRoutes';
import OrderRoutes from './source/User/OrderRoutes'
import db from './source/config/dbUrl'
import dbConnect from './source/utils/db_Connection';
import cors from 'cors';
import bodyParser from 'body-parser';

//Database Connection
dbConnect.ConnectMongo(db);

app.use(cors());

app.use(bodyParser.json());

//base routes
app.use('/password/api/', userRoutes);

app.use('/admin/api/', adminRoutes);;

app.use('/api/category', categoryRoutes);

app.use('/resource', express.static(__dirname + '/'));

app.use('/api/area', areaRoutes);

app.use('/api/Pacakge', PackageRoutes);

app.use('/api/Orders', OrderRoutes);

app.listen(3030, () => {
    console.log("server started at : 3030");
})
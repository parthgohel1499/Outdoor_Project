import Ordermodel from '../User/Order.model'
import { verifyObjectId } from '../utils/verifyID';
import { hordingsCategory } from '../Admin/Category/CategoryModel';
import { areaModel } from '../Admin/Area/area.model';
import { PackageModel } from '../Admin/Package/PackageModel';

async function addOrder(req, res) {

    try {
        const { CatId, AreaId, FindPackageId, FirstName, LastName, Address, Discription } = req.body;

        if (CatId) {
            if (!verifyObjectId(CatId)) {
                throw new Error("Category Id Is Incorrect !")
            } else {
                const FindCategory = await hordingsCategory.findById({ _id: CatId })

                if (!FindCategory) {
                    throw new Error("This Category Is Not Exist !")
                } else {
                    if (!verifyObjectId(AreaId)) {
                        throw new Error("Area Id Is Incorrect !")
                    } else {
                        const FindArea = await areaModel.findById({ _id: AreaId })
                        if (!FindArea) {
                            throw new Error("This Area Is Not Exist !")
                        } else {
                            if (!verifyObjectId(FindPackageId)) {
                                throw new Error("Package Id Is Incorrect !")
                            } else {
                                const FindPackage = await PackageModel.findById({ _id: FindPackageId })

                                if (!FindPackage) {
                                    throw new Error("This Package Is Not Exist !")
                                } else {

                                    const Order = Ordermodel({
                                        FirstName: FirstName,
                                        LastName: LastName,
                                        Address: Address,
                                        Discription: Discription,
                                        Image: req.file.path,
                                        Category: FindCategory._id,
                                        Area: FindArea._id,
                                        Package: FindPackage._id
                                    })

                                    const saveOrder = await Order.save();

                                    if (!saveOrder) {
                                        res.status(400).send({ message: "Unable to save Order !", status: 400 })
                                    } else {
                                        res.status(200).send({ message: "Order stored Succeffully !", status: 200, data: saveOrder })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            res.status(400).send({ message: "Category Id Is Required !", status: 400 })
        }
    } catch (error) {
        res.status(400).send({ message: error.message, status: 400 });
    }
}


async function getOrders(req, res) {

    try {
        const getOrders = await Ordermodel.find()
            .populate(["Category", "Area", "Package"])

        if (getOrders) {
            res.status(200).send({ message: "get ALl Orders !", data: getOrders });
        } else {
            res.status(400).send({ message: error + "unable to get Orders !" })
        }
    } catch (error) {
        res.status(400).send({ message: error + "something went wrong !", status: 400 })
    }
}


export { addOrder, getOrders }

//area Id : 602f4ff12e49390c5d0af611
//package Id : 603386cfd5189d18776a9427
//category Id : 603343b50461c313606db8bd

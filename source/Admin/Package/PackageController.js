import { verifyObjectId } from '../../utils/verifyID';
import { PackageModel } from './PackageModel';

async function addPackage(req, res, next) {
    try {
        const { Packagename, Price, Duration } = req.body;
        const { id } = req.query
        const Package = new PackageModel({
            Packagename: Packagename,
            Price: Price,
            Duration: Duration,
            createdBy: id
        })

        const isExist = await PackageModel.findOne({ Packagename: Packagename });

        if (!isExist) {
            const AddPackage = await Package.save();
            if (!AddPackage) {
                res.status(400).send({ message: "unable to add package !", status: 400, data: null });
            } else {
                res.status(200).send({ message: "Package is added Successfully !", status: 200, data: AddPackage })
            }
        } else {
            res.status(400).send({ message: "This Package is already exist !" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error !", status: 500, data: null, error });
    }
}

async function viewPackage(req, res, next) {
    try {
        const { packageId } = req.query;

        if (packageId) {
            if (verifyObjectId(packageId)) {
                const getPackage = await PackageModel.findById({ _id: packageId })
                if (!getPackage) {
                    res.status(400).send({ message: "not exist !", status: 400, data: null })
                } else {
                    res.status(200).send({ message: "get package !", data: getPackage });
                }
            } else {
                res.status(400).send({ message: "Incorrect UserId" })
            }
        } else {
            const getAllPackages = await PackageModel.find()

            res.status(200).send({ message: "All packages !", status: 200, data: getAllPackages });
        }
    } catch (error) {
        res.status(500).send({ message: error + "Internal server error !", error });
    }
}

async function deletePackage(req, res, next) {
    try {
        const { packageId } = req.params;

        if (verifyObjectId(packageId)) {
            {
                const findRecord = await PackageModel.findById({ _id: packageId })

                if (!findRecord) {
                    res.status(400).send({ message: "Package not found !", status: 400 });
                } else {
                    const deleteRecord = await PackageModel.deleteOne({ _id: packageId })
                    if (!deleteRecord) {
                        res.status(400).send({ message: "record not found !", status: 400, data: null });
                    } else {
                        res.status(200).send({ message: "Record Deleted Successfully !", status: 200, data: null })
                    }
                }
            }
        } else {
            res.status(500).send({ message: "Incorrect Id !", status: 500, data: null });
        }

    } catch (error) {
        res.status(500).send({ message: "Internal server error !", status: 500, data: null });
    }
}

async function editPackage(req, res, next) {
    try {
        const { packageId } = req.params;

        if (packageId) {
            if (verifyObjectId(packageId)) {
                const { Packagename, Price, Duration } = req.body;

                const filter = { _id: packageId };
                const update = { Packagename: Packagename, Price: Price, Duration: Duration }

                const FindPackage = await PackageModel.findByIdAndUpdate(filter, update, { new: true })

                if (!FindPackage) {
                    res.status(400).send({ message: "Record Not Found !", status: 400, data: null })
                } else {
                    res.status(200).send({ message: "Updated Successfull !", status: 200 });
                }
            } else {
                res.send({ message: "Incorrect UserId !" });
            }
        }
        else {
            res.status(400).send({ message: "Invalid Id !" });
        }
    } catch (error) {
        res.status(500).send({ message: error + "Internal server error !", status: 500, data: null })
    }
}

export { addPackage, viewPackage, deletePackage, editPackage }
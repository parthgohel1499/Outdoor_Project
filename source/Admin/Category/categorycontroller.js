import { hordingsCategory } from './CategoryModel';
import { verifyObjectId } from '../../utils/verifyID';
require('dotenv').config();


async function addcategory(req, res) {

    try {
        console.log("image path : ", req.file);

        const { categoryname, description, hordingsize } = req.body;

        const category = new hordingsCategory({
            categoryname: categoryname,
            description: description,
            hordingsize: hordingsize,
            image: req.file.path
        });

        const isExsist = await hordingsCategory.findOne({ categoryname: categoryname });
        console.log("is exists : ", isExsist);

        if (!isExsist) {
            const addCategory = await category.save()

            if (!addCategory) {
                res.status(400).send({ message: "sorry, unable to add category !", status: 400, data: null })
            } else {
                res.status(200).send({ message: "category added successfully !", status: 200, addCategory });
            }
        } else {
            res.send({ message: "This category is already exist !" })
        }
    } catch (error) {
        res.status(500).send({ message: error + "Internal server error !", status: 500, data: null });
        console.log(error);
    }
}

async function viewCategory(req, res) {

    try {
        const { categoryId } = req.query;

        if (categoryId) {
            if (verifyObjectId(categoryId)) {
                const viewCategory = await hordingsCategory.findById({ _id: categoryId })

                if (!viewCategory) {
                    res.status(400).send({ message: "not exist !", status: 400 });

                } else {
                    res.status(200).send({ message: "category found successfully !", status: 200, viewCategory });
                }
            } else {
                res.status(400).send({ message: "incorrect userId !", status: 400 });
            }
        }
        else {
            const viewAllCategory = await hordingsCategory.find()
            console.log(viewAllCategory);

            if (!viewAllCategory) {
                res.status(400).send({ message: "unable to show category !", status: 400, data: null })
            } else {
                res.status(200).send({ message: "All category", status: 200, data: viewAllCategory })
            }
        }
    } catch (error) {
        res.status(500).send({ message: error + "Internal Server Error !", status: 500 });
    }
}

async function editCategory(req, res) {

    const path = req.file.path;
    console.log("path :", path);

    try {
        const { categoryId } = req.params;

        if (categoryId) {
            if (verifyObjectId(categoryId)) {
                const findId = await hordingsCategory.findOne({ _id: categoryId })
                if (!findId) {
                    res.status(400).send({ message: "This category is not exist !" })
                } else {
                    const { categoryname, description, hordingsize } = req.body;
                    const filter = { _id: categoryId }
                    const update = { categoryname: categoryname, description: description, hordingsize: hordingsize, image: path }

                    await hordingsCategory.updateOne(filter, update)

                    res.status(200).send({ message: "category is updated successfully !", status: 200 });
                }
            } else {
                res.status(400).send({ message: "Enter valid Id !" });
            }
        } else {
            res.status(400).send({ message: "Incorrect Id !" });
        }
    } catch (error) {
        res.status(500).send({ message: error + " ! " + "Internal server error !", status: 500 });
        console.log(error);
    }
}

async function deleteCategory(req, res) {

    try {
        const { categoryId } = req.params;

        if (categoryId) {
            if (verifyObjectId(categoryId)) {

                const remove = { _id: categoryId }
                const deleteCategory = await hordingsCategory.deleteOne(remove)

                if (!deleteCategory) {
                    res.status(400).send({ message: "incorrect id , please enter valid id !", status: 400 });
                } else {
                    res.status(200).send({ message: "category is deleteed successfully !", status: 200 });
                }
            } else {
                res.status(400).send({ message: "This category not exist !", status: 400, data: null });
            }
        } else {
            res.status(400).send({ message: "Incorrect Id !", status: 400 });
        }
    } catch (error) {
        res.status(500).send({ message: error + "something went wrong !", status: 500, error })
    }
}

export { addcategory, viewCategory, editCategory, deleteCategory }
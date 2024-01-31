import { ThingModel } from '../../models/ThingModel.js';

export class ThingController {
    getAll = async (req, res) => {
        const { type } = req.query

        ThingModel.find(type ? { type: type } : {}, { __v: 0 })
            .then(things => res.status(200).json(things))
            .catch(error => res.status(400).json({ error }));
    }


    getById = async (req, res) => {
        const { id } = req.params

        ThingModel.findById(id, '-__v')
            .then(thing => thing ? res.status(200).json(thing) : res.status(404).json({ message: "Not found" }))
            .catch(error => res.status(400).json({ error }));
    }

    create = async (req, res) => {
        //to finish
        const newThing = new ThingModel({
            ...req.body
        })
        newThing.save()
            .then(() => res.status(201).json({ newThing }))
            .catch(error => res.status(400).json({ error }));
    }

    delete = async (req, res) => {
        const { id } = req.params
        ThingModel.findByIdAndDelete(id)
            .then((thing) => { thing ? res.status(200).json({ message: "thing deleted" }) : res.status(404).json({ message: "Not found" }) })
            .catch(error => { return res.status(400).json({ error }) });
    }



    update = async (req, res) => {
        //to finish
        const { id } = req.params
        try {
            const thing = await ThingModel.findByIdAndUpdate(id, req.body, { new: true });
            return thing ? res.status(200).json(thing) : res.status(404).json({ message: "Not found" });
        }
        catch (error) {
            console.log(error.message);
            return res.status(400).json({ error })
        }
    }
}
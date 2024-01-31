import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const things = readJSON('./localData/thing.json')

export class ThingController {
    getAll = async (req, res) => {
        const { type } = req.query
        let response;
        if (type) {
            response = things.filter(
                thing => thing.type.some(t => t.toLowerCase() === type.toLowerCase())
            )
        }
        else {
            response = things;
        }
        return res.json(response);
    }

    getById = async (req, res) => {
        const { id } = req.params
        const thing = things.find(thing => thing.id === id)

        if (thing) return res.json(thing)
        res.status(404).json({ message: 'Thing not found' })
    }

    create = async (req, res) => {
        //to finish
        const newThing = {
            id: randomUUID(),
            ...req.body
        }
        things.push(newThing)
        res.status(201).json(newThing)
    }

    delete = async (req, res) => {
        const { id } = req.params
        const thingIndex = things.findIndex(thing => thing.id === id)
        if (thingIndex === -1) return res.status(404).json({ message: 'Thing not found' })
        things.splice(thingIndex, 1)
        return res.json({ message: 'Thing deleted' })
    }

    update = async (req, res) => {
        //to finish
        const { id } = req.params
        const thingIndex = things.findIndex(thing => thing.id === id)
        if (thingIndex === -1) return res.status(404).json({ message: 'Thing not found' })


        things[thingIndex] = {
            ...things[thingIndex],
            ...req.body,
        }

        return res.json(things[thingIndex])

    }
}
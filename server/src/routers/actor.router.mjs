import { Router } from 'express'
import actorController from '../controllers/actor.controller.mjs'

const router = Router()

router.route('/actors')
    .get((req, res) => {
        req.query?.name ? actorController.searchActor(req, res) : actorController.getAllActors(req, res)
    })
    .post(actorController.addNewActor)

router.route('/actors/:id')
    .get(actorController.getActorById)
    .put(actorController.updateActor)
    .delete(actorController.deleteActorById)

export default router
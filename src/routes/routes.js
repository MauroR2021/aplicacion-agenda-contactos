import { Router } from "express"
import { resolve } from 'path'
const router = Router()

// const ruta = resolve('controllers/contactsController.js')
import contactsController from '../controllers/contactsController.js'

// console.log(ruta);
router.get('/', contactsController.list) //index.ejs

router.post('/', contactsController.filter) //filtrar acorte a la busqueda

router.post('/addContact', contactsController.save) //guardar contacto

router.get('/updateContact/:id', contactsController.edit) // editar contacto

router.post('/updateContact/:id', contactsController.update) // guardar edición de contacto

router.get('/delete/:id', contactsController.delete); // borrar contacto

export default router
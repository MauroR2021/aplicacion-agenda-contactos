import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import mysql from 'mysql'
import myConnection from 'express-myconnection'

// Rutas del servidor
import contactRoutes from './routes/routes.js'

const app = express();

// obtención de la url completa del proyecto
const __dirname = dirname(fileURLToPath(import.meta.url))
// la carpeta de las vistas
app.set('views', join(__dirname, 'views'))
// Motor de plantilla
app.set('view engine', 'ejs') 
// Puerto
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))

// Configuración de conexión con mysql usando el módulo express-myconecction
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'contact'
}, 'single')); 

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(contactRoutes)

// listar archivos estáticos para que el servidor pueda reconocerlos y usarlos
app.use(express.static(join(__dirname, 'public'))) 

app.listen(app.get('port'), ()=>{
    console.log(`servidor corriendo en el puerto ${app.get('port')}`);
});
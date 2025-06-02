import {actualizarUser, deleteVista, eliminarUser, insertarUser, insertarVista, obtenerUser} from './crud';
import {initDatabase} from './database';
import {obtenerUsers} from './crud'; 
import { views } from './models/views';

async function main() {
    await initDatabase()
    const newUser = await insertarUser("walter"," walterG@gmail.com");
    console.log("Usuario Creado",newUser.id);
    const user = await insertarVista ("vista1",newUser.id);
    console.log("Vista De Reporte Productos:",newUser.id);
    const newUser2 = await obtenerUsers();
    const deleteView = await deleteVista(newUser.id);
    console.log("Vista Eliminada",deleteView);
    console.log("consulta de Usuarios",newUser2);
    const newUser3 = await obtenerUser(newUser.id);
    console.log("Consulta individual",newUser3);
    const userUpdate = await actualizarUser(newUser.id,"Pablo","Trump");
    console.log("Usuario Actualizado",userUpdate);
    const userDelete = await eliminarUser(newUser.id);
    console.log("Usuario Eliminado",userDelete);
}

main()
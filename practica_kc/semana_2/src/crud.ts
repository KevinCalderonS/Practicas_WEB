import {user} from "./models/user";
import {AppDataSource} from './data-source';
import { views } from "./models/views";

export const insertarUser = async (nombre: string, correo: string) => {
    const user1 = new user();
    user1.correo = correo;
    user1.nombre = nombre;
    return await AppDataSource.manager.save((user1))
}

export const obtenerUsers = async () => {
    return await AppDataSource.manager.find(user);
}

export const obtenerUser = async (id: number) => {
    return await AppDataSource.manager.findOne(user, {where:{id}});
}


export const actualizarUser = async (id: number, nombre: string, correo: string) => {
    const usuario1 = await obtenerUser(id);
    if (usuario1) {
        usuario1.nombre = nombre;
        usuario1.correo = correo;
        return await AppDataSource.manager.save(usuario1);
    } else {
        return null;
    }
}

export const eliminarUser = async (id: number) => {
    const usuario1 = await obtenerUser(id);
    if (usuario1) {
        return await AppDataSource.manager.remove(usuario1);
    } else {
        return null;
    }
}

export const insertarVista = async (vista: string, userid: number) => {
    const usuario = await obtenerUser(userid);
    if (usuario) {
        const newview = new views();
        newview.vista = vista;
        newview.user = usuario;
        return await AppDataSource.manager.save(newview);
    }
    return null;
}

export const deleteVista = async (id: number) => {
    const vista1 = await AppDataSource.manager.findOne(views, {where:{id}});
    if (vista1) {
        return await AppDataSource.manager.remove(vista1);
    } else {
        return null;
    }
}





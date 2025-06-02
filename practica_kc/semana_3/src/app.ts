import express,{json, Request,Response} from 'express';

const app = express();
app.use(express.json());
interface IUsuario {
    id: number;
  nombre: string;
}

const usuarios: IUsuario[] = []
const puerto=2050

app.get("/usuarios", (req:Request, res:Response) => {
    res.json(usuarios);
})

app.get("/usuarios/:id", (req:Request, res:Response) => {
    const {id}= req.params;
    const {nombre} = req.query;

    const usuarioEncontrado = usuarios.find((usuario) => usuario.id === parseInt(id));
    if(!usuarioEncontrado)
    {
        res.status(404).json({mensaje:"Usuario no encontrado"})
        return
    }
    if (typeof nombre === "string") {
        usuarioEncontrado.nombre = nombre;
    }
    res.status(200).json({ usuarioEncontrado });


})


app.post("/usuarios", (req:Request, res:Response) => {
    const {body} = req;
    usuarios.push(body);
    res.status(201).json(body)
})


app.listen(puerto,()=>{
    console.log(`Servidor iniciado en el puerto ${puerto}`)
})
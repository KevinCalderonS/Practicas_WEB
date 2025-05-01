let mensaje: string="hola mundo";

console.log(mensaje);

const estudiante :IEstudiante={
    id: 2345,
    nombre: "kevin",
    apellido: "calderon",
    correo:"example.com",
    edad: 25
}

interface IEstudiante{
    [x: string]: any;
    
    id: number;
    apellido: string;
    nombre: string;
    correo: string;
    edad: number;
    ciudad?: string;
}

const estudiantes: IEstudiante[] =[
    {
        id: 2345,
        nombre: "kevin",
        apellido: "calderon",
        correo:"example.com",
        edad: 25
    },

    {
        id: 5678,
        nombre: "jose",
        apellido: "calderon",
        correo:"example.com",
        edad: 25
    },

    {
        id: 9087,
        nombre: "roberto",
        apellido: "calderon",
        correo:"example.com",
        edad: 25
    }
]

estudiantes.push({id:2312, nombre:'Felipe', apellido:'Camaron', correo: 'jose.@gmail', edad:32 });

estudiantes.push(estudiante);

function Agregar(estudiantes: IEstudiante):void{
    estudiantes.pussh(estudiante);
}

const estudiante1={id:2, nombre:'carlos', apellido: 'manzaba', correo:' luis@gmail.com', edad:23}
Agregar(estudiante1)    

estudiantes.push(estudiante);
function Agregar2(parm: IEstudiante, callback:(estudiante:IEstudiante)=> void){
    estudiantes.push(parm);
    callback(parm)
}

const estudianteA2: IEstudiante= {id: 2, nombre:'', correo:'', apellido:'', edad:29}

Agregar2(estudianteA2,(param:IEstudiante)=> console.log);

function Agregar3(parm:IEstudiante):Promise<IEstudiante> 
{
    return new Promise ((resolve)=>{
        estudiantes.push(parm); 
        setTimeout(()=>{
            resolve(parm)

        },
        1000
        )
    },
    )
}


// Agregar3(estudiante1).then((estudiante:IEstudiante)=>
//     {
//         console.log(estudiante);
//     })  

async function main (){
    try
    {
        await Agregar3(estudiante1)
    }
    catch(ex)
    {

    }
    finally
    {

    }
}
main()
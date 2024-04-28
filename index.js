import fs from "node:fs"; //Para trabajar con el sistema de archivos
import readline from 'readline'; //Para leer la entrada del usuario desde la consola
import { Buffer } from "node:buffer"; //Para manejar datos binarios
import prompt from 'prompt-sync'; //Para obtener la entrada del usuario de manera sincronica
import colors from "colors";

const rl = readline.createInterface({
  input: process.stdin, //Representa la entrada de datos desde la consola
  output: process.stdout //Representa la salida de datos de la consola
});

const promptFunc = prompt(); 

//Creacion de archivo
const createFile = () => {
    const fileName = promptFunc(colors.blue("Ingrese el nombre del archivo a crear: "));
    const content = promptFunc(colors.green("Ingrese el contenido del archivo: "));
    const dirName = `./files/${fileName}`; //El directorio se crea dentro de la
    const buffer = Buffer.from(content);
    
    try {
        fs.writeFileSync(dirName, buffer);
        console.log(colors.green("El archivo se ha creado correctamente"));
    } catch (error) {
        console.log(colors.red("Lo sentimos, no hemos podido crear el archivo"));
    }
};

const readFile = () => {
    const fileName = promptFunc(colors.blue("Ingrese el nombre del archivo a leer: "));
    const dirName = `./files/${fileName}`;

    try {
        const file = fs.readFileSync(dirName);
        const data = file.toString();
        console.log(colors.green(data));
    } catch (error) { 
        console.log(colors.red("Este archivo no se puede leer"));
    }
};

const updateFile = () => {
    const fileName = promptFunc(colors.blue("Ingrese el nombre del archivo a modificar: "));
    const content = promptFunc(colors.blue("Ingrese el nuevo contenido del archivo: "));
    const dirName = `./files/${fileName}`;
    const buffer = Buffer.from(content);
    
    try {
        fs.writeFileSync(dirName, buffer);
        console.log(colors.green("El archivo se ha modificado correctamente"));
    } catch (error) {
        console.log(colors.red("Lo sentimos, no hemos podido modificar el archivo"));
    }
};

const deleteFile = () => {
    const fileName = promptFunc(colors.blue("Ingrese el nombre del archivo a eliminar: "));
    const dirName = `./files/${fileName}`;

    try {
        fs.rmSync(dirName);
        console.log(colors.green("El archivo se ha eliminado correctamente"));
    } catch (error) {
        console.log(colors.red("Lo sentimos, no hemos podido eliminar el archivo"));
    }
};

const askQuestion = (question) => {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
};

const main = async () => {
    await fileController();
    rl.close(); // Cerrar la interfaz readline cuando terminemos
};

export const fileController = async () => {
    let action;
    do {
        action = await askQuestion(colors.blue("Qué acción desea realizar? (Lectura: R, Edición: E, Creación: C, Eliminar: D, Salir: Q): "));
        action = action.toUpperCase(); 
        console.log("Acción ingresada:", action);
    } while (!(action === "R" || action === "E" || action === "C" || action === "D" || action === "Q"));

    switch (action) {
        case "R":
            readFile();
            break;
        case "E":
            updateFile();
            break;
        case "C":
            createFile();
            break;
        case "D":
            deleteFile();
            break;
        case "Q":
            return;
        default:
            console.log(colors.red("Acción no válida"));
            break;
    }
};


main();

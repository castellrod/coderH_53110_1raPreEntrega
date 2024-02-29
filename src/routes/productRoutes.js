/*import {Router} from 'express'
import path from 'path'
import fs from 'fs'
import __dirname from '../utils.js'*/

// import express from 'express'
// export const router=express.Router()

const express = require('express');
const router = express.Router();
const ProductManager = require('../data/product_manager.js');

const productManager = new ProductManager('products.json');

//export const router=Router()

//let ruta=path.join(__dirname,'data','usuarios.json') 

/*function getUsers(){
    if(fs.existsSync(ruta)){
        return JSON.parse(fs.readFileSync(ruta,'utf-8'))
    }else{
        return []
    }
}

function saveUsers(users){
    fs.writeFileSync(ruta, JSON.stringify(users, null, 5))    
}

router.get("/", (req, res)=>{

    let usuarios=getUsers()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuarios});

})

router.get("/:id", (req, res)=>{

    let id=Number(req.params.id) // porque el id de mi DB es numérico... no siempre se hacer la transform...
    if(isNaN(id)){
        return res.status(400).json({error:"id debe ser numérico"})
    }

    let usuarios=getUsers()
    let usuario=usuarios.find(u=>u.id===id)
    if(!usuario){
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuario});

})
*/

//****GET ****/

router.get('/', (req, res) => {
    const products = productManager.getAllProducts();
    res.json(products);
});


router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.get("/:id", (req, res)=>{

    let id=Number(req.params.id) // porque el id de mi DB es numérico... no siempre se hacer la transform...
    if(isNaN(id)){
        return res.status(400).json({error:"id debe ser numérico"})
    }

    let usuarios=getUsers()
    let usuario=usuarios.find(u=>u.id===id)
    if(!usuario){
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuario});

})



/*
router.post("/",(req, res)=>{

    if(!req.body.nombre){
        return res.status(400).json({
            error:"Complete el nombre"
        })
    }
    console.log(req.body)

    // validaciones... 
    let usuarios=getUsers()

    // asignar id...
    let id=1
    if(usuarios.length>0){
        id=Math.max(...usuarios.map(d=>d.id))+1
    }
    
    let nuevoUsuario={
        id, 
        ...req.body
    }
    

    usuarios.push(nuevoUsuario)

    saveUsers(usuarios)

    // usuariosManger.create()

    res.status(201).json({nuevoUsuario})
})*/


/** POST **/
router.post('/', (req, res) => {
    const productManager = new ProductManager('products.json');
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || status === undefined || !stock || !category || !Array.isArray(thumbnails)) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y deben tener el tipo correcto.' });
    }

    const newProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    productManager.addProduct(newProduct);

    res.status(201).json({ message: 'Producto agregado correctamente', newProduct });
});


/*
router.put("/:id", (req, res)=>{

    let id=Number(req.params.id) // porque el id de mi DB es numérico... no siempre se hacer la transform...
    if(isNaN(id)){
        return res.status(400).json({error:"id debe ser numérico"})
    }

    let usuarios=getUsers()
    let indiceUsuario=usuarios.findIndex(u=>u.id===id)
    if(indiceUsuario===-1){
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    usuarios[indiceUsuario]={
        ...usuarios[indiceUsuario],
        ...req.body,
        id
    }

    saveUsers(usuarios)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuarioModificado:usuarios[indiceUsuario]});

})*/


/*** PUT ***/

router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || status === undefined || !stock || !category || !Array.isArray(thumbnails)) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y deben tener el tipo correcto.' });
    }

    const updatedProduct = {
        id: productId, 
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    const result = productManager.updateProduct(updatedProduct);

    if (result) {
        res.json({ message: 'Producto actualizado correctamente', updatedProduct });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


/*
router.delete("/:id", (req, res)=>{

    let id=Number(req.params.id) // porque el id de mi DB es numérico... no siempre se hacer la transform...
    if(isNaN(id)){
        return res.status(400).json({error:"id debe ser numérico"})
    }

    let usuarios=getUsers()
    let indiceUsuario=usuarios.findIndex(u=>u.id===id)
    if(indiceUsuario===-1){
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    let usuarioEliminado=usuarios[indiceUsuario]
    usuarios.splice(indiceUsuario, 1)

    saveUsers(usuarios)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuarioEliminado});

})*/


/*** DELETE ***/
router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const result = productManager.deleteProductById(productId);

    if (result) {
        res.json({ message: 'Producto ha sido eliminado!!' });
    } else {
        res.status(404).json({ error: 'Producto no existe' });
    }
});


    
module.exports = router;
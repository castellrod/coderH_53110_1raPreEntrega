

const express = require('express');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

/*import express from 'express';
import { router as usuariosRouter } from './routes/usuarios.router.js';*/

const PORT=3000;

const app=express();
//const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//app.use("/api/usuarios", usuariosRouter)

app.use('/api/products', productRoutes);

/*app.use('/carts', cartRoutes);

app.use('/api/carts', cartRoutes);*/

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
const express = require("express");
const mongoose = require("mongoose");
const Flower = require("./module/Flower");


const PORT = 5000;

const app = express()

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/flowers").then(()=>{
    console.log("Успешное подключение к БД");
}).catch((err)=>{
    console.log("Ошибка при подключении к БД: " + err);
})
app.get('/flowers/:id' ,  async(req, res)=>{
    try{
        const {id } = req.params
      
        
        const flowers = await Flower.findById(id)
        // const flowers = await  Flower.find()
        res.json(flowers)
        // console.log(flowers);
        console.log(id);
        // console.log(flowers);
      
        
    }catch(err){
        console.log("ошибка при получении продуктов" + err);
        
    }

})
//////////////////////////////////////////
app.post('/addflowers', async(req, res)=>{
    const {title, description, price, type} = req.body
    const newFlower = await Flower.create({
        title,
        description, 
        price, 
        type
    })
    await newFlower.save()
    res.send("продукт успешно добавлен")
})
////////////////////////////////////
app.patch('/flowers/:id', async( req, res)=>{
    try {
        const {id} = req.params
        const {title, description, price, type} =  req.body
        const UpFlower = await Flower.findByIdAndUpdate(id, {title, description, price, type})
        if(!UpFlower){
            res.send("товар не найден!")
        }
        res.send("данные успешно изменены ")
    } catch (error) {
        console.log("ошибка при изменение данных!" + error);
        
    }
})
//////////////////////////////////
app.delete("/deleteflowers/:id", async (req ,res)=>{
    try {
        const {id } = req.params
        console.log(id);
        const flower= await Flower.findByIdAndDelete(id)
        

        if(!flower){
            res.send("товар не найден")
        }
        res.send("данные успешно удалены!")
    } catch (error) {
        console.log("ошибка при удаленнии" + error);
    }
})
app.listen(PORT, () => {
    console.log("Сервер успешно запущен на порту: " + PORT);
  });
  
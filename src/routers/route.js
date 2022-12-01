const express = require('express');
const userController=require("../controllers/userController");
const movimentoController=require("../controllers/movimentController");
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).send("<h1>CASHBOOK API</h1>");
})

router.get('/user', async (req, res, next)=> {
    user= await userController.get();
    res.status(200).send(user);
});

router.post('/user/login', async (req, res, next)=> {
    user= await userController.login(req.body);
    res.status(200).send(user);
});

router.post('/user/logout', async (req, res, next)=> {
    user= await userController.login(req.headers['x-access-token']);
    res.status(200).send(user);
});

router.get('/moviments', async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
           resp= await movimentoController.get();
           resp = Object.assign({}, resp, auth);
        }else{ 
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)
})

router.post('/mov',async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
            resp= await  movimentoController.post(req.body, req.headers.iduser);
            resp = Object.assign({}, resp, auth);
        }else{
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)   
})

router.put('/mov', async (req, res, next)=>{
    movimento=movimentoController.put(req.body, req.headers.idUser);
})

router.delete('/movimento', async (req, res, next)=>{
    movimento=movimentoController.delete(req.headers.idUser);
})



router.get('/balance', async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
           resp= await movimentoController.getBalance();
        }else{ 
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)
})

router.get('/balance/date', async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
           resp= await movimentoController.getBalanceDate();
        }else{ 
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)
})

router.get('/balance/:year/:month', async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
           resp= await movimentoController.getBalanceYearMonth(req.params.year, req.params.month);
        }else{ 
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)
})

router.get('/balance/:year/:month1/:month2', async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
           resp= await movimentoController.getBalanceYearMonthMonth(req.params.year, req.params.month1, req.params.month2);
        }else{ 
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)
})

router.get('/moviments/:year/:month', async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
           resp= await movimentoController.getMovimentsYearMonth(req.params.year, req.params.month);
        }else{ 
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)
})

module.exports = router;
const movimentoModel = require('../models/movimentModel');

exports.post=async(data,idUser)=>{
    return await movimentoModel.post(data, idUser);
}
exports.get=async()=>{
    return await movimentoModel.get();   
}

exports.put=async(req,res)=>{
    return await movimentoModel.put(data, idUser);
}
exports.delete=async(id)=>{
    return await movimentoModel.delete(id,idUser);
}

exports.getBalance=async()=>{
    return await movimentoModel.getBalance();
}

exports.getBalanceDate=async()=>{
    return await movimentoModel.getBalanceDate();
}

exports.getBalanceYearMonth=async(year, month)=>{
    return await movimentoModel.getBalanceYearMonth(year, month);
}

exports.getBalanceYearMonthMonth=async(year, month1, month2)=>{
    return await movimentoModel.getBalanceYearMonthMonth(year, month1, month2);
}

exports.getMovimentsYearMonth=async(year, month)=>{
    return await movimentoModel.getMovimentsYearMonth(year, month);
}

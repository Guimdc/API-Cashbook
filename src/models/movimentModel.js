const { query } = require("express");
const mysql = require("./mysqlConnect");

get= async (query)=>{
    sql=" SELECT * FROM moviment"
    return await  mysql.query(sql);
}

post= async (date, idUser)=>{
    sql="INSERT INTO moviment"
    +" (description, date, value, user_id, type)"
    +" VALUES "
    +"('"+date.description+"', '"+date.date+"', "+date.value+", "+idUser+", '"+date.type+"')";
    const result = await  mysql.query(sql);
    if(result){
        resp={"status":"OK",insertId:result.insertId};
    }else{
        resp={"status":"Error",insertId:result.insertId};
    }
    return resp;
 }

 put= async (date, idUser)=>{
     sql="UPDATE moviments SET "
     +"description='"+date.description+"', date= '"+date.date+"', value="+date.value+", user_id="+idUser+", type='"+date.type+"'" 
     +" WHERE id= "+date.id
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

 remove = async (idMov, idUser)=>{
    sql="DELETE INTO moviments"
    +" WHERE id="+idMov;
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

//Partes realizadas por Guilherme Machado Dal Castel
getBalance = async (query) =>{
    sql="SELECT (SELECT SUM(value) FROM moviment WHERE type = 'input') AS entrada, (SELECT SUM(value) FROM moviment "+
    "WHERE type = 'output') AS saida, SUM(value) AS saldo FROM moviment LIMIT 1"
    const result = await mysql.query(sql);
    return {"entrada": result[0].entrada, "saida": result[0].saida, "saldo": result[0].saldo};
}

getBalanceDate = async (query) =>{
    sql="SELECT DISTINCT date, (SELECT SUM(value) FROM moviment WHERE date=m.date AND type='input') AS input,(SELECT SUM(value)"+
    "FROM moviment WHERE date=m.date AND type='output') AS output FROM moviment m"
    const result = await mysql.query(sql);
    const result1 = {};

    result.forEach(element => {
        //result1[element.date]={data:element.date,entrada:element.entrada, "saida":element.saida};
        result1[((element.date.getDate() )) + "-" + ((element.date.getMonth() + 1)) + "-" + element.date.getFullYear()]={entrada:element.input, saida:element.output};
        //result1[element.date]={data:element.date,entrada:element.entrada, "saida":element.saida};
    });

    return result1;
}

getBalanceYearMonth = async (year, month) =>{
    sql="SELECT (SELECT SUM(value) FROM moviment WHERE type = 'input' AND year(date) = "+year+" AND month(date) = "+month+") AS entrada,"+
    " (SELECT SUM(value) FROM moviment WHERE type = 'output' AND year(date) = "+year+" AND month(date) = "+month+") AS saida, SUM(value) "+
    "AS saldo FROM moviment WHERE year(date) = "+year+" AND month(date) = "+month+" LIMIT 1"
    const result = await mysql.query(sql);
    return {data: month+"-"+year, "entrada": result[0].entrada, "saida": result[0].saida, "saldo": result[0].saldo};
}

getBalanceYearMonthMonth = async (year, month1, month2) =>{
    //SELECT (SELECT SUM(value) FROM moviment WHERE type = 'input' AND year(date) = 2022 AND month(date) BETWEEN 11 AND 12) AS entrada, 
    //(SELECT SUM(value) FROM moviment WHERE type = 'output' AND year(date) = 2022 AND month(date) BETWEEN 11 AND 12) AS saida, SUM(value) 
    //AS saldo FROM moviment WHERE year(date) = 2022 AND month(date) BETWEEN 11 AND 12 LIMIT 1;
    sql="SELECT (SELECT SUM(value) FROM moviment WHERE type = 'input' AND year(date) = "+year+" AND month(date) BETWEEN "+month1+" AND "+month2+") "+
    "AS entrada, (SELECT SUM(value) FROM moviment WHERE type = 'output' AND year(date) = "+year+" AND month(date) BETWEEN "+month1+" AND "+month2+") "+
    "AS saida, SUM(value) AS saldo FROM moviment WHERE year(date) = "+year+" AND month(date) BETWEEN "+month1+" AND "+month2+" LIMIT 1"
    const result = await mysql.query(sql);
    return {data: month1+"-"+year+" à "+month2+"-"+year,"entrada": result[0].entrada, "saida": result[0].saida, "saldo": result[0].saldo};
}

getMovimentsYearMonth = async (year, month) =>{
    sql="SELECT * FROM moviment WHERE year(date) = "+year+" AND month(date) = "+month+""
    return await mysql.query(sql);
}

module.exports= {get,post, put, remove, getBalance, getBalanceDate, getBalanceYearMonth, getBalanceYearMonthMonth, getMovimentsYearMonth}
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
    sql="SELECT (SELECT SUM(value) FROM moviment WHERE type = 'input') AS entrada, (SELECT SUM(value) FROM moviment WHERE type = 'output') AS saida, SUM(value) AS saldo FROM moviment LIMIT 1"
    return await mysql.query(sql);
}
module.exports= {get,post, put, remove, getBalance}
let User = require('../models/userModel');

exports.userList = function(request,response){
    connection.query("select * from user;", function(error,result) {
        if(error) {
            console.log(error);
        }
        else{
        response.render('userList.ejs',{users: result});
        }
    });
}

exports.userAdd = function(request,response){
    response.render("userAdd.ejs");
}

exports.userNew = function(request,response){
    let user = {"aname":require.body.aname,"qty":require.body.qty}
    connection.query("INSERT INTO user SET ? ",user,  function(error,result){
        if(error) {
            console.log(error);
        }
        else{
        response.redirect('/user');
        }
    });
}

exports.userUpdate = function(request,response){
    let i = require.params.i;
    connection.query("select * from user WHERE iditem = ?;",i, function(error,result) {
        if(error) {
            console.log(error);
        }
        else{
            if(result[0].purchased==1){
            response.render("userUpdate.ejs",{"iditem": result[0].iditem,"aname": result[0].aname,"qty": result[0].qty});
        }else{
            response.render("userUpdate.ejs",{"iditem": result[0].iditem ,"aname": result[0].aname ,"qty": result[0].qty+" Acheté "});
        }}
    });
}

exports.userChange = function(request,response){
    let i = require.body.iditem;
    let user = {"aname":require.body.aname,"qty":require.body.qty}
    connection.query("UPDATE user SET ? WHERE iditem = ?",[user,i],  function(error,result){
        if(error) {
            console.log(error);
        }
        else{
        response.redirect('/user');
        }
    });
}

exports.userDelete = function(request,response){
    let i = require.params.i;
    connection.query("DELETE from user WHERE iditem = ?;",i, function(error,result) {
        if(error) {
            console.log(error);
        }
        else{
            response.redirect("/user");
        }
    });
}

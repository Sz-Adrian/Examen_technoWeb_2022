const { response } = require('express');
let express = require( 'express');

let app = express();

app.use(express.urlencoded({extended : true}));
/*
let router = require('./routes');
app.use('/',router);
*/
var mysql = require('mysql');

var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'Adriancom0906',
    database: 'users'
});
connection.connect(function(error) { if(error) console.log(error);});

app.get('/',(require,response) => {
    response.send("heheheeee");
});

app.get('/user',(require,response) => {
    connection.query("select * from user;", function(error,result) {
        if(error) {
            console.log(error);
        }
        else{
        response.render('userList.ejs',{users: result});
        }
    });
});

app.post('/user/add',(require,response) => {
    response.render("userAdd.ejs");
});

app.post('/user',(require,response) =>{
    let user = {"aname":require.body.aname,"qty":require.body.qty}
    connection.query("INSERT INTO user SET ? ",user,  function(error,result){
        if(error) {
            console.log(error);
        }
        else{
        response.redirect('/user');
        }
    });
});

app.get('/user/update/:i',(require,response) => {
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
    
});


app.post('/user/update',(require,response) =>{
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
});



app.get('/user/delete/:i',(require,response) => {
    let i = require.params.i;
    connection.query("DELETE from user WHERE iditem = ?;",i, function(error,result) {
        if(error) {
            console.log(error);
        }
        else{
            response.redirect("/user");
        }
    });
    
});
app.listen(8000,function(){
    console.log('Is on bruv on 8000');
});
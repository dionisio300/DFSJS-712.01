import express from 'express'
import path from 'path'
import { engine } from 'express-handlebars'
import mysql from 'mysql2'

const porta = 3000
const pastaAtual = process.cwd()
const app = express()

//Inicialização do handlebars
app.engine('hbs', engine({ extname: '.hbs' })) 
app.set('view engine', 'hbs') 
app.set('views', path.join(pastaAtual, 'views')) 

// Servir arquivos estáticos da pasta "public" 
app.use(express.static(path.join(pastaAtual, 'public'))) 



//Comando para receber dados via formulário
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//Inicialização do banco de dados
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'escolatech'
})

conexao.connect(erro => {
    if(erro){
        console.log('Erro ao acessar o Banco de dados: ',erro)
    }else{
        console.log('Banco conectado com sucesso!!')
    }
})

app.get('/',(req, res) => {
    
    res.render('home')
})

app.get('/paginaInicial',(req,res) => {

    res.render('paginaInicial')
})

app.post('/validarUsuario',(req, res) => {
    let user = req.body.usuario
    let senha = req.body.senha

    let sql = `select * from usuarios`

    conexao.query(sql,(erro,resultado) => {
        if(erro){
            console.log(erro)
        }else{
            for (let i = 0; i < resultado.length ; i++){
                if(user == resultado[i].usuario && senha == resultado[i].senha){
                    res.render('paginaInicial')
                }
            }
            console.log('Errou usuario ou senha');
            res.render('home')
        }
    })

    console.log(user,senha);
    
})




app.listen(porta,()=>{
    console.log(`Servidor iniciado na porta ${porta}`)
})
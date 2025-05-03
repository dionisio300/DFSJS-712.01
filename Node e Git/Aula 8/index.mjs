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




app.listen(porta,()=>{
    console.log(`Servidor iniciado na porta ${porta}`)
})
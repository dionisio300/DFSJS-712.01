import express from 'express'
import path from 'path'
import { engine } from 'express-handlebars'

const porta = 3000
const pastaAtual = process.cwd()
const app = express()

//Inicialização do handlebars
app.engine('hbs', engine({ extname: '.hbs' })) 
app.set('view engine', 'hbs') 
app.set('views', path.join(pastaAtual, 'views')) 
// Servir arquivos estáticos da pasta "public" 
app.use(express.static(path.join(pastaAtual, 'public'))) 


//Array
let clientes = []

//Comando para receber dados via formulário
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req, res) => {
    res.render('index')
})


app.post('/respostas',(req,res) => {
    let nome = req.body.nome
    let idade = parseInt(req.body.idade)
    let cnh = req.body.cnh
    let podeDirigir

    if (idade >= 18 && cnh == 'true'){
        podeDirigir = true
    }else{
        podeDirigir = false
    }

    let resposta = {nome:nome, idade:idade, cnh:cnh,podeDirigir:podeDirigir}

    console.log(resposta)
    res.render('resp',{resposta})
})

app.get('/produtos',(req,res) => {
    const produtos = [
            { nome: 'Notebook', preco: 2500 },
            { nome: 'Mouse', preco: 120 },
            { nome: 'Teclado', preco: 200 }
        ]
    res.render('produtos',{ produtos })
})


app.post('/cadastrar-cliente', (req,res)=>{
    console.log('teste')
    let nome = req.body.nome
    let email = req.body.email
    let cpf = req.body.cpf
    let saldo = parseFloat(req.body.saldo)

    let cliente = {
        nome:nome,
        email:email,
        cpf:cpf,
        saldo:saldo
    }
    clientes.push(cliente)
    console.log(clientes)
    res.redirect('/clientes')
})

app.get('/clientes',(req,res) => {
    
    res.send(clientes)
})


app.listen(porta,()=>{
    console.log(`Servidor iniciado na porta ${porta}`)
})


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



//Comando para receber dados via formulário
app.use(express.urlencoded({extended:true}))
app.use(express.json())

let administradores = [
    {nome:'Clara',funcao:'Professora'},
    {nome:'Daniel',funcao:'Professor'},
    {nome:'Gessica',funcao:'Comercial'}
]


app.get('/',(req, res) => {
    let pessoa = {
        nome:'Maria',
        idade:28,
        curso:'JavaScript',
        estudante:false
    }
    res.render('home',{ pessoa })
})

app.get('/teste',(req, res) => {
    res.render('teste')
})

app.get("/admin",(req,res) => {

    res.render('admin',{layout:"admin",administradores})
})


app.listen(porta,()=>{
    console.log(`Servidor iniciado na porta ${porta}`)
})
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

app.get('/cadastrarAlunos',(req,res) => {
    res.render('cadastrarAlunos')
})

app.get('/listarAlunos',(req, res) => {
    let sql = `select * from alunos`
    conexao.query(sql,(erro, resultado) => {
        if(erro){
            console.log(erro)
        }else{
            res.render('listaAlunos',{resultado})
        }
    })
})


app.get('/deletarAluno',(req,res) => {

    let sql = `select * from alunos`
    conexao.query(sql,(erro, resultado) => {
        if(erro){
            console.log(erro)
        }else{
            res.render('deletarAluno',{resultado})
        }
    })

})

app.get('/atualizarNome',(req,res) => {
    let sql = `select * from alunos`
    conexao.query(sql,(erro, resultado) => {
        if(erro){
            console.log(erro)
        }else{
            res.render('atualizarNome',{resultado})
        }
    })
    
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
                    res.render('paginaInicial',{user})
                }
            }
            console.log('Errou usuario ou senha');
            res.render('home')
        }
    })

    console.log(user,senha);
    
})

app.post('/cadastroAlunos',(req,res) => {
    let nome = req.body.nome
    let email = req.body.email

    let sql = `insert into alunos(nome, email) values ("${nome}", "${email}")`

    conexao.query(sql,(erro, resultado) => {
        if(erro){
            console.log(erro)
        }else{
            console.log('Aluno cadastrado com sucesso')
            res.render('paginaInicial')
        }
    })

})

app.post('/deleteAluno',(req,res) => {
    let id = req.body.id
    let sql = `delete from alunos where id = ${id}`
    conexao.query(sql, (erro, resp) => {
        if(erro){
            console.log(erro)
        }else{
           console.log('Deletado com sucesso')
           res.render('paginaInicial')
        }
    })
})


app.post('/atualizaNome', (req,res) => {
    let id = req.body.id
    let nome = req.body.nome

    let sql = `update alunos set nome = '${nome}' where id = ${id}`
    conexao.query(sql,(erro, resp) => {
        if(erro){
            console.log(erro)
        }else{
            console.log('Atualizado')
            res.render('atualizarNome')
        }
    })

})



app.listen(porta,()=>{
    console.log(`Servidor iniciado na porta ${porta}`)
})

create database escolatech;
use escolatech;


create table alunos(
id int primary key auto_increment,
nome varchar(100),
email varchar(100)
);

insert into alunos (nome, email) values
('Ana Silva', 'ana.silva@email.com'),
('Bruno Souza', 'bruno.souza@email.com'),
('Carla Mendes', 'carla.mendes@email.com'),
('Daniel Rocha', 'daniel.rocha@email.com'),
('Eduarda Lima', 'eduarda.lima@email.com'),
('Felipe Santos', 'felipe.santos@email.com'),
('Gabriela Costa', 'gabriela.costa@email.com'),
('Henrique Alves', 'henrique.alves@email.com'),
('Isabela Martins', 'isabela.martins@email.com'),
('João Pedro', 'joao.pedro@email.com');

select * from alunos;














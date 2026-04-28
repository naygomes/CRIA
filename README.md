# CRIA


![Badge](https://img.shields.io/badge/Express.js-1b1d20?style=for-the-badge&logo=expressjs&logoColor=white)
![Badge](https://img.shields.io/badge/jwt-1b1d20?style=for-the-badge&logo=jwt&logoColor=white)
![Badge](https://img.shields.io/badge/Next.js-1b1d20?style=for-the-badge&logo=nextjs&logoColor=white)
![Badge](https://img.shields.io/badge/Tailwind-00bcff?style=for-the-badge&logo=tailwind&logoColor=white)
![Badge](https://img.shields.io/badge/shadcn-00bcff?style=for-the-badge&logo=shadcnui&logoColor=white)



## O que é ?
O CRIA (Central de Resguardo da Infância Assistida) é uma plataforma para acompanhamento de crianças em situação de vulnerabilidade social.


## Status do projeto
  <h4 align="center"> 
	🚧  Projeto em constante evolução...  🚧
  </h4>
 
## Pré-requisitos

- Instalação Node
- Instalação Docker
- Clone o projeto em seu computador:
``` bash
$ git clone https://github.com/naygomes/CRIA.git
```
## Decisões do projeto

### Backend
- *Framework*: Para mais leveza, flexibilidade e vasta adoção na comunidade, o que agiliza o desenvolvimento de rotas RESTful, utilizou-se o framework Express.js;
- *Banco de dados*: Para maior agilidade de prototipação, optou-se por um banco de dados em memória. Graças à arquitetura em camadas, a futura substituição por um banco de dados relacional impactará apenas a camada de repositório.
   *Autenticação*: O controle de acesso é baseado em JSON Web Tokens (JWT), garantindo que a API seja stateless, facilitando o escalonamento horizontal.

### Frontend
- *Framework*: Next.js e React foram escolhidos pelo ecossistema robusto e flexibilidade de renderização. O projeto utiliza componentização forte e Custom Hooks para isolar a lógica de fetching de dados e regras de negócio da camada de visualização.
- *Estilização*: A combinação de Tailwind com Shadcn permite a construção rápida de interfaces acessíveis e consistentes através de componentes utilitários (Tailwind) e componentes pré-construídos e totalmente customizáveis (Shadcn);
- *Linguagem de programação*: Utilizou-se Typescript para toda a parte lógica, visando trazer mais confiabilidade e qualidade para o código;
- *Gráficos*: A biblioteca Chart.js (via react-chartjs-2) foi escolhida para a geração de dashboards dinâmicos.

### Trade-offs 
- Agilidade vs. Persistência: A escolha do banco em memória acelerou o desenvolvimento da PoC, abrindo mão, no curto prazo, da persistência real de dados e integridade transacional que um banco como PostgreSQL ofereceria.
- Tailwind CSS vs. CSS/SCSS Tradicional: O Tailwind aumenta significativamente a velocidade de desenvolvimento e padronização, com o trade-off de tornar as tags HTML mais verbosas.
- Renderização no Cliente (CSR) vs SSR: Por utilizar gráficos interativos e painéis autenticados, grande parte da lógica roda no lado do cliente. Isso simplificou a infraestrutura inicial, mas pode exigir otimizações de Server-Side Rendering (SSR) futuramente caso haja demandas de SEO.

## Como Rodar o projeto

### Configuração de variáveis de ambiente

#### Backend

+ Estando dentro da pasta 'cria/api', faça uma cópia do arquivo *.env.example* e renomeie-o para *.env* ou execute o seguinte comando no terminal:
``` bash
$ cp .env.example .env
```
+ Abra o arquivo *.env* e, no campos existentes, adicione os seguintes valores:
``` bash
PORT=5000
NODE_ENV=development
JWT_SECRET=b1880e6e05b84773223104dd4794ac4919f13213ae8e667dfaa8076be29292e03bdd195cc4c5eb67ad8f4494dbb298ebaab7ee61d927758aa3cd70184548ac59
```

#### Frontend

+ Estando dentro da pasta 'cria/web', faça uma cópia do arquivo *.env.example* e renomeie-o para *.env* ou execute o seguinte comando no terminal:
``` bash
$ cp .env.example .env
```
+ Abra o arquivo *.env* e, no campos existentes, adicione os seguintes valores:
``` bash
NEXT_PUBLIC_API_HOST= "http://localhost:5000"
```

### Execução do projeto

+ Certifique-se de que o Docker está rodando em sua máquina;
   
+ Dentro da pasta raiz (./cria), execute o seguinte comando para servir o projeto:
``` bash
$ docker compose up
```

+ Agora, basta acessar a aplicação clicando no endereço abaixo:

[http://localhost:3000](http://localhost:3000/)

#### Credenciais de teste

- *Email:* tecnico@prefeitura.rio
- *Senha:* painel@2024

  O projeto foi desenvolvido para ser um sistema web versátil, por isso pode ser acessado de qualquer dispositivo, desde smartphones à monitores de alta resolução. 
---

## Próximos passos

Visando a evolução da PoC para um produto que teria mais tempo para ser desenvolvido, os próximos passos seriam:

- Migração para banco de dados relacional, usando uma ORM(Prisma ou TypeORM);
- No frontend, faria o desenvolvimento do estado de carregamento das requests, a fim de dar mais feedback ao usuário;
- Desenvolvimento de testes automatizados, tanto no frontend quando no backend;
- Mais aplicação de boas práticas e padrões de clean code e clean architecture;

## Autora
 
 Nayara Gomes<br/>
 <sub><b>Desenvolvedora</b></sub>

[![Linkedin Badge](https://img.shields.io/badge/-Nayara-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/nayara-gomes-15727756/)](https://www.linkedin.com/in/nayara-gomes-15727756/) 
[![Gmail Badge](https://img.shields.io/badge/-nayara.gomes13@poli.ufrj.br-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:nayara.gomes13@poli.ufrj.br)](mailto:nayara.gomes13@poli.ufrj.br)

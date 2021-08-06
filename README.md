# Marvelovers-Server
Repositório responsável pela API do projeto Marvelovers

### Stack
<div align="center"> 
  <img alt="NestJS" src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
  <img alt="Visual Studio Code" src="https://img.shields.io/badge/VisualStudioCode-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"/>
  <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=red" />
</div>
<br />

1. Preencha o arquivo .env.dev localizado na raiz do projeto baseado no .env.example.

> Para usuários Docker e Docker Compose:

2. Utilize o comando:

```sh
npm run cs:local
```

> Rodando sem Docker Compose:

2. Na raiz do projeto, instale as dependências:

```sh
npm install
```

3. Em seguida rode as migrations e inicie o server.

* Rodando as migrations
```sh
npm run migrate
```
* Iniciando api:
```sh
npm run start:dev
```

## Author

👤 **Emanuel Bessa**
<div align="center">
  <a href="https://github.com/Emanuelbessa" target="_blank" title="Github">
    <img alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  <a href="https://www.linkedin.com/in/emanuel-estrela-bessa/" target="_blank" title="Linkedin">
    <img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
</div>

## License

Licensed under the [MIT license](LICENSE)

# NBA Vue
Implementação da API [balldontlie NBA](https://docs.balldontlie.io/#nba-api) utilizando Vue.js, Typescript, HTML5, CSS, TailwindCSS, Jest e Axios.


<div align="center">
  <a href="https://vuejs.org/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" height="40" alt="vuejs logo" />
  </a>
  <img width="12" />
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo" />
  </a>
  <img width="12" />
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo" />
  </a>
  <img width="12" />
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo" />
  </a>
  <img width="12" />
  <a href="https://tailwindcss.com/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" height="40" alt="tailwindcss logo" />
  </a>
  <img width="12" />
  <a href="https://jestjs.io/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" height="40" alt="jest logo" />
  </a>
  <img width="12" />
  <a href="https://axios-http.com/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" height="40" alt="axios logo" />
  </a>
</div>

![Captura de tela 2025-03-22 122524](https://github.com/user-attachments/assets/7cbab136-07e7-4693-8ded-8d007bd4e575)
![Captura de tela 2025-03-22 122628](https://github.com/user-attachments/assets/43d4932e-02a1-4696-9a82-73aa1543224d)


# Desenvolvimento

### Requisitos
- [Node.js](https://nodejs.org/en/download)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) para instalar as dependências
- [Git](https://git-scm.com/) Para clonar o repositório
- [Docker](https://www.docker.com/) Opcional, para rodar o projeto em um container

### 1. Clonar repositório
```bash
git clone https://github.com/Leo-Felde/nba-vue.git
```

### 2. Instalar dependências
NPM
```bash
npm install
```
Yarn
```bash
yarn install
```


### 3. Configure o .env
Configurar sua chave da API balldontlie no arquivo .env
Crie uma cópia do arquivo `.env.example`, renomei-o para `.env` e coloque sua chave api após o `=`, por exemplo:<br>
```
VITE_API_KEY=40028922-IYUD1-QU3R0-PL4Y5T4T10N
```

### Rodar os testes
```bash
npm run test
```

### Iniciar servidor de desenvolvimento
```bash
npm run dev
```

### Build de produção
```bash
npm run build
```

Preview da build
```bash
npm run preview
```

## Docker
Opcionalmente modifique o arquivo `Dockerfile` para especificar a porta em `ENV VITE_PORT=3000` substituindo 3000 pela porta desejada.

Criar a imagem
```bash
docker build -t nba-vue-app . 
```

Rodar a imagem
```bash
docker run -p 3000:3000 nba-vue-app
```

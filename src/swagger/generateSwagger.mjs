import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import swaggerAutogen from 'swagger-autogen';

const _dirname = dirname(fileURLToPath(import.meta.url))

const doc = {
  info: {
      version: "0.1.0",
      title: "REST API sfxdx_exchange",
      description: "Сервис работы с orders по рыночной или установленной цене"
    },
    host: "127.0.0.1:8080",
    basePath: "/",
    schemes: [
      "http"
    ],
    securityDefinitions: {

    }
}

const options = {
    autoQuery: false,
    autoBody: false
}

// путь и название генерируемого файла
const outputFile = join(_dirname, 'documentation.json');
// массив путей к роутерам
const endpointsFiles = [join(_dirname, '../server.ts')];
swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(({ success }) => {
  console.log(`Generated: ${success}`)
})
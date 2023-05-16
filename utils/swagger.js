// autogen 패키지 불러오기 및 실행
const swaggerAutogen = require("swagger-autogen")();
// 기본 설명 설정 알맞게 채워주세요
const doc = {
  info: {
    "title": "브로콜리 마켓",
    "description": "항해 14기 클론코딩 18조 마켓콜리",
  },
  host: "184.73.136.235/api",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./app.js", //저희 최종 실행 파일인 app.js
];

swaggerAutogen(outputFile, endpointsFiles, doc);

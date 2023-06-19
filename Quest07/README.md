# Quest 07. node.js의 기초

## Introduction

* 이번 퀘스트에서는 node.js의 기본적인 구조와 개념에 대해 알아 보겠습니다.

## Topics

* node.js
* npm
* CommonJS와 ES Modules

## Resources

* [About node.js](https://nodejs.org/ko/about/)
* [Node.js의 아키텍쳐](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174356/node-js%EC%9D%98-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90)
* [npm](https://docs.npmjs.com/about-npm)
* [npm CLI commands](https://docs.npmjs.com/cli/v7/commands)
* [npm - package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
* [How NodeJS Require works!](https://www.thirdrocktechkno.com/blog/how-nodejs-require-works)
* [MDN - JavaScript Modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
* [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
* [require vs import](https://www.geeksforgeeks.org/difference-between-node-js-require-and-es6-import-and-export/)

## Checklist

* node.js는 무엇인가요? node.js의 내부는 어떻게 구성되어 있을까요?
   
   node.js는 자바스크립트의 런타임 환경이다. 
* npm이 무엇인가요? `package.json` 파일은 어떤 필드들로 구성되어 있나요?
   
   node.js에서 사용하는 모듈들을 패키지화하여 모아둔 것을 의미한다. package.json에는 name, version, description, main(로드되는 파일), script, keywords(검색할 때 참조됨), author, license로 구성되어 있다. 이후 모듈을 설치하면 dependencies 안에 해당 모듈의 이름과 버전이 추가된다.
* npx는 어떤 명령인가요? npm 패키지를 `-g` 옵션을 통해 글로벌로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?

  npx는 npm패키지를 한 번만 실행하기 위한 도구로 설치 후 실행이 끝난 뒤 해당 패키지는 삭제된다. -g는 라이브러리 전역에 설치가 되고, 그렇지 않은 경우에는 해당 폴더에만 설치가 된다. 전역으로 설치가 되있다면 매 프로젝트마다 모듈을 설치해 줄 필요가 없다는 장점은 있으나 업데이트를 하는 경우 모든 프로젝트마다 적용이 되기 때문에 결과에 영향을 끼칠 수 있다. 
* 자바스크립트 코드에서 다른 파일의 코드를 부르는 시도들은 지금까지 어떤 것이 있었을까요? CommonJS 대신 ES Modules가 등장한 이유는 무엇일까요?

  CommonJS는 Node.js를 지원하고, CommonJS 모듈 시스템을 지원하는 런타임에서 사용이 가능하다. 또한, 정적 분석에 어렵고 비동기 모듈은 정의가 불가능하기에 ES Modules가 등장하게 되었다.
* ES Modules는 기존의 `require()`와 동작상에 어떤 차이가 있을까요? CommonJS는 할 수 있으나 ES Modules가 할 수 없는 일에는 어떤 것이 있을까요?

  CommonJS의 require()은 어느 지점에서나 호출이 가능하지만 import()는 파일의 시작 부분에서만 실행할 수 있다. 
* node.js에서 ES Modules를 사용하려면 어떻게 해야 할까요? ES Modules 기반의 코드에서 CommonJS 기반의 패키지를 불러오려면 어떻게 해야 할까요? 그 반대는 어떻게 될까요?

   node.js에서 ES Modules를 사용하려면 확장자를 js에서 mjs로 변경하거나 package.json파일 안에 “type:module”를 추가한다.

## Quest

* 스켈레톤 코드에는 다음과 같은 네 개의 패키지가 있으며, 용도는 다음과 같습니다:
  * `cjs-package`: CommonJS 기반의 패키지입니다. 다른 코드가 이 패키지의 함수와 내용을 참조하게 됩니다.
  * `esm-package`: ES Modules 기반의 패키지입니다. 다른 코드가 이 패키지의 함수와 내용을 참조하게 됩니다.
  * `cjs-my-project`: `cjs-package`와 `esm-package`에 모두 의존하는, CommonJS 기반의 프로젝트입니다.
  * `esm-my-project`: `cjs-package`와 `esm-package`에 모두 의존하는, ES Modules 기반의 프로젝트입니다.
* 각각의 패키지의 `package.json`과 `index.js` 또는 `index.mjs` 파일을 수정하여, 각각의 `*-my-project`들이 `*-package`에 노출된 함수와 클래스를 활용할 수 있도록 만들어 보세요.

## Advanced

* node.js 외의 자바스크립트 런타임에는 어떤 것이 있을까요?

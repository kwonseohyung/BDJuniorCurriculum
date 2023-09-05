# Quest 17-F. 번들링과 빌드 시스템

## Introduction

- 이번 퀘스트에서는 현대적 웹 클라이언트 개발에 핵심적인 번들러와 빌드 시스템의 구조와 사용 방법에 대해 알아보겠습니다.

## Topics

- Webpack
- Bundling
  - Data URL
- Transpiling
  - Source Map
- Hot Module Replacement

## Resources

- [Webpack](https://webpack.js.org/)
- [Webpack 101: An introduction to Webpack](https://medium.com/hootsuite-engineering/webpack-101-an-introduction-to-webpack-3f59d21edeba)

## Checklist

- 여러 개로 나뉘어진 자바스크립트나 이미지, 컴포넌트 파일 등을 하나로 합치는 작업을 하는 것은 성능상에서 어떤 이점이 있을까요?

  웹 페이지 요청시 필요한 파일(js, css, html 등)의 크기 및 로딩 시간을 줄일 수 있다.

  - 이미지를 Data URL로 바꾸어 번들링하는 것은 어떤 장점과 단점이 있을까요?

    장점으로는 문서 안에 인라인으로 작성할 수 있도록 하며, 단점으로는 브라우저(오페라11)에 따라서 길이제한이 있다.

- Source Map이란 무엇인가요? Source Map을 생성하는 것은 어떤 장점이 있을까요?

  원본 소스코드와 변환된(컴파일) 소스코드 사이의 매핑정보가 선언된 파일이다. 브라우저 개발자 도구에서는 소스 맵을 적용하여, 디버깅 문제를 빨리 찾아낼 수 있게 한다.

- Webpack의 필수적인 설정은 어떤 식으로 이루어져 있을까요?

  Entry: 번들링을 시작하기 위한 최초의 진입점

  Output: 앤트리를 시작으로 의존되어 있는 모든 모듈을 하나로 묶어 결과물을 만들고, 이 결과물이 위치하는 경로

  Loader: 웹팩은 js밖에 읽지 못하므로, html, css, images 등을 웹팩이 읽을 수 있도록 변환

  - Webpack의 플러그인과 모듈은 어떤 역할들을 하나요?

    ..
    플러그인은 번들에 추가적인 처리를 하고 싶을 때 사용하며 번들링 완료 후 마지막 output시점에 개입한다. 웹팩에서의 모듈은 js파일뿐만 아니라 html, css, images 등 빌드할 때 사용하는 코드를 포함한 모든 리소스를 뜻한다. 이 모듈을 병합하고 압축 하면서 번들을 만들어내 크기가 축소되고 로딩 속도를 개선할 수 있다.

  - Webpack을 이용하여 HMR(Hot Module Replacement) 기능을 설정하려면 어떻게 해야 하나요?

    webpack.config.js 에서 웹팩 devServer의 hot속성을 true로 바꿔주면 module.hot객체가 생성된다. 이 객체의 accept() 메소드에 변경되는 모듈과 콜백함수를 인자로 받아 작성 한 뒤, 다시 실행한다.

## (선택사항) Quest

- 직전 퀘스트의 소스만 남기고, Vue의 Boilerplating 기능을 쓰지 않고 Webpack 관련한 설정을 원점에서 다시 시작해 보세요.
  - 필요한 번들링과 Source Map, HMR 등의 기능이 모두 잘 작동해야 합니다.

## Advanced

- Webpack 이전과 이후에는 어떤 번들러가 있었을까요? 각각의 장단점은 무엇일까요?

# Quest 09. 서버와 클라이언트의 대화

## Introduction

* 이번 퀘스트에서는 서버와 클라이언트의 연동, 그리고 웹 API의 설계 방법론 중 하나인 REST에 대해 알아보겠습니다.

## Topics

* expressJS, fastify
* AJAX, `XMLHttpRequest`, `fetch()`
* REST, CRUD
* CORS

## Resources

* [Express Framework](http://expressjs.com/)
* [Fastify Framework](https://www.fastify.io/)
* [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [MDN - XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
* [REST API Tutorial](https://restfulapi.net/)
* [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
* [MDN - CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Checklist

* 비동기 프로그래밍이란 무엇인가요?

  요청을 보낸 후 응답과 관계없이 다음 동작을 실행하는 것을 의미한다.
  * 콜백을 통해 비동기적 작업을 할 때의 불편한 점은 무엇인가요? 콜백지옥이란 무엇인가요?

     함수의 매개변수로 넘겨준 함수가 콜백함수로 반복되면서 점점 깊어져 감당하기 어려워지는 현상을 의미한다. 가독성이 떨어지고, 에러 처리를 하게 된다면 모든 콜백에서 에러 헨들링을 해야 한다.

  * 자바스크립트의 Promise는 어떤 객체이고 어떤 일을 하나요?

     주로 서버에서 받아온 데이터를 화면에 표시할 때 사용한다. 콜백함수 대신 가독성 있게 사용할 수 있고, 성공 혹은 실패의 경우에 따라 각기 다른 코드를 실행할 수 있도록 한다.
  * 자바스크립트의 `async`와 `await` 키워드는 어떤 역할을 하며 그 정체는 무엇일까요?

     new Promise()를 쓰지 않고, function앞에 async을 작성하면 해당 함수 실행 뒤에 프로미스를 반환한다. await는 async 함수 내에서 작성하여 프로미스가 처리될 때까지 기다리는 역할을 한다. 프로미스가 처리된 후, 다음 코드가 진행된다.
* 브라우저 내 스크립트에서 외부 리소스를 가져오려면 어떻게 해야 할까요?
  * 브라우저의 `XMLHttpRequest` 객체는 무엇이고 어떻게 동작하나요?

     대부분의 웹 브라우저에는 XMLHttpRequest 객체를 내장하고 있으며 XMLHttpRequest는 서버에 요청을 보내고, 서버로부터 XML 데이터를 전송받아 처리하는 데 사용한다.
  * `fetch` API는 무엇이고 어떻게 동작하나요?

    자바스크립트에서 서버로 네트워크 요청을 보내고 응답을 받을 수 있도록 하며 XMLHttpRequest와 달리 Promise 기반으로 구성되어 있다. 파라미터로 요청을 보낼 때 url을 입력하고, then에서 응답 객체 res를 받는다.
* REST는 무엇인가요?

  HTTP프로토콜을 통해 API를 설계하기 위한 아키텍처 스타일이다.
  * REST API는 어떤 목적을 달성하기 위해 나왔고 어떤 장점을 가지고 있나요?

    HTTP 프로토콜의 URL만 보고도 어떤 자원에 접근을 할 것인지 알 수 있어 개발자와 사용자에게 용이하다.
  * RESTful한 API 설계의 단점은 무엇인가요?

    요청을 보낼 수 있는 메소드가 4개(GET, POST, PUT, DELETE)밖에 없다. 또한 use strict 모드에서만 설계가능하다.

* CORS란 무엇인가요? 이러한 기능이 왜 필요할까요? CORS는 어떻게 구현될까요?

  CORS는 Cross-Origin Resource Sharing의 줄임말로 출처(프로토콜+호스트+포트번호)가 다른 자원들을 공유한는 것을 의미한다.

## Quest

* 이번 퀘스트는 Midterm에 해당하는 과제입니다. 분량이 제법 많으니 한 번 기능별로 세부 일정을 정해 보고, 과제 완수 후에 그 일정이 얼마나 지켜졌는지 스스로 한 번 돌아보세요.
  * 이번 퀘스트부터는 skeleton을 제공하지 않습니다!
* Quest 05에서 만든 메모장 시스템을 서버와 연동하는 어플리케이션으로 만들어 보겠습니다.
  * 클라이언트는 `fetch` API를 통해 서버와 통신합니다.
  * 서버는 8000번 포트에 REST API를 엔드포인트로 제공하여, 클라이언트의 요청에 응답합니다.
  * 클라이언트로부터 온 새 파일 저장, 삭제, 다른 이름으로 저장 등의 요청을 받아 서버의 로컬 파일시스템을 통해 저장되어야 합니다.
    * 서버에 어떤 식으로 저장하는 것이 좋을까요?
  * API 서버 외에, 클라이언트를 띄우기 위한 서버가 3000번 포트로 따로 떠서 API 서버와 서로 통신할 수 있어야 합니다.
  * Express나 Fastify 등의 프레임워크를 사용해도 무방합니다.
* 클라이언트 프로젝트와 서버 프로젝트 모두 `npm i`만으로 디펜던시를 설치하고 바로 실행될 수 있게 제출되어야 합니다.
* 이번 퀘스트부터는 앞의 퀘스트의 결과물에 의존적인 경우가 많습니다. 제출 폴더를 직접 만들어 제출해 보세요!

## Advanced

* (선택사항) `fetch` API는 구현할 수 없지만 `XMLHttpRequest`로는 구현할 수 있는 기능이 있을까요?
* REST 이전에는 HTTP API에 어떤 패러다임들이 있었을까요? REST의 대안으로는 어떤 것들이 제시되고 있을까요?

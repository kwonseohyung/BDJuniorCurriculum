# Quest 12. 보안의 기초

## Introduction

- 이번 퀘스트에서는 가장 기초적인 웹 서비스 보안에 대해 알아보겠습니다.

## Topics

- XSS, CSRF, SQL Injection
- HTTPS, TLS

## Resources

- [The Basics of Web Application Security](https://martinfowler.com/articles/web-security-basics.html)
- [Website Security 101](https://spyrestudios.com/web-security-101/)
- [Web Security Fundamentals](https://www.shopify.com.ng/partners/blog/web-security-2018)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Wikipedia - TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security)

## Checklist

- 입력 데이터의 Validation을 웹 프론트엔드에서 했더라도 서버에서 또 해야 할까요? 그 이유는 무엇일까요?

  클라이언트쪽에서 전달되는 데이터는 위변조가 쉽게 때문에 서버에서 값이 위변조가 되었는지, 유효한 값인지 다시 확인해야 한다.

- 서버로부터 받은 HTML 내용을 그대로 검증 없이 프론트엔드에 innerHTML 등을 통해 적용하면 어떤 문제점이 있을까요?

  innerHTML속성은 문자열 자체를 수정할 수 있기 때문에 XSS공격에 취약하다. HTML5부터는 해커가 `<script>` 태그를 사용하여 벌어지는 문제는 해결되었으나 `const name = "<img src='x' onerror='alert(1)'>"; el.innerHTML = name;` 와 같이 우회적으로 script를 실행시킬 수 있다. 따라서 웹페이지의 텍스트 내용만 바꿀 경우에는 innerHTML 대신 textConTent 속성을 사용하는 것이 좋다.

- XSS(Cross-site scripting)이란 어떤 공격기법일까요?

  서버로 보내는 입력값에 자바스크립트를 보내서 자신이 만든 코드를 실행시켜 사용자의 정보를 빼내는 것을 의미한다. 스크립트 내용에 따라서 쿠키나 세션 등의 탈취가 가능하며 자신의 사이트가 XSS를 방어하고 있는지 확인하는 방법은 입력창에 `<script>alert(“script ok”); </script>`를 입력하고 저장한 뒤, 다시 페이지에 들어갔을 때 해당 코드가 실행되는지 확인하여 알 수 있다.

- CSRF(Cross-site request forgery)이란 어떤 공격기법일까요?

  공격자가 만든 악성페이지에 정상적인 사용자가 자신도 모르게 접속하도록 하여 공격자가 의도한 수정, 삭제를 특정 웹사이트에 요청하게 하는 공격기법이다.

- SQL Injection이란 어떤 공격기법일까요?

  악의적인 사용자가 임의의 SQL문을 주입하고 실행되게 하여 DB가 비정상적인 동작을 하도록 조작하는 행위이다.

- 대부분의 최신 브라우저에서는 HTTP 대신 HTTPS가 권장됩니다. 이유가 무엇일까요?

  HTTP는 암호화가 되지 않은 평문 데이터를 전송하는 프로토콜이기 때문에 HTTP에 데이터 암호화가 추가된 프로토콜 HTTPS가 권장되고 있다.

  - HTTPS와 TLS는 어떤 식으로 동작하나요? HTTPS는 어떤 역사를 가지고 있나요?

    HTTPS는 업그레이드된 HTTP/2를 SSL/TLS와 함께 사용되며 TLS는 SSL의 버전 3.0이 국제 표준화 기구인 IETF로 넘어가며 이름이 변경되어 같은 것이라 생각해도 무방하다. 클라이언트가 서버에 접속할 때 랜덤값, 세션아이디, 키교환/대칭키/해시와 같은 알고리즘을 보낸다. 서버에서는 서버가 생성한 랜덤값, CA에서 발급받은 SSL인증서, 서버가 선택한 알고리즘을 보낸다. 이후 클라이언트에서는 받은 인증서를 CA의 공개키로 디코딩하여 신뢰를 확인하고, premaster secret을 전송한다. premaster secret은 서버, 클라이언트가 생성한 랜덤값을 인증서 안에 있는 공개키(서버의 공개키)로 암호화한 것을 의미한다. 서버에서는 자신이 가지고 있는 개인키로 premaster secret를 복호화하여 얻는다. 이후 서버와 클라이언트는 일련의 과정을 거쳐 premaster secret 값을 mster secret, session key를 만들며 이 session key를 이용하여 대칭키 방식으로 암호화하여 전송한다.

  - HTTPS의 서비스 과정에서 인증서는 어떤 역할을 할까요? 인증서는 어떤 체계로 되어 있을까요?

    인증서는 서버가 신뢰할만한지 증명할 수 있으며, 서버 또한 클라이언트에 인증서를 요구할 수 있다. 서버에서 보내는 인증서에는 서버가 발행한 공개키가 포함되어 있어 premaster secret를 만드는 역할을 한다.

## Quest

- 메모장의 서버와 클라이언트에 대해, 로컬에서 발행한 인증서를 통해 HTTPS 서비스를 해 보세요.

## Advanced

- TLS의 인증서에 쓰이는 암호화 알고리즘은 어떤 종류가 있을까요?
- (선택사항) HTTP/3은 기존 버전과 어떻게 다를까요? HTTP의 버전 3이 나오게 된 이유는 무엇일까요?

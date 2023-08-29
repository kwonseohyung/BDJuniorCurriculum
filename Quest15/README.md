# Quest 15. 자동화된 테스트

## Introduction

- 이번 퀘스트에서는 자동화된 테스트에 어떤 장점이 있는지, 어떤 식으로 구축할 수 있는지에 대해 알아보겠습니다.

## Topics

- Automated Test
  - TDD
  - Unit Test
  - Integration Test
  - E2E Test
  - Stub & Mock
- Jest
- Puppeteer
- Mocha

## Resources

- [Unit Test (단위 테스트) 도입하기](https://www.popit.kr/unit-test-%EB%8B%A8%EC%9C%84-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%8F%84%EC%9E%85%ED%95%98%EA%B8%B0-1%ED%8E%B8/)
- [소프트웨어 테스트 안티 패턴](https://velog.io/@leejh3224/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%95%88%ED%8B%B0-%ED%8C%A8%ED%84%B4)
- [End-to-End testing with Puppeteer and Jest](https://medium.com/touch4it/end-to-end-testing-with-puppeteer-and-jest-ec8198145321)
- [Mock & Stub](https://stackoverflow.com/questions/3459287/whats-the-difference-between-a-mock-stub)
- [Mocha](https://ko.javascript.info/testing-mocha)

## Checklist

- 자동화된 테스트를 만드는 것에는 어떤 장점과 단점이 있을까요?

  장점으로는 처리시간이 빠르고, 독를 사용하기 때문에 신뢰할 수 있다. 하지만 부하테스트, 스트레스 테스트 등에 대해서는 자동화 툴에 의해 강제적으로 테스트가 되어야하고 비용이 증가할 수 있다.

  - TDD(Test-Driven Development)란 무엇인가요? TDD의 장점과 단점은 무엇일까요?

    테스트 주도 개발이라고 하며, 만드는 과정에서 우선테스트를 작성하고 이를 통과하는 코드를 만드는 것을 반복하여 피드백을 받는 것을 의미한다. 이로 인해 결함이 줄어들고, 깨끗한 코드가 나와 유지보수 비용이 낮아지지만 개발 시간이 증가한다.

- 테스트들 간의 계층에 따라 어떤 단계들이 있을까요?

  - 유닛 테스트, 통합 테스트, E2E 테스트는 각각 어떤 것을 뜻하나요?

    유닛 테스트는 함수와 같은 작은 단위의 부분을 테스트하는 것, 통합 테스트는 서로 다른 시스템들의 상호작용이 잘 이루어지는지 테스트하는 것을 의미한다. E2E는 사용자의 관점에서 사용자가 사용하는 상황을 가정하고 테스트를 하는 것을 의미한다.

  - 테스트에 있어서 Stub과 Mock은 어떤 개념을 가리키는 것일까요?

    Stub는 가짜 객체를 이용해 실제로 동작하는 것처럼 보이게 만든 객체로, 테스트에서 호출된 요청에 대해 미리 준비해둔 답변을 응답한다. Mock은 호출에 대한 기대를 명세하고, 특정 동작을 수행하는지에 대한 검증을 한다

- Mocha는 어떤 일을 하며 어떻게 사용하는 테스트 프레임워크일까요?

  Mocha는 테스트 코드를 실행시켜주는 Nodejs 테스트 프레임워크이다. test폴더 안에 별도의 파일을 생성하여 테스트할 코드를 require()로 가져와 테스트를 진행한다. mocha <filename>으로 실행할 경우 해당 파일의 테스트가 진행되고, mocha명령어만 입력시 현재 경로의 test폴더의 모든 파일이 실행된다.

- (선택사항) Jest는 어떤 일을 하며 어떻게 사용하는 테스트 프레임워크일까요?

  Jest는 페이스북에서 만들었으며 Jest 라이브러리 안에 Test Runner, Test Mathcer, Test Mock 프레임워크까지 제공된다.

  - Jest 이외의 테스트 프레임워크는 어떤 것이 있고 어떤 장단점이 있을까요?

    Jasmine: 자바스크립트 코드를 테스트하기 위한 프레임워크로 다른 자바스크립트 프레임워크에 의존하지 않으며, DOM이 필요하지 않는다.

    Puppetter: 브라우저 창을 띄우지 않고 백그라운드에서 가상으로 진행되며 자바스크리브만으로 코드를 작성해야 한다.

- (선택사항) Puppeteer는 어떤 일을 하며 어떻게 사용하는 테스트 프레임워크일까요?

## Quest

- 직전 퀘스트의 메모장의 서버와 클라이언트 각 부분
  - Mocha를 이용한 유닛 테스트, 통합 테스트를 추가해보세요.
  - (선택사항) E2E 테스트를 추가해 보세요.
  - `npm test` 명령을 통해 모든 테스트가 돌고 그 결과를 출력할 수 있어야 합니다.

## Advanced

- 테스트의 커버리지는 어떤 개념일까요? 프로젝트에서 테스트의 커버리지는 어떻게 접근하는 것이 좋을까요?

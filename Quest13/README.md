# Quest 13. 웹 API의 응용과 GraphQL

## Introduction

- 이번 퀘스트에서는 차세대 웹 API의 대세로 각광받고 있는 GraphQL에 대해 알아보겠습니다.

## Topics

- GraphQL
  - Schema
  - Resolver
  - DataLoader
- Apollo

## Resources

- [GraphQL](https://graphql.org/)
- [GraphQL.js](http://graphql.org/graphql-js/)
- [DataLoader](https://github.com/facebook/dataloader)
- [Apollo](https://www.apollographql.com/)

## Checklist

- GraphQL API는 무엇인가요? REST의 어떤 단점을 보완해 주나요?

  API를 위한 쿼리언어이며 타입 시스템을 사용하여 쿼리를 실행하는 서버사이드 런타임이다. REST API는 데이터를 가져오는데에 응답마다 다양한 엔드포인트를 가지게 되지만, GraphQL은 하나의 엔드포인트에 다른 쿼리를 요청함으로써 다른 응답을 받을 수 있다.

- GraphQL 스키마는 어떤 역할을 하며 어떤 식으로 정의되나요?

  스키마 정의는 프론트엔드 개발자와 백엔드 개발자가 의사소통을 하는 비용을 줄이고 빠르게 개발을 할 수 있도록 한다.

- GraphQL 리졸버는 어떤 역할을 하며 어떤 식으로 정의되나요?

  리졸버는 스키마에 작성한 타입의 필드 값들을 정의한다. 즉, 특정 필드의 데이터를 반환하는 함수이다. 리졸버는 parent, args, context, info 네 개의 인자를 받는다. parent는 이전/부모 필드의 결과 값이 담겨 있고 이를 통해 체이닝이 일어난다. args는 필드로 넘겨진 인자 값들이 담겨 있으며 주로 비구조화 할당을 통해 사용한다. context는 모든 리졸버 함수에 제공되는 mutable한 객체가 담겨있다. 마지막으로 info는 쿼리와 관련된 특정 필드에 대한 정보가 담겨있다.

  - GraphQL 리졸버의 성능 향상을 위한 DataLoader는 무엇이고 어떻게 쓰나요?

    DataLoader는 data fetch 할때 나타나는 N+1 문제를 batching을 통해 1+1로 변환해주는 library이다.

- 클라이언트 상에서 GraphQL 요청을 보내려면 어떻게 해야 할까요?

  기본적으로 GraphQL에서 정의한 query문, 이를 통해 데이터를 확보하는 작업은 모두 백엔드(server)에서 정적으로 이루어진다.

  - Apollo 프레임워크(서버/클라이언트)의 장점은 무엇일까요?

    Apollo를 통해 접근하게 되면 직접 server에 접속하지 않고도 GraphQL server 내부에 저장되어있는 data에 접근하고 이를 확보할 수 있게 된다.

  - Apollo Client를 쓰지 않고 Vanilla JavaScript로 GraphQL 요청을 보내려면 어떻게 해야 할까요?

    fetch, axios과 같은 데이터 전달 module 및 REST API(GET/POST method) 등 data를 확보할 수 있는 별도의 모듈을 사용해야 한다.

- GraphQL 기반의 API를 만들 때 에러처리와 HTTP 상태코드 등은 어떻게 하는게 좋을까요?

  서버 접속과 요청이 성공한 경우에는 상태코드를 200으로 주고, GraphQL server, resolver가 정의되어 있지 않은 변수와 객체의 경우 이를 반환하는 오류가 필요하다.

## (선택사항) Quest

- 메모장의 서버와 클라이언트 부분을 GraphQL API로 수정해 보세요.

## Advanced

- GraphQL이 아직 제대로 수행하지 못하거나 불가능한 요구사항에는 어떤 것이 있을까요?
- GraphQL의 경쟁자에는 어떤 것이 있을까요?

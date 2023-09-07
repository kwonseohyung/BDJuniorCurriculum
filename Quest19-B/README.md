# Quest 19-B. 서버 아키텍쳐 패턴

## Introduction

- 이번 퀘스트에서는 현대적인 서버 아키텍쳐 패턴에 대해 익혀 보도록 하겠습니다.

## Topics

- Microservice Architecture
- Serverless Architecture
- AWS Lambda
- Service Mesh

## Resources

- [Jeff Bezos의 이메일](https://news.hada.io/topic?id=638)
- [마이크로서비스란?](https://www.redhat.com/ko/topics/microservices/what-are-microservices)
- [AWS Lambda](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/welcome.html)
- [AWS API Gateway](https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/welcome.html)

## Checklist

- 마이크로서비스 아키텍쳐란 무엇일까요? 어떤 식으로 서비스를 구성할 수 있을까요? 어떤 장점을 가지고 있을까요?

  하나의 애플리케이션 내에 있는 기능이 독립적으로 존재할 수 있도록 한다. 따라서 기능수정과 업데이트를 빠르게 진행하고, 자바, 파이썬 등 자유롭게 선택하여 개발이 가능하다.

- 서버리스 아키텍쳐란 무엇일까요? 어떤 식으로 서비스를 구성할 수 있을까요? 어떤 장점을 가지고 있을까요?

  서버리스 아키텍쳐는 서버를 직접 관리할 필요가 없는 아키텍처를 의미한다. 클라우드 서비스 업체가 특정 코드를 실행하는데 필요한 컴퓨팅 리소스와 스토리만 동적으로 할당한다. 또한, 클라우드 제공 기업이 업데이트, 보안 등 모두 관리하며, 사용자는 대기상태를 제외한 실제 사용 자원에 대해서만 비용을 지불한다.

- 많은 마이크로서비스들을 복잡하게 연결할 경우 관리상에 어떤 난점이 생길 수 있을까요? 서비스 메쉬는 무엇이고 이러한 난점을 어떻게 해결하려는 시도일까요?

  마이크로서비스가 늘어나고 서비스 간의 통신이 복잡해지면 장애가 발생했을 때, 발생된 지점을 찾기 어려워 진다. 서비스마다 sidecar프록시를 사용하여 서비스로 들어오거나 나가는 트래픽을 통제할 수 있다. 이렇게 sidecar프록시들을 통해 제어하는 방법을 서비스 메시라고 한다.

## Advanced

- (선택사항) Istio는 어떤 툴일까요? 이 툴을 Kubernetes와 함께 사용하여 어떤 구조를 구현할 수 있을까요?

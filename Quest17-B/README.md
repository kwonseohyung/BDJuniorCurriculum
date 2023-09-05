# Quest 17-B. 배포 파이프라인

## Introduction

- 이번 퀘스트에서는 CI/CD 파이프라인이 왜 필요한지에 대해 다룹니다.

## Topics

- Continuous Integration
- Continuous Delivery

## Resources

- [AWS: Continuous Integration](https://aws.amazon.com/ko/devops/continuous-integration/)
- [AWS: Continuous Delivery](https://aws.amazon.com/ko/devops/continuous-delivery/)

## Checklist

- CI/CD는 무엇일까요? CI/CD 시스템을 구축하면 어떤 장점이 있을까요?

  CI는 '지속적 통합'이라는 뜻으로 자동화된 빌드 및 테스트가 실행된 후, 여러 명의 코드가 중앙에 지속적으로 병합하는 것을 의미한다. CD는 '지속적 제공', '지속적 배포'를 뜻한다. '지속적 제공'은 CI에서 성공적으로 병합이 된 것을 저장소에 업로드하는 것을 의미하며 '지속적 배포'는 병합된 내역뿐만 아니라 배포환경까지 릴리즈 하는 것을 의미한다. CI/CD 시스템으로 여러 개발자의 코드가 충돌하는 것을 방지하고, 빠르게 결함을 찾아 수정 및 배포가 가능하다.

- CI 시스템인 Travis CI, Jenkins, Circle CI, Github Actions, AWS Codebuild 의 차이점과 장단점은 무엇일까요?

  Travis CI: 깃허브와 같은 일반적인 클라우드 레포지토리와 쉽게 연동할 수 있으나 Travis CI 상업용 프로젝트는 유료이다.

  Jenkins: 자바 기반 도구로, JRE만 있으면 작동이 가능하여 자바가 실행되는 모든 운영체제에 설치할 수 있다. 다만, 제공되는 기본 설정이 없어 구성해야 할 것이 많다.

  Github Actions: 별도 설치가 필요없으므로 진입장벽이 낮다. 커스텀은 불가능하여 정해진 규칙으로 사용해야 한다.

  AWS Codebuild: 구축하는데 사용한 시간(분)만큼 요금을 지불하며 다른 AWS서비스와 간단하게 연결할 수 있으나 비용이 높다.

## Advanced

- 빅테크 회사들이 코드를 빌드하고 배포하는 시스템은 어떻게 설계되고 운영되고 있을까요?

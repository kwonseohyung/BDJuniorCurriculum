# Quest 16-B. 컨테이너

## Introduction

- 이번 퀘스트에서는 컨테이너 기술과 그 활용에 대해 알아보겠습니다.

## Topics

- 컨테이너 기술
- Docker
- docker-compose

## Resources

- [#LearnDocker](https://www.docker.com/101-tutorial)
- [Docker Tutorial for Beginners](https://docker-curriculum.com/)
- [docker-compose](https://docs.docker.com/compose/)

## Checklist

- 컨테이너는 어떻게 동작하나요? 다른 배포판을 사용할 수 있게 하는 원리가 무엇일까요?
- 도커 컨테이너에 호스트의 파일시스템이나 네트워크 포트를 연결하려면 어떻게 해야 할까요?

  컨테이너를 실행하기 위한 명령어 'docker run --name 컨테이너명 이미지명'에 p옵션을 부여하여 네트워크 포트를 연결하고, -v옵션을 사용하여 파일시스템을 연결한다.

  `docker run --name 이름 -p 8080:80 -v ~/Desktop/folder:/user/local/apache2/folder httpd` -p옵션으로 호스트의 8080포트와 컨테이너의 80포트와 연결한다. -v옵션으로 호스트의 ~/Desktop/folder와 컨테이너의 folder를 연결한다.

- 도커 컨테이너에서 런타임에 환경변수를 주입하려면 어떻게 해야 할까요?

  docker run을 실행할 때 --env옵션(--env PORT=8000)을 사용하거나 --env -file <환경설정파일>을 작성하여 환경변수를 주입한다.

- 도커 컨테이너의 stdout 로그를 보려면 어떻게 해야 할까요?

  docker log <컨테이너명>을 입력하여 로그를 본다. 컨테이너명 대신 id를 써도 가능하다.

- 실행중인 도커 컨테이너에 들어가 bash 등의 쉘을 실행하고 로그 등을 보려면 어떻게 해야 할까요?

  docker exec </bin/bash> 명령어를 사용하여 컨테이너 외부에서 접근해 코드를 작동시킨다. 단, 컨테이너 내에 /bin/bash가 존재하지 않는다면 접근할 수 없다. 다른 명령어로는 docker attach <컨테이너ID>가 존재한다.

## Quest

- 도커를 설치하고 그 사용법을 익혀 보세요.
- 메모장 시스템 서버를 컨테이너 기반으로 띄울 수 있게 수정해 보세요. (docker-compose는 사용하지 않습니다)
- (선택사항) docker-compose를 사용하여, 이미지 빌드와 서버 업/다운을 쉽게 할 수 있도록 고쳐 보세요.

## Advanced

- 도커 외의 컨테이너 기술의 대안은 어떤 것이 있을까요?
- 맥이나 윈도우에서도 컨테이너 기술을 사용할 수 있는 원리는 무엇일까요?




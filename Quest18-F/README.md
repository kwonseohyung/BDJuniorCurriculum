# Quest 18-F. 프로그레시브 웹앱

## Introduction

- 이번 퀘스트에서는 2021년 현재 웹 프론트엔드의 많은 최신 기술 중 프로그레시브 웹앱에 관해 알아보겠습니다.

## Topics

- Progressive Web App(PWA)
- Service Worker
- Cache & CacheStorage API
- Web Manifest

## Resources

- [MDN - Progressive web apps (PWAs)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [MDN - Progressive web app Introduction](https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps/Introduction)
- [MDN - Service Worker API](https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API)
- [web.dev - Progressive Web Apps](https://web.dev/progressive-web-apps/)

## Checklist

- 웹 어플리케이션을 프로그레시브 웹앱 형태로 만들면 어떤 이점을 가질까요?

  앱과 유사한 외관을 가지고 있으며 앱스토어를 통해 설치할 필요가 없다. 또한, https에서만 사용이 가능하여 보안에 좋다.

- 서비스 워커란 무엇인가요? 웹 워커와의 차이는 무엇인가요?

  서비스 워커는 브라우저가 백그라운드에서 실행하는 스크립트로 웹페이지와는 별개로 작동한다. 앱에서 보내는 http요청을 인터셉트해서 요청에 대한 응답을 반환하거나 응답을 로컬에 캐싱하여 재사용 한다. 웹 워커는 메인스레드와 별도의 스레드를 생성해 계산을 맡긴 후, 다시 메인스레드에 보내어 자원을 효율적으로 사용할 수 있도록 한다.

- PWA의 성능을 높이기 위한 방법론에는 어떤 것들이 있고, 어떤 식으로 적용할 수 있을까요?

  이미지 압축, css 및 js파일 축소, 브라우저 캐싱 사용을 통해 앱의 로딩 시간을 최적화한다. 스크롤 없이 볼 수 있는 콘텐츠의 크기를 축소하고, 주요 페이지를 먼저 로드하여 나머지는 지연되도록 페이지를 구성한다.

## (선택사항) Quest

- 텍스트 에디터 프로그램을 PWA 형태로 만들어 보세요.
  - 필요한 에셋을 적절히 캐싱하되, 버전업이 되었을 때 캐싱을 해제할 수 있는 형태가 되어야 합니다.
  - 해당 PWA를 데스크탑에 인스톨 가능하도록 만들어 보세요.
  - 오프라인인 경우에는 임시저장 기능을 만들어, 온라인인 경우를 감지하여 자동으로 서버에 반영되도록 만들어 보세요.

## Advanced

- 본 퀘스트의 주제로 고려되었으나 분량상 선정되지 않은 주제들은 다음과 같습니다. 시간날 때 한 번 찾아 보세요!
  - Search Engine Optimization(SEO)
  - CSS-in-JS와 Styled Component
  - Server-Side Rendering(SSR)

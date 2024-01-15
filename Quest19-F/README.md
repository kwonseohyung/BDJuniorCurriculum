# Quest 19-F. 웹 어셈블리의 기초

## Introduction

- 이번 퀘스트에서는 2021년 현재 웹 프론트엔드의 많은 최신 기술 중 웹 어셈블리에 관해 알아보겠습니다.

## Topics

- Web Assembly
- Rust

## Resources

- [MDN - 웹어셈블리의 컨셉](https://developer.mozilla.org/ko/docs/WebAssembly/Concepts)
- [MDN - Rust to wasm](https://developer.mozilla.org/ko/docs/WebAssembly/Rust_to_wasm)
- [Learn Rust](https://www.rust-lang.org/learn)
- [Rust - sha2](https://docs.rs/sha2/0.9.5/sha2/)

## Checklist

- 웹 어셈블리란 어떤 기술인가요?

  C, C ++, Rust 등의 언어를 컴파일해서 바이너리 형식으로 바꿔주는 기술을 의미한다. wasm파일은 이미 컴파일이 되어 있는 상태이기 때문에 실행 시간이 빠르다.

- 웹 어셈블리 모듈을 웹 프론트엔드 상에서 실행시키려면 어떻게 해야 할까요?

  먼저, C, C++, Rust 등의 언어로 작성된 코드를 웹 어셈블리 모듈로 변환한다. 변환된 웹 어셈블리 모듈을 fetch API 혹은 WebAssembly.instantiateStreaming API 등을 통해 프론트엔드에서 로딩한다. 마지막으로 WebAssembly.instantiate API를 사용하여 인스턴스를 생성하고 원하는 함수를 호출하여 웹 어셈블리 모듈을 실행한다.

- Rust란 어떤 특징을 가진 프로그래밍 언어인가요?

  Rust는 소유권을 통해 메모리 안정성을 보장하는 특징을 가지고 있다. 모든 객체는 변수에 바인딩 되어 있고, 각 변수는 그 객체의 소유자라고 한다. 이 소유권이 다른 스코프로 전달될 때 소유권이 이전되는데 이때 자동으로 메모리가 할당 및 처리가 된다.

- 웹 어셈블리 모듈을 만드는 방법에는 어떤 것들이 있나요?

  C/C++로 작성된 코드는 Emscipten, Rust는 Cargo도구를 통해 웹 어셈블리로 변환하거나 어셈블리 언어로 작성한다.

- 웹 어셈블리가 할 수 없는 작업에는 무엇이 있을까요? 웹 어셈블리는 어떤 목적에 주로 쓰이게 될까요?

  게임, 그래픽스, 비디오 및 등과 같이 높은 계산 요구 사항을 가진 웹 애플리케이션에서 사용되며 기존의 js코드 일부를 변환하여 속도를 높일 것이다.

## (선택사항) Quest

- 텍스트 에디터 프로그램에서 각 탭의 내용의 SHA-256 해시를 실시간으로 계산하여 화면 아래에 표시해 보세요.
  - 해당 해시는 Rust로 작성된 웹 어셈블리 함수를 통해 계산되어야 합니다.
  - 순수 자바스크립트로 계산할 때와의 퍼포먼스 차이를 체크해 보세요. (퍼포먼스 차이를 알아보는 데에 어떤 전략들이 있을까요?)

## Advanced

- 웹 어셈블리 바이너리는 어떻게 구성되어 있을까요?

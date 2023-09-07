# Quest 16-F. 컴포넌트 기반 개발

## Introduction

- 이번 퀘스트에서는 Vue.js 프레임워크를 통해 컴포넌트 기반의 웹 클라이언트 개발 방법론을 더 자세히 알아보겠습니다.

## Topics

- Vue.js framework
- vuex
- Virtual DOM

## Resources

- [Vue.js](https://vuejs.org)
  - [Lifecycle Hooks](https://v3.vuejs.org/guide/composition-api-lifecycle-hooks.html)
  - [State Management](https://v3.vuejs.org/guide/state-management.html)
  - [Virtual DOM](https://v3.vuejs.org/guide/optimizations.html#virtual-dom)

## Checklist

- Vue.js는 어떤 특징을 가지고 있는 웹 프레임워크인가요?

  컴포넌트 기반의 프레임워크로 UI를 하나의 파일이 아닌 여러 컴포넌트를 조합하여 화면을 나타낸다. 필요한 컴포넌트를 조합하여 화면에 나타내기 때문에, 재사용이 가능하고 가독성도 좋아진다. 또한, 화면의 요소를 제어하는 코드와 제어로직을 분리하여 코드를 직관적으로 이해 및 유지 보수가 쉬워진다.

  - Vue.js는 내부적으로 어떤 식으로 동작하나요?

- Vue.js에서의 컴포넌트란 무엇인가요?

  html태그가 들어가는 `<template>` 과 `<style>`,`<script>` 로 구성되어 있으며, 여러 컴포넌트의 조합으로 화면을 구현해내는 작은 블럭이다.

  - Vue 컴포넌트의 라이프사이클은 어떤 식으로 호출되나요?

    -beforeCreate: 컴포넌트를 초기화한다. <br>
    -created: 데이터와 이벤트가 활성화된다.<br>
    -beforeMount: `<template>`태그가 실행된 후, 초기 렌더링이 일어나기 전에 실행된다.<br>
    -mounted: 모든 화면이 렌더링 된 후에 실행되며 컴포넌트된 돔에 접근 및 수정이 가능하다.<br>
    -beforeUpdate: 컴포넌트 데이터가 변경되고 업데이크 사이클이 시작될 때 실행된다.<br>
    -updated: 컴포넌트 데이터가 변경되어 돔이 재렌더링 된 후 실행된다.<br>
    -beforeDestory: 해체 직전에 실행된다.(컴포넌트는 여전히 남아있다.)<br>
    -destoryed: 컴포넌트가 해체된 후 호출된다.<br>

- 컴포넌트 간에 데이터를 주고받을 때 단방향 바인딩과 양방향 바인딩 방식이 어떻게 다르고, 어떤 장단점을 가지고 있나요?

  단방향 바인딩은 데이터를 props를 이용하여 상위컴포넌트에서 하위컴포넌트로 보내는 것을 의미하며, 코드를 이해하기 쉽다는 장점을 가지고 있다. 그러나 변화를 감지하고 화면을 업데이트 하는 코드를 매번 작성해줘야한다.
  양방향 바인딩은 v-model를 사용함으로써 코드량을 줄여주고 유지보수가 쉬우나, 변화에 따라 돔 전체를 렌더링해주거나 데이터를 바꿔주므로 성능이 감소될 수 있다.

- Vue.js 기반의 웹 어플리케이션을 위한 상태관리 라이브러리에는 어떤 것이 있을까요? 이러한 상태관리 툴을 사용하는 것에는 어떤 장단점이 있을까요?

  vuex, pinia가 존재하며, 데이터 전달과 이벤트 통신으로 한 곳에서 관리하므로 컴포넌트간 데이터 흐름을 파악하기 쉬워진다. 단점으로는

## Quest

- Vue.js를 통해 메모장 시스템을 다시 한 번 만들어 보세요.
  - 어떤 컴포넌트가 필요한지 생각해 보세요.
  - 각 컴포넌트별로 해당하는 CSS와 자바스크립트를 어떤 식으로 붙여야 할까요?
  - Vue.js 시스템에 타입스크립트는 어떤 식으로 적용할 수 있을까요?
  - 컴포넌트간에 데이터를 주고받으려면 어떤 식으로 하는 것이 좋을까요?
  - `vue-cli`와 같은 Vue의 Boilerplating 기능을 이용하셔서 세팅하시면 됩니다.

## Advanced

- React와 Angular는 어떤 프레임워크이고 어떤 특징을 가지고 있을까요? Vue와는 어떤 점이 다를까요?
- Web Component는 어떤 개념인가요? 이 개념이 Vue나 React를 대체하게 될까요?
- Reactive Programming이란 무엇일까요?

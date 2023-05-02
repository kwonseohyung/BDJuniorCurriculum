# Quest 04. OOP의 기본

## Introduction

* 이번 퀘스트에서는 바닐라 자바스크립트의 객체지향 프로그래밍에 대해 알아볼 예정입니다.

## Topics

* 객체지향 프로그래밍
  * 프로토타입 기반 객체지향 프로그래밍
  * 자바스크립트 클래스
    * 생성자
    * 멤버 함수
    * 멤버 변수
  * 정보의 은폐
  * 다형성
* 코드의 재사용

## Resources

* [MDN - Classes](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)
* [MDN - Inheritance and the prototype chain](https://developer.mozilla.org/ko/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
* [MDN - Inheritance](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Inheritance)
* [Polymorphism](https://medium.com/@viktor.kukurba/object-oriented-programming-in-javascript-3-polymorphism-fb564c9f1ce8)
* [Class Composition](https://alligator.io/js/class-composition/)
* [Inheritance vs Composition](https://woowacourse.github.io/javable/post/2020-05-18-inheritance-vs-composition/)

## Checklist

* 객체지향 프로그래밍은 무엇일까요?

    공통적인 속성과 기능을 객체형태로 묶어 하나로 관리하며, 이를 기반으로 객체들을 생성하고 각 클래스에 맞게 상속 및 재정의를 통해 프로그램을 설계하는 것을 의미한다.
  * `#`로 시작하는 프라이빗 필드는 왜 필요한 것일까요? 정보를 은폐(encapsulation)하면 어떤 장점이 있을까요?

    클래스 내부에서만 값이 보여지고 변경이 가능해진다. 은폐를 하면 외부의 무분별한 변수 변경을 막고, 보안이 유지되는 장점이 있다. 
  * 다형성이란 무엇인가요? 다형성은 어떻게 코드 구조의 정리를 도와주나요?

    부모클래스의 속성, 메소드를 모두 적용하는 것을 의미한다. 똑같은 내용을 다시 작성할 필요가 없으며 새로 추가가 가능하다. 다만, 부모클래스로부터 받은 내용은 수정이 불가하다. 
  * 상속이란 무엇인가요? 상속을 할 때의 장점과 단점은 무엇인가요?

    부모클래스의 속성, 메소드를 모두 적용하는 것을 의미한다. 똑같은 내용을 다시 작성할 필요가 없으며 새로 추가가 가능하다. 다만, 부모클래스로부터 받은 내용은 수정이 불가하다. 
  * OOP의 합성(Composition)이란 무엇인가요? 합성이 상속에 비해 가지는 장점은 무엇일까요?

    합성은 다른 클래스의 필요한 메소드를 따로 인스턴스 변수에 저장하여 사용하는 것을 의미한다. 다른 클래스와 밀접한 관련없이, 한 기능만 사용해야한다면 상속보단 합성을 사용하여 불필요한 기능이 상속되는 것을 막을 수 있다.
* 자바스크립트의 클래스는 어떻게 정의할까요?

    클래스를 정의하는 방법으로는 클래스의 이름과 class키워드를 사용한 클래스 선언식, 이름이 없을 수도 있는 클래스 호출식이 있다. 클래스에서 constructor 메소드는 유일한 것으로 인스턴스를 생성하고 클래스 필드를 초기화할 수 있게 한다. 
  * 프로토타입 기반의 객체지향 프로그래밍은 무엇일까요?

    배열은 배열의 함수(ex. push(), pop())와 프로퍼티를, 객체는 객체의 함수와 프로퍼티를 사용할 수 있다. 이렇듯 본인이 정의하지 않아도 이미 있는 상위 객체를 참조할 수 있으며 이때의 상위 객체를 프로토타입이라고 한다. 
  * 자바스크립트의 클래스는 이전의 프로토타입 기반의 객체지향 구현과 어떤 관계를 가지고 있나요?

    자바스크립트에서 함수로 객체를 생성하게 되면, 해당 함수에 constructor자격을 부여하여 new를 통해 새로운 객체를 생성할 수 있게 된다. 또, 함수의 생성자와 프로토타입 링크(__ _proto_ __)를 속성으로 가진 프로토타입 객체가 생성된다. 함수와 객체는 prototype이라는 속성을 통해 연결되어 속성과 메소드를 추가하고 클래스처럼 사용할 수 있다.
   


## Quest

* 웹 상에서 동작하는 간단한 바탕화면 시스템을 만들 예정입니다.
* 요구사항은 다음과 같습니다:
  * 아이콘은 폴더와 일반 아이콘, 두 가지의 종류가 있습니다.
  * 아이콘들을 드래그를 통해 움직일 수 있어야 합니다.
  * 폴더 아이콘은 더블클릭하면 해당 폴더가 창으로 열리며, 열린 폴더의 창 역시 드래그를 통해 움직일 수 있어야 합니다.
  * 바탕화면의 생성자를 통해 처음에 생겨날 아이콘과 폴더의 개수를 받을 수 있습니다.
  * 여러 개의 바탕화면을 각각 다른 DOM 엘리먼트에서 동시에 운영할 수 있습니다.
  * (선택사항) Drag & Drop API를 사용하지 말고, 실제 마우스 이벤트(mouseover, mousedown, mouseout 등)를 사용하여 구현해 보세요!

## Advanced

* 객체지향의 역사는 어떻게 될까요?
* (선택사항) Smalltalk, Java, Go, Kotlin 등의 언어들로 넘어오면서 객체지향 패러다임 측면에서 어떤 발전이 있었을까요?

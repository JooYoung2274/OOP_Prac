# 간단한 mud_game 설계 및 구현

## 리팩토링 이력

-   20230522
    -   Express로 런타임 환경에서 @Injectable() 데코레이터를 통해 자동으로 의존성 주입되게 구현함
    -   https://joorrr.tistory.com/25 - [Express 환경에서 DI 프레임워크 만들기]
    -   https://joorrr.tistory.com/27 - [객체지향적으로 머드게임 만들기 - 직접만든 DI 프레임워크로 리팩토링]
-   다음엔 solid원칙 중 5원칙인 DIP 구조로 구현할 수 있게 리팩토링 예정

## 개발 환경

-   Node.js (ver. 16.14.2)

## 실행 방법

```bash
# 다운로드 받은 폴더로 경로 이동
$ cd mud_game-oop-solid-main

# 의존성 설치
$ npm install

# run
$ npm run dev
```

-   객체 다이어그램

![](https://velog.velcdn.com/images/joo0/post/93f735bf-f14d-43a6-956c-3fff0501d09d/image.png)

-   프로그램 설계 및 구현에 대한 내용
    -   https://joorrr.tistory.com/11

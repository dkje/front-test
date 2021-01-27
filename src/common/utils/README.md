# fetchSpotInitialState

- Spot reducer가 공통적으로 갖는 state를 정의했습니다.

# fetchStateUtils

- Spot api와 관련된 Reducer 작성 시 중복되는 로직을 처리하는 함수 유틸입니다.
  - AsyncThunk에 Trottle을 적용하는 함수
  - 동기 처리 후 promise type에 따라 실행되는 resolver를 생성하는 함수

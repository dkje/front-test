# Structure

\feature
　\style.scss: svg 하위 추가될 dom에 적용될 style
　\[components].tsx: chart
　\[reduxModule].ts: toolkit 기반 redux module

## State Management(Redux, Redux-toolkit)

- redux의 보일러 플레이트를 축소하고,
  가독성을 높이기 위해 toolkit을 함께 사용했습니다.
- Async fetch 요청은 Throttle을 적용해 2초당 1회 요청 가능합니다.

## Components

Layout
── Info(prop:data)
└─ Chart(prop: data)

- Layout: 마운트 시 5초 간격으로 dispatch를 시작하고, 언마운트 시 interval을 clear합니다
- Chart: d3 components, prop으로 전달받은 data가 변경될때마다 chart에 적용합니다
- Info: 차트 밖에 표시되는 data를 처리합니다.
  memo를 적용해 prop에 변경이 있을시에만 재 렌더링합니다.

### InformaticsChart

- inact_agent, host, cpu_core, rtime api를 사용합니다.
- 각 api는 개별 호출될 경우를 위해 각각의 redux module에서 관리됩니다.

### RacingBarChart

- active 관련 api를 사용합니다.
- d3차트는 재 렌더링을 방지하기 위해 memo후 재 렌더링 조건을 false로 정의했습니다.
  1. 화면 크기가 변경되었을시(반응형 적용)
  2. data가 변경됐을 시(d3 update event)
     svg 내부 dom을 d3의 method로 별도 관리합니다.

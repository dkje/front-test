# Structure

\feature
　\style.scss: svg 하위 추가될 dom에 적용될 style
　\[components].tsx: chart
　\[reduxModule].ts: toolkit 기반 redux module

## State Management(Redux, Redux-toolkit)

- redux의 보일러 플레이트를 축소하고,
  ducks 패턴으로 가독성을 높이기 위해 toolkit을 함께 사용했습니다

## Components

layout
── info(prop:data)
└─ chart(prop: data)

- layout: mount시 interval dispatch를 시작하고 unmount시 interval을 clear합니다
- chart: d3 기반 chart components
  prop으로 전달받은 data가 변경될때마다 chart에 적용합니다
- info: memo를 적용해 prop에 변경이 있을시에만 재 렌더링합니다

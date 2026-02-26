export interface TestQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    text: string;
    value: number;
  }[];
}

export const TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    question: '주말이 왔다! 주말 동안 제일 하고 싶은 일은?',
    options: [
      { label: 'A', text: '사람 많은 곳에서 친구들과 모임', value: 0 },
      { label: 'B', text: '혼자 카페에서 책 읽기', value: 1 },
      { label: 'C', text: '운동이나 액티비티 하기', value: 2 },
      { label: 'D', text: '집에서 넷플릭스 몰아보기', value: 3 },
    ],
  },
  {
    id: 2,
    question: '아... 갈등이 생겼다. 나라면 어떻게 대처할까?',
    options: [
      { label: 'A', text: '바로 이야기해서 풀고 싶다', value: 0 },
      { label: 'B', text: '시간을 두고 생각한다', value: 1 },
      { label: 'C', text: '감정이 먼저 나온다', value: 2 },
      { label: 'D', text: '논리적으로 정리해서 말한다', value: 3 },
    ],
  },
  {
    id: 3,
    question: '모처럼 쉬는 날! 여행을 간다면 당신의 스타일은?',
    options: [
      { label: 'A', text: '완벽한 계획표 작성', value: 0 },
      { label: 'B', text: '큰 틀만 정하고 즉흥적으로', value: 1 },
      { label: 'C', text: '현지에서 상황 따라 움직임', value: 2 },
      { label: 'D', text: '누군가 계획해주면 따라감', value: 3 },
    ],
  },
  {
    id: 4,
    question: '연인이 지쳐보인다... 이럴 때 나는 어떻게 할까?',
    options: [
      { label: 'A', text: '그냥 옆에 있어준다', value: 0 },
      { label: 'B', text: '해결 방법을 제시한다', value: 1 },
      { label: 'C', text: '같이 공감하며 감정을 나눈다', value: 2 },
      { label: 'D', text: '분위기를 바꿔준다', value: 3 },
    ],
  },
  {
    id: 5,
    question: '내가 선호하는 연인과의 연락 빈도는?',
    options: [
      { label: 'A', text: '자주 연락해야 안정된다', value: 0 },
      { label: 'B', text: '하루 몇 번이면 충분하다', value: 1 },
      { label: 'C', text: '바쁠 땐 연락 없어도 이해한다', value: 2 },
      { label: 'D', text: '연락보단 직접 만나는 게 더 중요하다', value: 3 },
    ],
  },
  {
    id: 6,
    question: '모처럼 하는 데이트! 제일 하고 싶은 코스는?',
    options: [
      { label: 'A', text: '액티비티 체험', value: 0 },
      { label: 'B', text: '분위기 좋은 레스토랑 가기', value: 1 },
      { label: 'C', text: '산책하며 대화하기', value: 2 },
      { label: 'D', text: '집에서 영화 보기', value: 3 },
    ],
  },
  {
    id: 7,
    question: '사랑을 표현할 때의 나는 어떨까?',
    options: [
      { label: 'A', text: '말로 표현한다', value: 0 },
      { label: 'B', text: '행동으로 챙긴다', value: 1 },
      { label: 'C', text: '시간을 함께 보낸다', value: 2 },
      { label: 'D', text: '스킨십으로 표현한다', value: 3 },
    ],
  },
  {
    id: 8,
    question: '나의 소비 성향을 한 문장으로 하면?',
    options: [
      { label: 'A', text: '지금 행복이 중요하다', value: 0 },
      { label: 'B', text: '저축과 계획이 우선이다', value: 1 },
      { label: 'C', text: '경험에 투자하는 게 좋다', value: 2 },
      { label: 'D', text: '상황에 따라 다르다', value: 3 },
    ],
  },
  {
    id: 9,
    question: '나에게 연애란?',
    options: [
      { label: 'A', text: '삶의 중심', value: 0 },
      { label: 'B', text: '삶의 중요한 부분', value: 1 },
      { label: 'C', text: '즐거운 선택', value: 2 },
      { label: 'D', text: '자연스럽게 흘러가는 것', value: 3 },
    ],
  },
  {
    id: 10,
    question: '연애에서 가장 중요한 것은?',
    options: [
      { label: 'A', text: '설렘', value: 0 },
      { label: 'B', text: '안정감', value: 1 },
      { label: 'C', text: '성장', value: 2 },
      { label: 'D', text: '편안함', value: 3 },
    ],
  },
];

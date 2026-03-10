const questionImageModules = import.meta.glob<string>('../assets/images/pixel_question_*.png', {
  eager: true,
  as: 'url',
});

const QUESTION_IMAGE_URLS: Record<number, string> = {};
Object.entries(questionImageModules).forEach(([path, url]) => {
  const match = path.match(/pixel_question_(\d+)\.png/);
  if (match) {
    const index = parseInt(match[1], 10);
    QUESTION_IMAGE_URLS[index + 1] = url; // 0 → 질문 1
  }
});

export interface TestQuestion {
  id: number;
  question: string;
  imageUrl?: string;
  options: {
    label: string;
    text: string;
    value: number;
  }[];
}

export const TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    question: '주말이 왔ㄷr..☆ ㄴH 에너ㅈl를 충전ㅎr는 방법은..?',
    imageUrl: QUESTION_IMAGE_URLS[1],
    options: [
      { label: 'A', text: '왁자지껄 칭구들ㅇl랑 하이루! 번개 모임ㅎr기', value: 0 },
      { label: 'B', text: '조용한 ㅋr페에서 혼ㅈr만의 독서 んı간 갖긔..', value: 1 },
      { label: 'C', text: '에너ㅈl 뿜뿜! 몸을 격렬ㅎr게 움직여보긔-☆', value: 2 },
      { label: 'D', text: '침대랑 한 몸 되어 넷플릭스 몰아보긔 (완소♡)', value: 3 },
    ],
  },
  {
    id: 2,
    question: '연인과 갈등ㅇl 생겼을 때.. ㄴHㄱr 선택한 대처 방싴은?',
    imageUrl: QUESTION_IMAGE_URLS[2],
    options: [
      { label: 'A', text: '답답한 건 못 참ㅇr! 그 자리에서 바로 대화ㅎr기', value: 0 },
      { label: 'B', text: '생각 정ㄹl할 んı간ㅇl 필요ㅎH.. 조용히 생각ㅎr기', value: 1 },
      { label: 'C', text: '잘잘못보ㄷr는 ㄴH 서운한 맘부터 알아주긔..ㅠ', value: 2 },
      { label: 'D', text: '감정은 ㅃH고 논ㄹl적으로 따져보기 (즐-!)', value: 3 },
    ],
  },
  {
    id: 3,
    question: '여행 당일..☆ ㄴHㄱr 꿈꾸는 여행 스ㅌr일은?!',
    imageUrl: QUESTION_IMAGE_URLS[3],
    options: [
      { label: 'A', text: '엑셀로 1분 1초까ㅈl 꼼꼼ㅎr게 계획 짜긔', value: 0 },
      { label: 'B', text: '큰 틀만 정ㅎr고 나머ㅈl는 느낌 알잖ㅇr-?', value: 1 },
      { label: 'C', text: '계획은 ㅅr치.. 발길 닿는 대로 움직ㅇl긔', value: 2 },
      { label: 'D', text: 'ㄴr는 그냥 따라갈게.. 너만 믿는ㄷr-☆', value: 3 },
    ],
  },
  {
    id: 4,
    question: '연인ㅇl 유독 ㅈl쳐 보일 때.. んı간을 ㄴH서 ㄴHㄱr 건네는 위로는?',
    imageUrl: QUESTION_IMAGE_URLS[4],
    options: [
      { label: 'A', text: '"ㅁrㄴl 힘들었ㅈl..?" 눈물나게 따뜻한 공감해주긔..ㅠ', value: 0 },
      { label: 'B', text: '"이건 이렇게 해ㅂr" ㄴr만 믿으ㄹr구-! 해결책 주기', value: 1 },
      { label: 'C', text: '말없ㅇl 꽉 안아주며.. 세상 끝까ㅈl 곁을 지켜주긔..☆', value: 2 },
      { label: 'D', text: '"맛난 거 먹으러 가ㅈr!" 우울한 기분 싹- 날려주긔', value: 3 },
    ],
  },
  {
    id: 5,
    question: 'ㄴHㄱr 생각ㅎr는 ㄴ너와ㄴr의 가장 완벽한 연락 んı간은..?',
    imageUrl: QUESTION_IMAGE_URLS[5],
    options: [
      { label: 'A', text: '아침부터 잘 때까ㅈl.. 일상을 쉴 새 없ㅇl 공유ㅎr기', value: 0 },
      { label: 'B', text: '할 일 ㅎrㄷrㄱr 여유 생길 때.. 틈틈ㅇl 연락ㅎr긔-☆', value: 1 },
      { label: 'C', text: '바빠도 믿으ㄴlㄲr.. 연락 없어도 쿨ㅎr게 이해해주기', value: 2 },
      { label: 'D', text: '연락보단 직접 만나서 함께하는 んı간에 올인ㅎr기', value: 3 },
    ],
  },
  {
    id: 6,
    question: '둘만의 데이트 하는 날-! 어떤 んı간을 보내고 싶어..?',
    imageUrl: QUESTION_IMAGE_URLS[6],
    options: [
      { label: 'A', text: '요즘 젤루 핫한 곳 탐방ㅎr며 예쁜 추억(인증샷) 남기긔', value: 0 },
      { label: 'B', text: '분위기 좋은 레스토랑에서 입ㅇl 즐거운 んı간 갖기', value: 1 },
      { label: 'C', text: '한적한 공원 산책ㅎr며.. 가슴 깊은 대화 나누긔-☆', value: 2 },
      { label: 'D', text: '편하게 배달 음식 시켜 먹으며.. 집에서 뒹굴거리긔', value: 3 },
    ],
  },
  {
    id: 7,
    question: 'ㅅr랑을 표현할 때.. ㄴH 마음을 듬뿍 담아 んı간을 쓰는 방식은?',
    imageUrl: QUESTION_IMAGE_URLS[7],
    options: [
      { label: 'A', text: '"ㅅr랑ㅎH", "고마워"처럼 아낌없ㅇl 말로 표현ㅎr기', value: 0 },
      { label: 'B', text: '말보단 행동-☆ 필요한 걸 슬쩍 챙겨주는 츤데레 되긔', value: 1 },
      { label: 'C', text: '바빠도 んı간을 내서.. 온전ㅎl 너에게만 집중ㅎr긔..', value: 2 },
      { label: 'D', text: '손잡긔, 포옹ㅎr기.. ㄲl쟁ㅇl처럼 자연스러운 스킨십', value: 3 },
    ],
  },
  {
    id: 8,
    question: 'ㄴr의 소ㅂl 성향.. 쇼핑할 んı간도 없는 ㄴr를 정의한다면..?',
    imageUrl: QUESTION_IMAGE_URLS[8],
    options: [
      { label: 'A', text: '오늘만 산ㄷr! 눈에 밟히는 건 일단 지르고 보긔', value: 0 },
      { label: 'B', text: '가계부는 필수-☆ 티끌 모아 태산 만드는 짠순/짠돌이', value: 1 },
      { label: 'C', text: '물건보단 여행이나 콘서트 같은 경험에 んı간 투자ㅎr기', value: 2 },
      { label: 'D', text: '평소엔 100원도 아끼ㅈl만.. 꽂히는 순간 폭풍소ㅂl-☆', value: 3 },
    ],
  },
  {
    id: 9,
    question: 'ㄴH 인생 전체를 100%ㄹr고 할 때.. 연애의 비중은 어느 정도일ㄲr..?',
    imageUrl: QUESTION_IMAGE_URLS[9],
    options: [
      { label: 'A', text: '내 삶의 0순위.. 연애ㄱr 곧 ㄴH 행복의 원동력ㅇl긔-☆', value: 0 },
      { label: 'B', text: '서로의 일상을 공유ㅎr며.. 예쁜 ㅅr랑의 균형 맞추긔♡', value: 1 },
      { label: 'C', text: '연애는 삶의 일부일 뿐.. ㄴr만의 んı간도 소중ㅎrㄴlㄲr..', value: 2 },
      { label: 'D', text: '비중 따윈 상관없어.. 인연ㅇl 흐르는 대로 맡기긔-훗', value: 3 },
    ],
  },
  {
    id: 10,
    question: '연애를 통해 ㄴHㄱr 가장 얻고 싶은 소중한 んı간은..?',
    imageUrl: QUESTION_IMAGE_URLS[10],
    options: [
      { label: 'A', text: '만날 때ㅁrㄷr ㈎슴 터질 듯한.. 짜릿한 열정 느끼긔-☆', value: 0 },
      { label: 'B', text: '세상 누구도 못 건드ㄹl는.. 내 편ㅇl 생기는 든든함-훗', value: 1 },
      { label: 'C', text: '서로의 부족함을 채워주며.. 긍정적ㅇl게 성장ㅎr긔..☆', value: 2 },
      { label: 'D', text: '아무 말 안 해도 잠ㅇl 솔솔 오는.. 안락한 편안함-♡', value: 3 },
    ],
  },
];

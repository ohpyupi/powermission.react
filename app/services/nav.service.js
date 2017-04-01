export default class NavService {
	constructor() {
		this.main = [
			{
				parentName: '소개',
				stateName: 'introduction',
				children: [
					{
						name: "예배안내",
						url: "/introduction/service",
						img: '',
					},
					{
						name: "역사",
						url: "/introduction/history",
						img: '',
					},
					{
						name: "비전",
						url: "/introduction/visions",
						img: '',
					},
					{
						name: "조직/부서",
						url: "/introduction/organization",
						img: '',
					},
					{
						name: "오시는길",
						url: "/introduction/contact-us",
						img: '',
					},
				],
			},
			{
				parentName: '훈련',
				stateName: 'train',
				children: [
					{
						name: '이달의 책',
						url: '/train/book-of-the-month',
						img: '',
					},
					{
						name: '제자훈련',
						url: '/train/discipleship',
						img: '',
					},
				],
			},
			{
				parentName: '선교',
				stateName: 'mission',
				children: [
					{
						name: '선교소개',
						url: '/mission/status',
						img: '',
					},
					{
						name: '선교소식',
						url: '/mission/updates',
						img: '',
					},
				],
			},
			{
				parentName: '영상',
				stateName: 'media',
				children: [
					{
						name: '주일선교',
						url: '/media/sunday-services',
						img: 'preach.png',
					},
					{
						name: '목양칼럼',
						url: '/media/shepherding',
						img: 'column.png',
					},
					{
						name: '성가대',
						url: '/media/grace-choir',
						img: 'choir.png',
					},
					{
						name: '교회앨범',
						url: '/media/album',
						img: '',
					},
				],
			},
			{
				parentName: '게시판',
				stateName: 'board',
				children: [
					{
						name: '교회소식',
						eyecatch: '능력교회는 하나님의 영향력을 세상에 끼치는 교회가 되는 것을 추구하는 교회입니다.',
						url: '/board/church',
						img: '',
					},
					{
						name: '부서게시판',
						eyecatch: '능력교회는 미래에 조국과 미국, 세계에 하나님의 영향력을 끼칠 청년과 다음 세대를 책임질 자녀들을 사랑하는 교회입니다.',
						url: '/board/group',
						img: '',
						children: [
							{
								name: '아브라함부',
								altName: 'Abraham',
								eyecatch: '',
								url: '/board/group/abraham',
							},
							{
								name: '이삭부',
								altName: 'Isaac',
								eyecatch: '',
								url: '/board/group/isaac',
							},
							{
								name: '여호수아부',
								eyecatch: '',
								altName: 'Joshua',
								url: '/board/group/joshua',
							},
							{
								name: '다니엘부',
								altName: 'Daniel',
								eyecatch: '',
								url: '/board/group/daniel',
							},
							{
								name: '요셉부',
								altName: 'Joseph',
								eyecatch: '',
								url: '/board/group/joseph',
							},
							{
								name: '다윗부',
								altName: 'David',
								eyecatch: '',
								url: '/board/group/david',
							},
							{
								name: '사무엘부',
								altName: 'Samuel',
								eyecatch: '',
								url: '/board/group/samuel',
							},
							{
								name: '디모데부',
								altName: 'Timothy',
								eyecatch: '',
								url: '/board/group/timothy',
							},
						],
					},
					{
						name: '교우마당',
						url: '/board/brethren',
						eyecatch:'능력교회는 새로운 지역으로 떠나가는 녹색바다처럼 그렇게 생명력 넘치는 건강한 교회를 추구합니다.',
						img: '',
					},
					{
						name: '유학/정착',
						url: '/board/study-abroad',
						eyecatch: '능력교회는 어머님 품같이 아늑하고 포근한 교회, 한 가족 같이 격려가 있고 서로 힘이 되어 주는 교회를 추구합니다.',
						img: '',
					},
				],
			},
		];// end of this.main
	}// 
}

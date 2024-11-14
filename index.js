import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `
## Donggyun's Git 👋


<div align='center'>
  
**안녕하세요. 아름다운 화면을 지향하는 프론트엔드 개발자 김동균입니다.**
<br><br>
🧑‍💻 아름다운 UI를 통해 사용자 경험을 향상시키는 데 집중합니다.<br>
💡 개발 중 드는 고민을 팀원과 나누고 공유하는 것을 좋아합니다.<br>
🔥 끊임없이 성장할 수 있는 환경을 추구합니다.

<br>

### ⚒️ Tech Stacks

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)

![Styled-Components](https://img.shields.io/badge/styled--components-DB7093?logo=styledcomponents&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=Tailwind%20CSS&logoColor=white)
![React-Hook-Form](https://img.shields.io/badge/react--hook--form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Github](https://img.shields.io/badge/Github-181717?style=flat-square&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)

<br><br>

### 🚀Card

![Donggyun's GitHub stats](https://github-readme-stats.vercel.app/api?username=DonggyunKim00&show_icons=true&theme=dark)
[![Solved.ac Profile](http://mazassumnida.wtf/api/v2/generate_badge?boj=rlaehdrbs580)](https://solved.ac/rlaehdrbs580/)


</div>


## 📚 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL('https://daniel-devlog.tistory.com/rss'); // 본인의 블로그 주소

  text += `<ul>`;

  // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
  const postCount = Math.min(feed.items.length, 10);
  for (let i = 0; i < postCount; i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
  }

  text += `</ul>`;

  // README.md 파일 생성
  writeFileSync('README.md', text, 'utf8', (e) => {
    console.log(e);
  });
  console.log('업데이트 완료');
})();

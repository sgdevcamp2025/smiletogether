# SmileTogether
## GitHub 협업 방식

### PR 승인 방식
- 파트별 팀원이 **1명 이상 승인** 후 `merge`를 진행한다.

### 이슈 공유 방식
- 긴급 이슈는 **실시간 공유**를 원칙으로 하며, 모든 이슈는 GitHub Issues를 통해 기록하고 관리한다.

---

## 커밋 컨벤션

| **Type**      | **Subject**                            | **Body (선택 사항)**                                              | **Footer (선택 사항)**                           |
| ------------- | -------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------- |
| **feat**      | 새로운 기능 추가                       | 제목은 최대 50글자를 넘기지 않는다.                               | 이슈 트래커 ID를 작성한다.                      |
| **fix**       | 버그 수정                              | 양에 구애받지 않고 최대한 상세히 작성한다.                        | "유형: #이슈 번호" 형식으로 작성한다.           |
| **docs**      | 문서 수정                              | 마침표 및 특수기호는 사용하지 않는다.                             | 여러 개의 이슈 번호를 적을 때는 쉼표(,)로 구분한다. |
| **style**     | 코드 포맷팅, 세미콜론 누락 등          |                                                                   | Fixes: 이슈 수정 중 (아직 해결되지 않은 경우)   |
| **refactor**  | 코드 리팩토링                          |                                                                   | Resolves: 이슈를 해결한 경우                    |
| **test**      | 테스트 코드 추가, 리팩토링 테스트 코드 | 영문으로 동사 원형을 가장 앞에 두고 첫 글자는 대문자로 표기한다. (과거 시제 사용 금지) | Ref: 참고할 이슈가 있을 경우                   |
| **chore**     | 빌드 수정, production code와 무관한 작업 |                                                                   | Related to: 관련 이슈 번호 (아직 해결되지 않은 경우) |
| **comment**   | 주석 추가 및 변경                      |                                                                   |                                                |
| **remove**    | 파일/폴더 삭제                        |                                                                   | ex) Fixes: #45 Related to: #34, #23             |
| **rename**    | 파일/폴더명 수정                       |                                                                   |                                                |

> **모든 커밋은 한국어로 작성하고, 맺음말은 "~한다" 형식으로 작성한다.**
- 커밋 형식:  `${타입}/#${이슈넘버} : ${작업 내용}`
  - 예시: `fix/#1 : Tailwind CSS 설정 및 shadcn 초기화 작업`
---

## 브랜치 컨벤션

- 브랜치 이름 형식:  `타입/파트-#이슈번호`  
  - 예시: `feat/front-#123`

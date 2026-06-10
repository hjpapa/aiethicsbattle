# AI 윤리 흑백토론

AI 윤리 흑백토론은 학생이 자신의 윤리 유형을 고르고, 반대 관점을 가진 백돌 AI와 1:1로 토론하는 교육용 MVP입니다.

## MVP 스택

- Next.js App Router + TypeScript
- OpenAI Responses API, 기본 모델 `gpt-5-nano`
- Supabase Postgres 저장
- Vercel 배포 준비

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 환경 변수

`.env.example`을 기준으로 Vercel과 로컬 `.env.local`에 값을 설정합니다.

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5-nano

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`OPENAI_API_KEY`는 서버 라우트에서만 사용됩니다. `SUPABASE_SERVICE_ROLE_KEY`도 서버 전용이며 `NEXT_PUBLIC_` 접두사를 붙이면 안 됩니다.

Supabase 값이 없으면 토론은 로컬 브라우저 저장소로 진행됩니다. Supabase 값을 넣으면 `/api/session`, `/api/chat`, `/api/review` 라우트가 익명 세션, 메시지, 복기 결과를 저장합니다.

## Supabase

Supabase SQL Editor에서 `supabase/schema.sql`을 실행합니다.

이 MVP는 학생 이름, 학교명, 주소, 연락처를 저장하지 않는 익명 세션 구조입니다. 공개 클라이언트가 직접 테이블에 쓰지 않도록 RLS를 켜고, 서버 라우트에서 service role key로 저장하는 구성을 기본으로 둡니다.

## Vercel

Vercel 프로젝트에 GitHub 저장소를 연결한 뒤 Environment Variables에 위 값을 넣으면 Next.js는 별도 설정 없이 빌드됩니다.

```bash
npm run build
```

## 주요 흐름

1. 흑돌 윤리 유형 선택
2. 백돌 반대 유형 자동 매칭
3. 학생 수준 선택
4. AI 윤리 주제 선택
5. GPT-5 Nano 백돌 응수
6. 형세판단
7. 복기 생성 및 저장

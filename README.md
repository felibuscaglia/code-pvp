# CodePvP

A real-time competitive coding platform. Players join a room, race through the same LeetCode-style challenge, and get scored on whether their solution is correct, how fast it runs, how much memory it uses, how quickly they submitted, and how concise the code is.

## The Product

You create or browse a **room**, pick a difficulty, language, number of rounds, and a per-round timer, then wait for other players. When everyone is in (or the host starts it), the room serves a random challenge to all players at once. You write your solution in an in-browser editor, run it against the public test cases as you go, and submit when you're ready. The moment a round ends — either because the timer runs out or everyone has submitted — scores update live for everyone, and the next challenge begins. After the last round, a results screen shows the per-round breakdown and the overall leaderboard.

Each submission gets a transparent **score breakdown** with five weighted components:

- **Correctness** (40%) — pass rate against public + hidden test cases
- **Execution time** (25%)
- **Memory usage** (15%)
- **Submission speed** (12%) — how fast you submitted relative to round start
- **Code length** (8%) — concise solutions get a small bonus

Rooms can be public (show up in the browser) or private (join by link), 2-8 players, 1-10 rounds, 5-30 minutes per round, easy/medium/hard, JavaScript or Python.

## How It's Built

The repo is a two-package monorepo: a NestJS backend in `/api` and a Next.js frontend in `/ui`, with a `seed-challenges.sql` file at the root that loads ~50 LeetCode-style problems into Supabase.

### Backend — `/api`

A **NestJS 11** service in TypeScript. It exposes a small REST surface for creating and listing rooms, but the interesting part is the **Socket.IO gateway** (`@nestjs/websockets`) that drives every live match. Rooms, players, and round state are kept **in-memory** in `RoomsService` — battles are intentionally ephemeral, so restarting the API drops in-flight matches. Only the durable stuff (challenges) lives in **Supabase** Postgres, accessed through the Supabase JS client.

When a player submits code, the `submissions` module wraps it in a per-language **test harness** (one for JavaScript, one for Python), ships it to **Judge0 CE** via RapidAPI for sandboxed execution, parses the harness's JSON output, and computes the score breakdown. Identical submissions are deduped through an in-process **`lru-cache`** keyed on `(language, source)`, so re-runs don't burn Judge0 quota.

### Frontend — `/ui`

A **Next.js 16** App Router app on **React 19**, styled with **TailwindCSS 4** and **shadcn/ui** (Radix primitives under the hood). The code editor is **Monaco**. A **Socket.IO client** stays connected to the gateway for the duration of a match and feeds React contexts that drive the room screen — opponents' submission status, live scores, the round timer, and the next-round transition all flow through that one socket. Errors are reported to **Sentry**, and the win screen fires `canvas-confetti` because of course it does.

The app is organized around three main flows under a `(rooms)` route group: **browse** (paginated public rooms), **create** (room wizard), and **room/[roomId]** (the live battle arena).

### The Match Loop

1. Host creates a room (`POST /rooms`) with the desired settings.
2. Players open the room screen, which establishes a Socket.IO connection and emits `join-room`.
3. When the room fills up (or the host starts it manually), the gateway picks a random challenge of the chosen difficulty from Supabase and broadcasts `round-started`.
4. Players code in Monaco. "Test" runs against public test cases only; "Submit" runs public + hidden.
5. Each submission goes through Judge0, gets scored, and the result is broadcast as `scores-updated`.
6. The round ends when the timer expires or every player has submitted. The next round begins, or the match wraps and the results screen takes over.

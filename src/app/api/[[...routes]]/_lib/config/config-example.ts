import dedent from "dedent";

const configText = dedent`
# nama project / app
name: "nama-project"
# nama unik contoh hipmi-prd
namespace: "nama-project-staging"
# untuk production pilih main
branch: "staging / main / etc"
# repo github bagian belakannya aja karena hanya untuk project bip
repo: "nama-repo"
# tambahkan env yang dibutuhkan
env: |
  DATABASE_URL="postgresql://user:Password@localhost:5433/database?schema=public"
options:
  - dbPush: true
  - dbSeed: true
  - build: true
  # - newConfig: true
  # - count: 1
  # - ports: null
`

async function configExample() {
    return configText;
}

export default configExample;

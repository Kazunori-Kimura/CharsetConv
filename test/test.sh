#!/usr/bin/env bash
# pattern1: UTF-8 -> Shift_JIS
npx ts-node src/index.ts --source="./test/pattern1/source" --from=UTF-8 --destination="./test/pattern1/dest" --to=Shift_JIS
# pattern2: Shift_JIS -> UTF-8
npx ts-node src/index.ts --source="./test/pattern2/source" --from=Shift_JIS --destination="./test/pattern2/dest" --to=UTF-8
# pattern3: UTF-8 -> Shift_JIS
npx ts-node src/index.ts --source="./test/pattern3/source" --from=UTF-8 --destination="./test/pattern3/dest" --to=Shift_JIS


```
https://github.com/tztechno/tz_js_20240217_leaflet
```

```
$ node fetchEarthquakeData
$ bash script.sh
```

```
circleci local execute -c .circleci/config.yml
git add .
git commit -m "Add generated files"
git push origin main
```

```
  deploy:
    docker:
      - image: circleci/node:latest

    steps:
      - attach_workspace:
          at: .

      # ワークスペースから生成されたファイルを取得
      - run:
          name: Copy generated files
          command: cp now.js now.json ~/DockerProjects/js_fetchEarthquakeData

      # リポジトリに変更をコミットしてプッシュ
      - run:
          name: Commit and Push changes
          command: 
            git add now.js now.json
            git commit -m "Add generated files"
            git push -u origin main

workflows:
  version: 2
  build-and-deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build

    triggers:
      - schedule:
          cron: "0 20 * * 4"  # 毎週木曜日の午後11時に実行
          #cron: "0 0 * * 0"  # 毎週日曜日の0時に実行
```

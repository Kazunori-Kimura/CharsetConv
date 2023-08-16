# CharsetConv

指定されたフォルダの直下にある複数のテキストファイルの文字コードを変換するコマンドラインツールです。

Node.js が必要です。以下から推奨版をダウンロード・インストールしてください。
[Node.js](https://nodejs.org/ja)

## セットアップ方法

コマンドプロンプトを開き、このファイル (`README`) が存在するフォルダに移動します。
ここでは `project` フォルダとします。

```
> cd project
```

必要なファイルをダウンロード・コンパイルします。

```
> npm install
```

コマンドとして実行できるようにリンクを作成します。

```
> npm link charset-conv
```

以上でセットアップは完了です。

## 使い方

```
> charset-conv -h
Usage: charset-conv [options]

Options:
  -s, --source <path>       Source directory
  -d, --destination <path>  Destination directory
  -f, --from <charset>      Original charset
  -t, --to <charset>        Target charset
  -h, --help                display help for command
```

### コマンド例

`C:/test/pattern1/source` にあるテキストファイルを `UTF-8` から `Shift_JIS` に変換し `C:/test/pattern1/dest` に保存するには、以下のコマンドを実行します。

```
charset-conv --source="C:/test/pattern1/source" --from=UTF-8 --destination="C:/test/pattern1/dest" --to=Shift_JIS
```

変換に失敗した行がある場合は、以下のように行数と変換前後の内容を出力します。

```
Conversion completed.
File: file.txt
  #2
    original : - 𠮟
    converted: - ?
  #3
    original : - 𩸕
    converted: - ?
  #4
    original : - 𪚲
    converted: - ?
Conversion completed.
```

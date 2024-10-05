# レーニンノート

## 機能の概要

書籍に関するメモを残すことができる。

- 標準のカラムとして 「抜書」「要約」「ページ数」「行数」「コメント」がある。
- カラムは「ノートテンプレート」で設定する。ノートテンプレートは複数作ることができ、書籍ごとにテンプレートを選択することができる。
- 全文検索にかけれるようにする。

## データモデル

```mermaid
erDiagram
    Book {
      number id
      string title
      string author
      string publisher
      date published_at
    }

    NoteTemplate {
      number id
      string name
    }

    NoteColumn {
      number id
      number note_template_id
      string name
      string type
    }

    Note {
      number id
      number book_id
      number note_template_id
      date created_at
      date updated_at
    }

    NoteRecord {
      number id
      number note_id
      date created_at
      date updated_at
    }

    NoteColumnsRecords {
      number id
      number note_record_id
      number note_column_id
      string value
      date created_at
      date updated_at
    }

    NoteTemplate ||--o{ Note : contains
    NoteTemplate ||--o{ NoteColumn : contains
    Book ||--|| Note : has
    Note ||--o{ NoteRecord : contains
    NoteRecord ||--o{ NoteColumnValue : contains
    NoteColumn ||--o{ NoteColumnValue : contains
```

## 画面

- LN-1: 書籍一覧画面
- LN-2: 書籍登録・更新画面
- LN-3: ノートテンプレート一覧画面
- LN-4: ノートテンプレート登録・更新画面
- LN-5: ノート一覧画面
- LN-6: ノート登録画面
- LN-7: ノート作成画面

## 画面遷移

```mermaid
graph TD
    A[LN-1: 書籍一覧画面] --> B[LN-2: 書籍登録・更新画面]
    C[LN-5: ノート一覧画面] --> D[LN-6: ノート登録画面]
    D --> E[LN-7: ノート作成画面]
    F[LN-3: ノートテンプレート一覧画面] --> G[LN-4: ノートテンプレート登録・更新画面]
```

## API

### 書籍

- 書籍一覧取得
- 書籍登録
- 書籍更新
- 書籍削除

### ノートテンプレート

- ノートテンプレート一覧取得
- ノートテンプレート登録
- ノートテンプレート更新
- ノートテンプレート削除

### ノート

- ノート一覧取得
- ノート登録
- ノート更新
- ノート削除

### ノートレコード

- ノートレコード一覧取得
- ノートレコード登録
- ノートレコード更新
- ノートレコード削除

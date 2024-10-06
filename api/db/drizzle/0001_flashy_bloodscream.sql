-- 下記の記載に従って VIRTUAL TABLE を作成。
-- https://zenn.dev/cybozu_frontend/articles/cloudflare-d1-fts
CREATE VIRTUAL TABLE IF NOT EXISTS `books_fts` USING fts5(segments);

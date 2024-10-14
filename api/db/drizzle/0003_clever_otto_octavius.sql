-- Custom SQL migration file, put you code below! --
-- ノートカラム
INSERT INTO `note_columns` (`note_template_id`, `name`, `type`) VALUES
  (1, '抜書', 'text'),
  (1, '要約', 'text'),
  (1, 'ページ数', 'text'),
  (1, '行数', 'text'),
  (1, 'コメント', 'text');

INSERT INTO "user" (id, username, password, email, is_verified, lvl) VALUES
(1, 'admin', '$2a$10$NXK9XB1DsWzWl4b.YZkqPOQgCZKws5GlhjyZ8OG75Q2980hU8sUni', 'test1@example.com', true, 1);

INSERT INTO "stat" (id, wrong_answers, correct_answers, total_questions, user_id) VALUES
(1, 5, 2, 5, 1);
INSERT INTO "user" (id, username, password, email, is_verified, lvl) VALUES
(0, 'admin', '$2a$10$NXK9XB1DsWzWl4b.YZkqPOQgCZKws5GlhjyZ8OG75Q2980hU8sUni', 'test1@example.com', true, 1);

INSERT INTO "stat" (id, wrong_answers, total_questions, average_time_per_question, total_time, date,  user_id) VALUES
(0, 5, 5, 3.4, 12.9, '13-05-2024', 0);
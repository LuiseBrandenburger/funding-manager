-- @PSQL:
-- *** sudo service postgresql start
-- *** createdb gofundyourself
-- *** psql gofundyourself
-- *** psql -d gofundyourself -f server/sql/setup.sql




-- DROP TABLE IF EXISTS projects;

-- CREATE TABLE projects( 
-- id SERIAL PRIMARY KEY, 
-- owner_id INT REFERENCES users(id) NOT NULL,
-- name VARCHAR(255) NOT NULL,
-- project_number VARCHAR(255) NOT NULL UNIQUE,
-- artist_name VARCHAR(255) NOT NULL,
-- project_start DATE,
-- project_end DATE,
-- project_description VARCHAR(255),
-- program_name VARCHAR(255),
-- manager VARCHAR(255),
-- approved_funding DECIMAL(8,2) DEFAULT 0,
-- sum_spend DECIMAL(8,2) DEFAULT 0,
-- sum_left DECIMAL(8,2) DEFAULT 0,
-- sum_accounted DECIMAL(8,2) DEFAULT 0,
-- funding_received DECIMAL(8,2) DEFAULT 0,
-- sum_fc_total DECIMAL(8,2) DEFAULT 0,
-- sum_fc_production DECIMAL(8,2) DEFAULT 0,
-- sum_fc_marketing DECIMAL(8,2) DEFAULT 0,
-- sum_fc_tour DECIMAL(8,2) DEFAULT 0,
-- sum_total DECIMAL(8,2) DEFAULT 0,
-- sum_production DECIMAL(8,2) DEFAULT 0,
-- sum_marketing DECIMAL(8,2) DEFAULT 0,
-- sum_tour DECIMAL(8,2) DEFAULT 0,
-- approved BOOLEAN DEFAULT false);


-- DROP TABLE IF EXISTS outgoings;
-- DROP TABLE IF EXISTS incomings;
-- DROP TABLE IF EXISTS positions;


-- CREATE TABLE outgoings( 
-- id SERIAL PRIMARY KEY, 
-- project_id INT REFERENCES projects(id) NOT NULL,
-- sender_id INT REFERENCES users(id) NOT NULL,
-- category VARCHAR(255) NOT NULL,
-- option VARCHAR(255) NOT NULL,
-- position VARCHAR(255) NOT NULL,
-- price DECIMAL(8,2) NOT NULL,
-- quantity DECIMAL(8) DEFAULT 1,
-- file VARCHAR(255),
-- notes VARCHAR(255),
-- fc_total DECIMAL(8,2) DEFAULT 0,
-- total DECIMAL(8,2) DEFAULT 0,
-- paiddate DATE,
-- paid BOOLEAN DEFAULT false);


-- CREATE TABLE incomings( 
-- id SERIAL PRIMARY KEY, 
-- project_id INT REFERENCES projects(id) NOT NULL,
-- sender_id INT REFERENCES users(id) NOT NULL,
-- category VARCHAR(255) NOT NULL,
-- position VARCHAR(255) NOT NULL,
-- price DECIMAL(8,2) NOT NULL,
-- file VARCHAR(255),
-- notes VARCHAR(255),
-- total DECIMAL(8,2) DEFAULT 0,
-- paiddate DATE,
-- paid BOOLEAN DEFAULT false);






  -- SELECT * FROM users;
  -- SELECT * FROM projects;
  -- SELECT * FROM positions;
    -- SELECT * FROM outgoings;
    SELECT * FROM incomings;





-- TODO: OLD CODE


-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     first VARCHAR(255) NOT NULL,
--     last VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     url VARCHAR(255),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );


-- DROP TABLE IF EXISTS reset_code;

-- CREATE TABLE reset_code (
--     email VARCHAR(255) NOT NULL,
--     code VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );

-- DROP TABLE IF EXISTS friendships;

-- CREATE TABLE friendships( 
-- id SERIAL PRIMARY KEY, 
-- sender_id INT REFERENCES users(id) NOT NULL,
-- recipient_id INT REFERENCES users(id) NOT NULL,
-- accepted BOOLEAN DEFAULT false);


-- DROP TABLE IF EXISTS wall_messages;

-- CREATE TABLE wall_messages (
--       id SERIAL PRIMARY KEY,
--       author_id INT REFERENCES users(id) NOT NULL,
--       wall_id INT REFERENCES users(id) NOT NULL,
--       wall_message TEXT NOT NULL,
--       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- INSERT INTO wall_messages
--   (author_id, wall_id, wall_message) 
-- VALUES 
--   (1, 207, 'Hey everyone, nice to meet you...'),
--   (1, 207, 'Hello there!'),
--   (1, 207, 'I love this social network');

--   INSERT INTO wall_messages
--   (author_id, wall_id, wall_message) 
-- VALUES 
--   (1, 213, 'Hey everyone, nice to meet you...'),
--   (1, 213, 'Hello there!'),
--   (1, 213, 'I love this social network');

  
--   INSERT INTO wall_messages
--   (author_id, wall_id, wall_message) 
-- VALUES 
--   (213, 1, 'Hey everyone, nice to meet you...'),
--   (213, 1, 'Hello there!'),
--   (213, 1, 'I love this social network');

-- DROP TABLE IF EXISTS chat_messages;

-- CREATE TABLE chat_messages (
--       id SERIAL PRIMARY KEY,
--       user_id INT NOT NULL REFERENCES users(id) ,
--       message TEXT NOT NULL,
--       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );

-- INSERT INTO chat_messages
--   (user_id, message) 
-- VALUES 
--   (145, 'Hey everyone, nice to meet you...'),
--   (101, 'Hello there!'),
--   (106, 'I love this social network');





  -- SELECT * FROM reset_code;
  -- SELECT * FROM friendships;
  -- SELECT * FROM chat_messages;
    -- SELECT * FROM wall_messages;




-- @PSQL:
-- *** sudo service postgresql start
-- *** createdb gofundyourself
-- *** psql gofundyourself
-- *** psql -d gofundyourself -f server/sql/setup.sql


-- DROP TABLE IF EXISTS outgoings;
-- DROP TABLE IF EXISTS incomings;
-- DROP TABLE IF EXISTS projects;
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
-- approved BOOLEAN DEFAULT false,
-- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

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
-- paid BOOLEAN DEFAULT false,
-- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);


-- CREATE TABLE outgoings( 
-- id SERIAL PRIMARY KEY, 
-- project_id INT REFERENCES projects(id) NOT NULL,
-- sender_id INT REFERENCES users(id) NOT NULL,
-- category VARCHAR(255) NOT NULL,
-- option VARCHAR(255) NOT NULL,
-- position VARCHAR(255) NOT NULL,
-- price DECIMAL(8,2) NOT NULL,
-- quantity DECIMAL(8,2) DEFAULT 1,
-- file VARCHAR(255),
-- notes VARCHAR(255),
-- fc_total DECIMAL(8,2) DEFAULT 0,
-- total DECIMAL(8,2) DEFAULT 0,
-- paiddate DATE,
-- paid BOOLEAN DEFAULT false,
-- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);


  SELECT * FROM users;
  SELECT * FROM projects;
  SELECT * FROM outgoings;
  -- SELECT * FROM incomings;





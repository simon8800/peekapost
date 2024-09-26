const { Client } = require("pg");

const SQL = `
  CREATE TABLE IF NOT EXISTS users (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username VARCHAR(30),
	hash VARCHAR(128),
	admin BOOL
);

CREATE TABLE IF NOT EXISTS messages (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	content TEXT NOT NULL,
	sender_id INT REFERENCES users(id),
	created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "session" (
  "sid" VARCHAR NOT NULL COLLATE "default",
  "sess" JSON NOT NULL,
  "expire" TIMESTAMP(6) NOT NULL
) WITH (OIDS = FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

INSERT INTO users (username, hash, admin) VALUES
('jdoe', '5f4dcc3b5aa765d61d8327deb882cf99', false),
('asmith', 'e99a18c428cb38d5f260853678922e03', false),
('mjordan', '25d55ad283aa400af464c76d713c07ad', false),
('bwayne', 'd8578edf8458ce06fbc5bb76a58c5ca4', false),
('ckent', '6cb75f652a9b52798eb6cf2201057c73', false),
('pparker', '8f14e45fceea167a5a36dedd4bea2543', false),
('tsmith', '7c6a180b36896a0a8c02787eeafb0e4c', false),
('rwilliams', '03c7c0ace395d80182db07ae2c30f034', false),
('kjones', '98f13708210194c475687be6106a3b84', false),
('ljames', 'ad0234829205b9033196ba818f7a872b', false);

`;

CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tables (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  capacity INT,
  status VARCHAR(255) NOT NULL
);
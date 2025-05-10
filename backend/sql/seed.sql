-- USERS TABLE
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SCORES TABLE
CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  total_score INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  incorrect_answers INTEGER DEFAULT 0,
  total_attempts INTEGER DEFAULT 0
);

-- DESTINATIONS TABLE (non-normalized)
CREATE TABLE destinations (
  id SERIAL PRIMARY KEY,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  clues TEXT[],       -- Array of clues
  fun_fact TEXT[],    -- Array of fun facts
  trivia TEXT[]       -- Array of trivia
);

-- DESTINATIONS SEED DATA

INSERT INTO destinations (city, country, clues, fun_fact, trivia)
VALUES
(
  'Paris', 'France',
  ARRAY[
    'This city is home to a famous tower that sparkles every night.',
    'Known as the ''City of Love'' and a hub for fashion and art.'
  ],
  ARRAY[
    'The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!',
    'Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules.'
  ],
  ARRAY[
    'This city is famous for its croissants and macarons. Bon appétit!',
    'Paris was originally a Roman city called Lutetia.'
  ]
),
(
  'Tokyo', 'Japan',
  ARRAY[
    'This city has the busiest pedestrian crossing in the world.',
    'You can visit an entire district dedicated to anime, manga, and gaming.'
  ],
  ARRAY[
    'Tokyo was originally a small fishing village called Edo before becoming the bustling capital it is today!',
    'More than 14 million people live in Tokyo, making it one of the most populous cities in the world.'
  ],
  ARRAY[
    'The city has over 160,000 restaurants, more than any other city in the world.',
    'Tokyo’s subway system is so efficient that train delays of just a few minutes come with formal apologies.'
  ]
),
(
  'New York', 'USA',
  ARRAY[
    'Home to a green statue gifted by France in the 1800s.',
    'Nicknamed ''The Big Apple'' and known for its Broadway theaters.'
  ],
  ARRAY[
    'The Statue of Liberty was originally a copper color before oxidizing to its iconic green patina.',
    'Times Square was once called Longacre Square before being renamed in 1904.'
  ],
  ARRAY[
    'New York City has 468 subway stations, making it one of the most complex transit systems in the world.',
    'The Empire State Building has its own zip code: 10118.'
  ]
);

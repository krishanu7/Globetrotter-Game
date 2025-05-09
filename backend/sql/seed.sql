CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  score INTEGER DEFAULT 0
);

CREATE TABLE destinations (
  id SERIAL PRIMARY KEY,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  clues TEXT[],
  fun_fact TEXT[],
  trivia TEXT[]
);

-- INSERT Paris
INSERT INTO destinations (city, country, clues, fun_fact, trivia)
VALUES (
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
);

-- INSERT Tokyo
INSERT INTO destinations (city, country, clues, fun_fact, trivia)
VALUES (
  'Tokyo', 'Japan',
  ARRAY[
    'This city has the world''s busiest pedestrian crossing.',
    'Known for its blend of traditional and modern culture.'
  ],
  ARRAY[
    'Tokyo was originally a small fishing village called Edo.',
    'The city has more Michelin-starred restaurants than any other city in the world.'
  ],
  ARRAY[
    'This city is famous for sushi, ramen, and cherry blossoms.',
    'Tokyo Disneyland was the first Disney park to be built outside of the United States.'
  ]
);

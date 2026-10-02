CREATE DATABASE IF NOT EXISTS book;

USE book;

CREATE TABLE IF NOT EXISTS userss (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookss (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bookName VARCHAR(255) NOT NULL,
  bookTitle VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  sellingPrice DECIMAL(10,2) NOT NULL,
  publishDate DATE NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO userss (name, email, password, role)
VALUES ('Admin User', 'admin@gmail.com', '$2a$10$gzj5T8LoBTVhJmJWEdx9IuOYWkKOOooCz4yckk7VtM6ZbwMsUZ/PK', 'admin')
ON DUPLICATE KEY UPDATE email=email;


books
INSERT INTO bookss (bookName, bookTitle, author, sellingPrice, publishDate) VALUES
('The Identity Trap', 'The Identity Trap', 'Yascha Mounk', 19.99, '2023-01-01'),
('Battle of Ink and Ice', 'Battle of Ink and Ice', 'Stephen R. Bown', 19.99, '2023-01-01'),
('East of Eden', 'East of Eden', 'John Steinbeck', 19.99, '2023-01-01'),
('The Art of Impossible', 'The Art of Impossible', 'Steven Kotler', 19.99, '2023-01-01'),
('James', 'James', 'Percival Everett', 19.99, '2023-01-01'),
('The Art Thief', 'The Art Thief', 'Michael Finkel', 19.99, '2023-01-01'),
('Ithaca', 'Ithaca', 'Claire North', 19.99, '2023-01-01'),
('Moonrise', 'Moonrise', 'Sarah Crossan', 19.99, '2023-01-01'),
('The End of Eden', 'The End of Eden', 'Adam Welz', 19.99, '2023-01-01'),
('A Psalm for the Wild-Built', 'A Psalm for the Wild-Built', 'Becky Chambers', 19.99, '2023-01-01'),
('The Book of Form and Emptiness', 'The Book of Form and Emptiness', 'Ruth Ozeki', 19.99, '2023-01-01'),
('The Overstory', 'The Overstory', 'Richard Powers', 19.99, '2023-01-01'),
('Cloud Cuckoo Land', 'Cloud Cuckoo Land', 'Anthony Doerr', 19.99, '2023-01-01'),
('The Bright Sword', 'The Bright Sword', 'Lev Grossman', 19.99, '2023-01-01'),
('Brotherless Night', 'Brotherless Night', 'V. V. Ganeshananthan', 19.99, '2023-01-01'),
('J.D. Salinger: A Life', 'J.D. Salinger: A Life', 'Kenneth Slawenski', 19.99, '2023-01-01'),
('Trinity', 'Trinity', 'Frank Close', 19.99, '2023-01-01'),
('Tomorrow, and Tomorrow, and Tomorrow', 'Tomorrow, and Tomorrow, and Tomorrow', 'Gabrielle Zevin', 19.99, '2023-01-01'),
('The Unfit Heiress', 'The Unfit Heiress', 'Audrey Clare Farley', 19.99, '2023-01-01'),
('Elephant Company', 'Elephant Company', 'Vicki Croke', 19.99, '2023-01-01'),
('The Covenant of Water', 'The Covenant of Water', 'Abraham Verghese', 19.99, '2023-01-01'),
('The Red Tent', 'The Red Tent', 'Anita Diamant', 19.99, '2023-01-01'),
('The Girl with the Louding Voice', 'The Girl with the Louding Voice', 'Abi Daré', 19.99, '2023-01-01'),
('The Dead Romantics', 'The Dead Romantics', 'Ashley Poston', 19.99, '2023-01-01'),
('In the Heart of the Sea', 'In the Heart of the Sea', 'Nathaniel Philbrick', 19.99, '2023-01-01'),
('Foster', 'Foster', 'Claire Keegan', 19.99, '2023-01-01'),
('Little Women', 'Little Women', 'Louisa May Alcott', 19.99, '2023-01-01'),
('A Murder Most French', 'A Murder Most French', 'Colin Simpson', 19.99, '2023-01-01'),
('The Power Broker', 'The Power Broker', 'Robert A. Caro', 19.99, '2023-01-01'),
('Victoria', 'Victoria', 'Daisy Goodwin', 19.99, '2023-01-01'),
('Round Midnight', 'Round Midnight', 'Laura McBride', 19.99, '2023-01-01'),
('Seven Days in June', 'Seven Days in June', 'Tia Williams', 19.99, '2023-01-01'),
('To Dance with the White Dog', 'To Dance with the White Dog', 'Terry Kay', 19.99, '2023-01-01'),
('Small Things Like These', 'Small Things Like These', 'Claire Keegan', 19.99, '2023-01-01'),
('The Bear', 'The Bear', 'Andrew Krivak', 19.99, '2023-01-01'),
('The Love Hypothesis', 'The Love Hypothesis', 'Ali Hazelwood', 19.99, '2023-01-01'),
('The Heaven & Earth Grocery Store', 'The Heaven & Earth Grocery Store', 'James McBride', 19.99, '2023-01-01'),
('Empire of Pain', 'Empire of Pain', 'Patrick Radden Keefe', 19.99, '2023-01-01'),
('The Lincoln Highway', 'The Lincoln Highway', 'Amor Towles', 19.99, '2023-01-01'),
('Demon Copperhead', 'Demon Copperhead', 'Barbara Kingsolver', 19.99, '2023-01-01'),
('The Marriage Portrait', 'The Marriage Portrait', 'Maggie O''Farrell', 19.99, '2023-01-01'),
('Great Circle', 'Great Circle', 'Maggie Shipstead', 19.99, '2023-01-01'),
('Hamnet', 'Hamnet', 'Maggie O''Farrell', 19.99, '2023-01-01'),
('All the Light We Cannot See', 'All the Light We Cannot See', 'Anthony Doerr', 19.99, '2023-01-01'),
('The Tattooist of Auschwitz', 'The Tattooist of Auschwitz', 'Heather Morris', 19.99, '2023-01-01'),
('The Frozen River', 'The Frozen River', 'Ariel Lawhon', 19.99, '2023-01-01'),
('The Women', 'The Women', 'Kristin Hannah', 19.99, '2023-01-01'),
('Facing the Mountain', 'Facing the Mountain', 'Daniel James Brown', 19.99, '2023-01-01'),
('The Yellow House', 'The Yellow House', 'Sarah M. Broom', 19.99, '2023-01-01');

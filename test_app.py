from unittest import TestCase

from app import app, games

# Make Flask errors be real errors, not HTML pages with error info
app.config['TESTING'] = True


class BoggleAppTestCase(TestCase):
    """Test flask app of Boggle."""

    def setUp(self):
        """Stuff to do before every test."""

        app.config['TESTING'] = True

    def test_homepage(self):
        """Make sure information is in the session and HTML is displayed"""

        with app.test_client() as client:
            response = client.get('/')
            html = response.get_data(as_text=True)

            self.assertEqual(response.status_code, 200)

            # NOTE: no closing angle bracket -> checks for any table on page
            self.assertIn('<table', html)

            # NOTE: can check comments left in jinja template
            self.assertIn('homepage template', html)

    def test_api_new_game(self):
        """Test starting a new game."""

        with app.test_client() as client:
            response = client.post('/api/new-game')
            json = response.get_json()
            
            # check if gameId is a string type
            self.assertIsInstance(json["gameId"], str, "gameId is not a string")
            
            # check that all rows in board are list types
            for row in json['board']:
                self.assertIsInstance(row, list, "row is not a list")
            
            # check if game was added to games dictionary
            self.assertEqual(len(games), 1, "games dictionary len is not one")
            

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
            
            #NOTE: no closing angle bracket -> checks for any table on page
            self.assertIn('<table', html)
            
            #NOTE: can check comments left in jinja template
            self.assertIn('homepage template', html) 

    def test_api_new_game(self):
        """Test starting a new game."""

        with app.test_client() as client:
            ...
            # write a test for this route

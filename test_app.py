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
            ...
            # test that you're getting a template

    def test_api_new_game(self):
        """Test starting a new game."""

        with app.test_client() as client:
            ...
            # write a test for this route

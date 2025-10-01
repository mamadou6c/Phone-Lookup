from flask import Flask

def create_app():
	app = Flask(__name__)

	from .lookup import lookup_bp
	app.register_blueprint(lookup_bp)

	return app

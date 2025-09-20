from flask import Flask

def create_app():
	app = Flask(__name__)

	from .route import home_bp
	app.register_blueprint(home_bp)

	return app

from flask import Blueprint
from flask import render_template
from flask import redirect
from flask import request
from flask import session
from flask import url_for

from services.phone_tracker import PhoneTracker

home_bp = Blueprint('tracker', __name__)

@home_bp.get('/')
def index():
	return render_template('tracker.html')

@home_bp.post('/')
def get_coordinate():
	# To be fully implemented later
	tracker = PhoneTracker()
	message = ""

	phone = request.form.get('phone')
	if phone:
		coordinate = tracker.track(phone)
		if coordinate is not None:
			return render_template('tracker.html', coordinate = coordinate)
		else:
			message = ' ERROR ! Unable to track phone'
			return render_template('tracker.html', message=message)

	message = 'ERROR ! No phone provided'
	return render_template('tracker.html', message=message)

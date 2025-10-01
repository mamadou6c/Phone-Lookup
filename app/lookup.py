import json

from flask import Blueprint
from flask import render_template
from flask import Response
from flask import request
from services.phone_lookup import PhoneLookup

phone_lookup = PhoneLookup()
lookup_bp = Blueprint('lookup', __name__)

@lookup_bp.get('/')
def index():
    return render_template('index.html')    

@lookup_bp.post('/lookup')
def lookup():
    data = request.get_json()

    if not data:
        return Response("ERROR : No data in the request body", status=400)

    phone = data.get('phone')
    if not phone:
        return Response('ERROR : No phone number in the body of the request', status=400)

    lookup_data = json.dumps(phone_lookup.lookup(phone))
    if lookup_data:
        return Response(lookup_data, status=200, content_type='application/json')
    else:
        return Response('ERROR : Unable to lookup phone number', status=500)

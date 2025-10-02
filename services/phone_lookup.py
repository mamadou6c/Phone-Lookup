from typing import Optional, Dict
from phonenumbers import parse, geocoder as phone_geocoder, carrier
from opencage.geocoder import OpenCageGeocode
from logging import Logger
from constants.colors import GREEN, RED

from config import Config

class PhoneLookup:
    def __init__(self, api_key: str = None):
        self.api_key = api_key if api_key is not None else Config.OPENCAGE_API_KEY

    def lookup(self, phone_number: str) -> Optional[Dict]:
        try:
            parsed_number = parse(phone_number, None)

            location = phone_geocoder.description_for_number(parsed_number, "en")

            service_provider = carrier.name_for_number(parsed_number, "en")

            opencage_geocoder = OpenCageGeocode(self.api_key)
            results = opencage_geocoder.geocode(str(location))

            if results and len(results):
                lat = results[0]['geometry']['lat']
                lng = results[0]['geometry']['lng']
                formatted_address = results[0]['formatted']
            else:
                lat, lng, formatted_address = None, None, "Not found"

            result = {
                "phone": phone_number,
                "country": location,
                "service_provider": service_provider,
                "latitude": lat,
                "longitude": lng,
                "address": formatted_address
            }

            return result

        except Exception as e:
            return None

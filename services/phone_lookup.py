from typing import Optional, Dict
from phonenumbers import parse, geocoder as phone_geocoder, carrier
from opencage.geocoder import OpenCageGeocode
from logging import Logger
from constants.colors import GREEN, RED

from config import Config
from __logging.logger import setup_logger

class PhoneLookup:
    def __init__(self, api_key: str = None):
        self.api_key = api_key if api_key is not None else Config.OPENCAGE_API_KEY
        self.logger = setup_logger(name='Phone-Lookup', filename='Phone-Lookup.log')

    def lookup(self, phone_number: str) -> Optional[Dict]:
        try:
            self.logger.info(GREEN + "Parsing phone number...")
            parsed_number = parse(phone_number, None)

            self.logger.info(GREEN + "Getting location...")
            location = phone_geocoder.description_for_number(parsed_number, "en")

            self.logger.info(GREEN + "Getting service provider...")
            service_provider = carrier.name_for_number(parsed_number, "en")

            self.logger.info(GREEN + "Fetching detailed location...")
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

            self.logger.info(GREEN + "Lookup completed successfully.")
            return result

        except Exception as e:
            self.logger.error(RED + f"Error looking up number {phone_number}: {e}")
            return None

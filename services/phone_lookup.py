from typing import Dict
from typing import Union

from opencage.geocoder import OpenCageGeocode
from phonenumbers.geocoder import description_for_number
from phonenumbers.carrier import name_for_number
from phonenumbers import parse

from config import Config

class PhoneLookup:
    def __init__(self, api_key: Union[ str | None ]  = None) -> None:
        self.api_key : str | None = api_key if api_key is not None else Config.OPENCAGE_API_KEY

        if self.api_key is None:
            raise ValueError("No api key found ! Make sure your api key is set in .env file or pass it as argument when initializing the PhoneLookup class.")

    def lookup(self, phone_number: Union[str | None] = None) -> Union[ Dict | None]:

        if phone_number is None:
            raise ValueError(f"Phone number not provide ! Phone number is : {phone_number}")
            
        if not isinstance(phone_number, str):
            raise TypeError(f"Phone number most be a string. provide <{type(phone_number)}>")
            
        try:
            parsed_number = parse(phone_number, None)
            location = description_for_number(parsed_number, "en")
            service_provider = name_for_number(parsed_number, "en")
            opencage_geocoder = OpenCageGeocode(self.api_key)
            results = opencage_geocoder.geocode(str(location))

            if results and len(results):
                lat = results[0]['geometry']['lat']
                lng = results[0]['geometry']['lng']
                formatted_address : str = results[0]['formatted']
            else:
                lat, lng, formatted_address = None, None, "Not found"

            result : Dict = {
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

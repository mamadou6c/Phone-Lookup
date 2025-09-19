from constants.colors import GREEN, RED
from __logging.logger import setup_logger
from services.phone_tracker import PhoneTracker
from config import Config

def main():
    logger = setup_logger(name='main', dirname='logs', filename='main.log', console=True)
    logger.info("Starting phone tracker...")

    phone_number = input(GREEN + "Enter phone number: ")
    api_key = Config.API_KEY

    tracker = PhoneTracker(api_key=api_key, logger=logger)
    result = tracker.track(phone_number)

    if result:
        logger.info("\nTracking Result:")
        logger.info(f"Phone Number: {GREEN + result['number']}")
        logger.info(f"Country: {GREEN + result['country']}")
        logger.info(f"Service Provider: {GREEN + result['service_provider']}")
        logger.info(f"Latitude: {GREEN + str(result['latitude'])}")
        logger.info(f"Longitude: {GREEN + str(result['longitude'])}")
        logger.info(f"Address: {GREEN + result['address']}")
    else:
        logger.critical(RED + "Failed to track the phone number. Check logs for details.")

if __name__ == "__main__":
    main()
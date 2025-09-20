import logging
from logging import StreamHandler, FileHandler, Formatter
from typing import Optional
import os
from utils.decorators import check_params_types

@check_params_types({'name': str, 'dirname': str, 'filename': str, 'console': bool})
def setup_logger(
    name: Optional[str] = None,
    dirname: Optional[str] = 'logs',
    filename: Optional[str] = None,
    console: Optional[bool] = False
) -> logging.Logger:
    logger = logging.getLogger(name or __name__)
    logger.setLevel(logging.DEBUG)

    formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    if not logger.handlers:
        if console:
            console_handler = StreamHandler()
            console_handler.setLevel(logging.DEBUG)
            console_handler.setFormatter(formatter)
            logger.addHandler(console_handler)

        if dirname and filename:
            os.makedirs(dirname, exist_ok=True)
            log_path = os.path.join(dirname, filename)
            try:
                file_handler = FileHandler(log_path, mode='a')
                file_handler.setLevel(logging.INFO)
                file_handler.setFormatter(formatter)
                logger.addHandler(file_handler)
            except Exception as e:
                logger.error(f"Erreur lors de l'ajout du FileHandler: {e}")

    return logger

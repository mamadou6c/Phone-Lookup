class ParamError(Exception):
    def __init__(self, message: str = 'Erreur de paramètre') -> None:
        if not isinstance(message, str):
            raise ValueError("Le paramètre 'message' doit être une chaîne de caractères.")
        self.message = message
        super().__init__(self.message)
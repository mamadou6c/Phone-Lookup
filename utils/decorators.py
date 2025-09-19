from functools import wraps
from inspect import signature
from typing import Dict, Union, Tuple
from .exceptions import ParamError

def check_params_types(expected_types: Dict[str, Union[type, Tuple[type, ...]]]):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            sig = signature(func)
            bound_args = sig.bind(*args, **kwargs)
            bound_args.apply_defaults()

            for param, value in bound_args.arguments.items():
                expected_type = expected_types.get(param)
                if expected_type:
                    if isinstance(expected_type, tuple):
                        if not any(isinstance(value, typ) for typ in expected_type):
                            raise ParamError(
                                f"Argument '{param}'={value} (type {type(value)}) invalide, attendu l'un de : {expected_type}"
                            )
                    elif not isinstance(value, expected_type):
                        raise ParamError(
                            f"Argument '{param}'={value} (type {type(value)}) invalide, attendu : {expected_type}"
                        )

            return func(*args, **kwargs)
        return wrapper
    return decorator
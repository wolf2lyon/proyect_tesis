from flask import Flask
from .routes import main
from .config import Config
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, origins=["http://20.9.136.223:5173"])
    # Crea la carpeta de subida si no existe
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Registra las rutas
    app.register_blueprint(main)

    return app
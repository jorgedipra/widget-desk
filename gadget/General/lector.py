import pyttsx3
import keyboard
import pyperclip

def speak_text():
    # Obtener el texto del portapapeles
    text = pyperclip.paste()
    # Crear un motor de pyttsx3
    engine = pyttsx3.init()
    # Configurar propiedades de voz si es necesario (opcional)
    engine.setProperty('rate', 150)  # Velocidad de habla
    engine.setProperty('volume', 0.9)  # Volumen de habla
    # Convertir texto a voz
    engine.say(text)
    engine.runAndWait()

# Asignar la función speak_text a la combinación de teclas 'Ctrl' + 'Enter'
keyboard.add_hotkey('ctrl+enter', speak_text)

# Mantener el programa en ejecución
print("Presiona 'Ctrl' + 'Enter' para convertir el texto seleccionado en voz.")
keyboard.wait('esc')  # Esperar a que se presione la tecla 'esc' para salir

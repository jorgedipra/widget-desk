import pyttsx3
import keyboard
import pyperclip
import threading
import time
import sys

# Bandera para indicar si el programa debe seguir funcionando
running = True

def speak_text():
    if not running:
        return
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

def stop_program():
    global running
    print("El programa se cerrará después de 30 segundos.")
    time.sleep(30)
    print("Tiempo expirado. El programa se cerrará ahora.")
    running = False
    # Esperar un momento para permitir que las acciones actuales se completen
    time.sleep(1)
    sys.exit()

# Asignar la función speak_text a la combinación de teclas 'Ctrl' + 'Enter'
keyboard.add_hotkey('ctrl+enter', speak_text)

# Iniciar el temporizador en un hilo separado
timer_thread = threading.Thread(target=stop_program)
timer_thread.start()

# Mantener el programa en ejecución
print("Presiona 'Ctrl' + 'Enter' para convertir el texto seleccionado en voz.")
keyboard.wait('esc')  # Esperar a que se presione la tecla 'esc' para salir

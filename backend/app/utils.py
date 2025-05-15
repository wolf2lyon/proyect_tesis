import os
import re
import docx2txt
import PyPDF2
import joblib
import os

# Obtener ruta absoluta al directorio del proyecto
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, 'ml_models')

# Cargar los modelos
svc_model = joblib.load(os.path.join(MODEL_DIR, 'svc_model.joblib'))
tfidf = joblib.load(os.path.join(MODEL_DIR, 'tfidf.joblib'))
le = joblib.load(os.path.join(MODEL_DIR, 'label_encoder.joblib'))



def extract_text_from_pdf(file_path):
    text = ""
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            content = page.extract_text()
            if content:
                text += content
    return text

def extract_text_from_docx(file_path):
    return docx2txt.process(file_path)

def extract_text_from_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def extract_text(file_path):
    if file_path.endswith('.pdf'):
        return extract_text_from_pdf(file_path)
    elif file_path.endswith('.docx'):
        return extract_text_from_docx(file_path)
    elif file_path.endswith('.txt'):
        return extract_text_from_txt(file_path)
    return ""

def cleanResume(txt):
    cleanText = re.sub('http\S+\s', ' ', txt)
    cleanText = re.sub('RT|cc', ' ', cleanText)
    cleanText = re.sub('#\S+\s', ' ', cleanText)
    cleanText = re.sub('@\S+', '  ', cleanText)
    cleanText = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', cleanText)
    cleanText = re.sub(r'[^\x00-\x7f]', ' ', cleanText)
    cleanText = re.sub('\s+', ' ', cleanText)
    return cleanText

# Function to predict the category of a resume with confidence
def pred_con_confianza(input_resume, threshold=-0.16):
    cleaned_text = cleanResume(input_resume)
    vectorized_text = tfidf.transform([cleaned_text])

    # Convert to dense matrix before prediction
    vectorized_text = vectorized_text.toarray()  # Convert to dense

    # Obtener probabilidades (solo si tu modelo lo soporta)
    try:
        probs = svc_model.predict_proba(vectorized_text)  # Now this will work if enabled during training
        max_prob = max(probs[0])
        print(max_prob)
        if max_prob < threshold:
            return "Desconocido"
        predicted_category = svc_model.predict(vectorized_text)
    except AttributeError:
        # Para SVC sin `predict_proba`, puedes usar decision_function
        decision = svc_model.decision_function(vectorized_text) 
        confidence = max(decision[0])  # Mayor distancia al margen
        print(confidence)
        if confidence < threshold:
            return "Desconocido"
        predicted_category = svc_model.predict(vectorized_text)

    predicted_category_name = le.inverse_transform(predicted_category)
    return predicted_category_name[0]



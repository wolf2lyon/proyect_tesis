from flask import Blueprint, request, render_template, current_app
from .utils import extract_text
from .utils import pred_con_confianza
import json
import os


main = Blueprint('main', __name__)

@main.route('/matcher', methods=['POST'])
def matcher():
    job_description = request.form.get('job_description')
    resume_files = request.files.getlist('resumes')

    print(job_description)
    print(resume_files)

    if not resume_files or not job_description:
        return  {
            "message":"Please upload resumes and enter a job description."
        }

    resumes = []
    filenames = []

    for file in resume_files:
        save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file.filename)
        file.save(save_path)
        text = extract_text(save_path)
        if text:
            resumes.append(text)
            filenames.append(file.filename)

    
    resumes_export = []

    for idx, texto in enumerate(resumes):
        categoria = pred_con_confianza(texto)
        if categoria != "Desconocido" and categoria == job_description:
            resumen_info = {
                "filename": filenames[idx],
                "category": categoria,
                "content": texto
            }
            resumes_export.append(resumen_info)

    json_resultado = json.dumps(resumes_export, ensure_ascii=False, indent=2)
    
    return json_resultado

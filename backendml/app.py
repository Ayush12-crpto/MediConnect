from flask import Flask, request, jsonify
import os
import joblib
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Allow React frontend to access this backend

import pandas as pd

# Load the trained ML models
model_diabetes = joblib.load("trained_model.sav")
model_heart = joblib.load("trained_model_heart.sav")
scaler_diabetes = joblib.load("scaler.joblib")

@app.route("/")
def home():
    return "Flask server is running!"

@app.route("/predict-diabetes", methods=["POST"])
def predict_diabetes():
    try:
        data = request.get_json()
        input_data = data.get("features", data)
        
        if isinstance(input_data, dict):
            # Parse dict inputs
            gender = input_data.get("gender", "Female")
            age = float(input_data.get("age", 0))
            hypertension = int(input_data.get("hypertension", 0))
            heart_disease = int(input_data.get("heart_disease", 0))
            smoking_history = input_data.get("smoking_history", "never")
            bmi = float(input_data.get("bmi", 0))
            hba1c = float(input_data.get("HbA1c_level", 0))
            glucose = float(input_data.get("blood_glucose_level", 0))
            
            # One-hot encoding
            gender_Male = 1 if gender == "Male" else 0
            sm_current = 1 if smoking_history == "current" else 0
            sm_ever = 1 if smoking_history == "ever" else 0
            sm_former = 1 if smoking_history == "former" else 0
            sm_never = 1 if smoking_history == "never" else 0
            sm_not_current = 1 if smoking_history == "not current" else 0
            
            # Recreate DataFrame to scale
            input_df = pd.DataFrame([{
                'age': age,
                'hypertension': hypertension,
                'heart_disease': heart_disease,
                'bmi': bmi,
                'HbA1c_level': hba1c,
                'blood_glucose_level': glucose,
                'gender_Male': gender_Male,
                'smoking_history_current': sm_current,
                'smoking_history_ever': sm_ever,
                'smoking_history_former': sm_former,
                'smoking_history_never': sm_never,
                'smoking_history_not current': sm_not_current
            }])
            
            # Scale numeric columns
            columns_to_scale = ['age', 'bmi', 'HbA1c_level', 'blood_glucose_level']
            input_df[columns_to_scale] = scaler_diabetes.transform(input_df[columns_to_scale])
            
            # Predict
            prediction = model_diabetes.predict(input_df).tolist()
            return jsonify({"prediction": prediction})
        else:
            # Fallback array
            features = np.array(input_data).reshape(1, -1)
            prediction = model_diabetes.predict(features).tolist()
            return jsonify({"prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/predict-heart", methods=["POST"])
def predict_heart():
    try:
        data = request.get_json()
        features = np.array(data["features"]).reshape(1, -1)
        prediction = model_heart.predict(features).tolist()
        return jsonify({"prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # Default to 10000 if PORT is not set
    app.run(host="0.0.0.0", port=port,debug=True)

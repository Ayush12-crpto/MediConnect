import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

print("Starting training script...")

# Load the dataset
try:
    df = pd.read_csv('diabetes_prediction_dataset.csv')
except FileNotFoundError:
    print("Error: 'diabetes_prediction_dataset.csv' not found.")
    exit(1)

# Remove duplicates and 'Other' gender category
df = df.drop_duplicates()
df = df[df['gender'] != 'Other']
print(f"Dataset shape after cleaning: {df.shape}")

# Data Preprocessing
df_processed = df.copy()
df_processed = pd.get_dummies(df_processed, columns=['gender', 'smoking_history'], drop_first=True)
print("Categorical encoding completed.")

# Train-Test Split
X = df_processed.drop('diabetes', axis=1)
y = df_processed['diabetes']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scaling
scaler = StandardScaler()
columns_to_scale = ['age', 'bmi', 'HbA1c_level', 'blood_glucose_level']
X_train[columns_to_scale] = scaler.fit_transform(X_train[columns_to_scale])

# Save the scaler
joblib.dump(scaler, 'scaler.joblib')
print("Scaler saved as 'scaler.joblib'")

# Train Random Forest Classifier
print("Training Random Forest Classifier...")
rf_model = RandomForestClassifier(random_state=42, n_estimators=100)
rf_model.fit(X_train, y_train)

# Save the model as trained_model.sav (to match app.py loading)
joblib.dump(rf_model, 'trained_model.sav')
print("Model saved as 'trained_model.sav'")
print("Training finished successfully!")

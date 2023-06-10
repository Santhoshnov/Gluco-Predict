from flask import Flask, request, render_template, jsonify
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = pd.read_csv('diabetes.csv')
x = data.drop('Outcome', axis=1)
y = data['Outcome']

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
scaler.fit(x_train)
x_train_scaled = scaler.transform(x_train)

model = LogisticRegression(max_iter=1000, solver='saga')
model.fit(x_train_scaled, y_train)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    required_fields = ['pregnancies', 'glucose', 'bloodPressure', 'skinThickness', 'insulin', 'bmi', 'diabetesPedigreeFunction', 'age']
    input_data = []

    for field in required_fields:
        value = request.json.get(field)
        if value is None or value == '':
            return jsonify({'error': f'Missing value for field: {field}'}), 400
        input_data.append(float(value))

    input_data_scaled = scaler.transform([input_data])

    prediction = model.predict(input_data_scaled)[0]

    if prediction == 0:
        result = 'not diabetic'
    else:
        result = 'diabetic'

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)

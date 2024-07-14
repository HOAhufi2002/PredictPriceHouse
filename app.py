from flask import Flask, request, render_template, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Tải mô hình đã huấn luyện
model = joblib.load('house_price_model.pkl')

# Định nghĩa các tính năng theo thứ tự đã huấn luyện
FEATURES = [
    'bedrooms', 'bathrooms', 'sqft_living', 'sqft_lot', 'floors',
    'waterfront', 'view', 'condition', 'grade', 'sqft_above',
    'sqft_basement', 'yr_built', 'yr_renovated', 'zipcode', 'lat',
    'long', 'sqft_living15', 'sqft_lot15'
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_data = {
        'bedrooms': float(data['bedrooms']),
        'bathrooms': float(data['bathrooms']),
        'sqft_living': float(data['sqft_living']),
        'sqft_lot': float(data['sqft_lot']),
        'floors': float(data['floors']),
        'waterfront': int(data['waterfront']),
        'view': int(data['view']),
        'condition': int(data['condition']),
        'grade': int(data['grade']),
        'sqft_above': float(data['sqft_above']),
        'sqft_basement': float(data['sqft_basement']),
        'yr_built': int(data['yr_built']),
        'yr_renovated': int(data['yr_renovated']),
        'zipcode': int(data['zipcode']),
        'lat': float(data['lat']),
        'long': float(data['long']),
        'sqft_living15': float(data['sqft_living15']),
        'sqft_lot15': float(data['sqft_lot15'])
    }
    
    # Sắp xếp các tính năng theo đúng thứ tự
    input_df = pd.DataFrame([input_data])[FEATURES]
    
    # Dự đoán giá nhà
    prediction = model.predict(input_df)
    predicted_price = prediction[0]
    
    return jsonify({'predicted_price': predicted_price})

if __name__ == "__main__":
    app.run(debug=True)

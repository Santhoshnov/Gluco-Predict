import React, { useState } from 'react';

function PredictForm() {
  const [pregnancies, setPregnancies] = useState('');
  const [glucose, setGlucose] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [skinThickness, setSkinThickness] = useState('');
  const [insulin, setInsulin] = useState('');
  const [bmi, setBmi] = useState('');
  const [diabetesPedigreeFunction, setDiabetesPedigreeFunction] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigreeFunction,
      age
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      setResult(data.result);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Pregnancies:</label>
          <input type="number" value={pregnancies} onChange={e => setPregnancies(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block">Glucose:</label>
          <input type="number" value={glucose} onChange={e => setGlucose(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block">Blood Pressure:</label>
          <input type="number" value={bloodPressure} onChange={e => setBloodPressure(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block">Skin Thickness:</label>
          <input type="number" value={skinThickness} onChange={e => setSkinThickness(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block">Insulin:</label>
          <input type="number" value={insulin} onChange={e => setInsulin(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block">BMI:</label>
          <input type="number" value={bmi} onChange={e => setBmi(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
        <div className="mb-4">
          <label className="block">Diabetes Pedigree Function:</label>
          <input type="number" value={diabetesPedigreeFunction} onChange={e => setDiabetesPedigreeFunction(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block">Age:</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Predict</button>
      </form>
      {result && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Diabetes Prediction Result:</h2>
          <p className="mt-4">The person is {result}</p>
        </div>
      )}
    </div>
  );
}

export default PredictForm;

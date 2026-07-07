import { useState } from "react";
import axios from "axios";

const DiseasePredictor = () => {
  const [selectedPredictor, setSelectedPredictor] = useState("diabetes");
  const [formData, setFormData] = useState({
    gender: "Female",
    age: "",
    hypertension: "0",
    heart_disease: "0",
    smoking_history: "never",
    bmi: "",
    HbA1c_level: "",
    blood_glucose_level: "",
  });
  const [heartFormData, setHeartFormData] = useState({
    Age: "",
    Sex: "",
    ChestPainLevel0_3: "",
    RestingBloodPressure: "",
    SerumCholestoralMgDl: "",
    FastingBloodSugargreaterthan120: "",
    RestingElectrocardiographicResultsvalues: "",
    MaximumHeartRateAchieved: "",
    ExerciseInducedAngina: "",
    OldPeakST: "",
    Slope: "",
    vessels: "",
    thal: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    if (selectedPredictor === "diabetes") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setHeartFormData({ ...heartFormData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:10000";
      
      const payload = selectedPredictor === "diabetes"
        ? formData
        : { features: Object.values(heartFormData).map(Number) };

      const response = await axios.post(`${API_URL}/predict-${selectedPredictor}`, payload);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const predictorFields = selectedPredictor === "diabetes" ? formData : heartFormData;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[30%] sm:w-1/4 h-screen text-gray-800 p-2 sm:p-5 border-r-2">
        <h2 className="text-[18px] text-gray-700 font-bold sm:text-xl">Select Predictor</h2>
        <ul className="mt-4">
          <li className={`cursor-pointer rounded-lg px-1 sm:px-4 text-[17px] py-2 ${selectedPredictor === "diabetes" && "bg-gray-300"}`} onClick={() => { setSelectedPredictor("diabetes"); setPrediction(null); }}>
            Diabetes Predictor
          </li>
          <li className={`cursor-pointer rounded-lg px-1 sm:px-4 text-[17px] py-2 ${selectedPredictor === "heart" && "bg-gray-300"} `} onClick={() => { setSelectedPredictor("heart"); setPrediction(null); }}>
            Heart Disease Predictor
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-10">
        <div className="text-center text-2xl text-gray-500">
          <p>{selectedPredictor.toUpperCase()} <span className="text-gray-700 font-medium">PREDICTOR</span></p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col text-start mt-10 gap-3">
          {Object.keys(predictorFields).map((key, index) => {
            const isSelect = ["gender", "smoking_history", "hypertension", "heart_disease"].includes(key);

            return (
              <div key={index} className="flex flex-col gap-2">
                <p className="text-xl text-gray-600 font-medium">
                  {key
                    .replace(/(GlucoseLevel)/g, "GlucoseLevel (30-400 mg/dl)")
                    .replace(/(BloodPressure)/g, "Diastolic Blood Pressure (40-120 mm HG)")
                    .replace(/(MgDl)/g, " (mg/dl)")
                    .replace(/(Sex)/g, "Sex: Male-1, Female-0")
                    .replace(/(0_3)/g, " (0-3)")
                    .replace(/(greaterthan120)/g, " > 120 mg/dl = 1, <120 mg/dl=0")
                    .replace(/(values)/g, " (0,1,2)")
                    .replace(/(ST)/g, " of ECG graph = ST depression induced by exercise relative to rest")
                    .replace(/(Slope)/g, "The slope of the peak exercise ST segment in ECG graph")
                    .replace(/(vessels)/g, "Number of major vessels (0-3) colored by flourosopy")
                    .replace(/(thal)/g, "Myocardial Ischemia Classification : 0 = normal; 1 = fixed defect; 2 = reversable defect")
                    .replace(/(HbA1c_level)/g, "HbA1c Level")
                    .replace(/(blood_glucose_level)/g, "Blood Glucose Level")
                    .replace(/(heart_disease)/g, "Heart Disease")
                    .replace(/(smoking_history)/g, "Smoking History")
                    .replace(/([A-Z_])/g, " $1")}
                </p>

                {isSelect ? (
                  <select
                    className="border px-2 text-gray-700 rounded-sm border-gray-200 bg-[#effafd] h-9"
                    name={key}
                    value={predictorFields[key]}
                    onChange={handleChange}
                    required
                  >
                    {key === "gender" && (
                      <>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </>
                    )}
                    {key === "smoking_history" && (
                      <>
                        <option value="never">never</option>
                        <option value="No Info">No Info</option>
                        <option value="current">current</option>
                        <option value="former">former</option>
                        <option value="ever">ever</option>
                        <option value="not current">not current</option>
                      </>
                    )}
                    {(key === "hypertension" || key === "heart_disease") && (
                      <>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    className="border px-2 text-gray-700 rounded-sm border-gray-200 bg-[#effafd] h-9"
                    type="number"
                    step="any"
                    name={key}
                    value={predictorFields[key]}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            );
          })}

          <div className="flex items-center justify-center mt-8">
            <button className="px-4 py-2 bg-primary hover:bg-[#256878] text-white rounded-lg">
              Predict {selectedPredictor === "diabetes" ? "Diabetes" : "Heart Disease"}
            </button>
          </div>
        </form>

        {prediction !== null && (
          <div className="flex justify-center text-center mt-5 text-xl">
            <p className={`py-1 rounded-lg px-4 transition-all ${prediction == 1 ? 'bg-red-500 text-white' : "bg-green-500 text-white"}`}>
              You are {prediction == 1 ? "at risk" : "not at risk"} for {selectedPredictor === "diabetes" ? "Diabetes" : "Heart Disease"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseasePredictor;

function showModal() {
  document.getElementById("prediction-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("prediction-modal").style.display = "none";
}

function updatePrediction() {
  const data = {
    bedrooms: document.getElementById("bedrooms").value,
    bathrooms: document.getElementById("bathrooms").value,
    sqft_living: document.getElementById("sqft_living").value,
    sqft_lot: document.getElementById("sqft_lot").value,
    floors: document.getElementById("floors").value,
    waterfront: document.getElementById("waterfront").value,
    view: document.getElementById("view").value,
    condition: document.getElementById("condition").value,
    grade: document.getElementById("grade").value,
    yr_built: document.getElementById("yr_built").value,
    lat: document.getElementById("lat").value,
    long: document.getElementById("long").value,
    sqft_above: document.getElementById("sqft_above").value,
    sqft_basement: document.getElementById("sqft_basement").value,
    yr_renovated: document.getElementById("yr_renovated").value,
    zipcode: document.getElementById("zipcode").value,
    sqft_living15: document.getElementById("sqft_living15").value,
    sqft_lot15: document.getElementById("sqft_lot15").value,
  };

  fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "predicted-price"
      ).innerText = `Giá nhà dự đoán: $${data.predicted_price.toFixed(2)}`;
    })
    .catch((error) => console.error("Error:", error));
}

// Initialize sliders
document.addEventListener("DOMContentLoaded", function () {
  const sliders = [
    { id: "bedrooms", min: 0, max: 10, step: 1, start: 3 },
    { id: "bathrooms", min: 0, max: 10, step: 1, start: 2 },
    { id: "sqft_living", min: 500, max: 10000, step: 50, start: 1500 },
    { id: "sqft_lot", min: 500, max: 100000, step: 50, start: 5000 },
    { id: "floors", min: 1, max: 4, step: 1, start: 1 },
    { id: "waterfront", min: 0, max: 1, step: 1, start: 0 },
    { id: "view", min: 0, max: 4, step: 1, start: 0 },
    { id: "condition", min: 1, max: 5, step: 1, start: 3 },
    { id: "grade", min: 1, max: 13, step: 1, start: 7 },
    { id: "yr_built", min: 1900, max: 2023, step: 1, start: 2000 },
    { id: "lat", min: 47, max: 48, step: 0.01, start: 47.5 },
    { id: "long", min: -123, max: -121, step: 0.01, start: -122.2 },
    { id: "sqft_above", min: 500, max: 10000, step: 50, start: 1500 },
    { id: "sqft_basement", min: 0, max: 5000, step: 50, start: 0 },
    { id: "yr_renovated", min: 0, max: 2023, step: 1, start: 0 },
    { id: "zipcode", min: 10000, max: 99999, step: 1, start: 98101 },
    { id: "sqft_living15", min: 500, max: 10000, step: 50, start: 1500 },
    { id: "sqft_lot15", min: 500, max: 100000, step: 50, start: 5000 },
  ];

  sliders.forEach(function (slider) {
    const sliderElement = document.getElementById(slider.id + "-slider");
    noUiSlider.create(sliderElement, {
      start: slider.start,
      step: slider.step,
      range: {
        min: slider.min,
        max: slider.max,
      },
      format: wNumb({
        decimals: slider.step % 1 === 0 ? 0 : 2,
      }),
    });
    sliderElement.noUiSlider.on("update", function (values, handle) {
      document.getElementById(slider.id).value = values[handle];
      document.getElementById(slider.id + "-value").innerText = values[handle];
    });
  });
});

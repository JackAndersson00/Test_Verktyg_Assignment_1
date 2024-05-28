async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch failed:", error);
    }
  }
  
  function populateAgeOptions() {
      const selectElement = document.getElementById('age');
      selectElement.innerHTML = '';
      const placeholderOption = document.createElement('option');
      placeholderOption.value = "placeholder";
      placeholderOption.text = "Select age";
      selectElement.add(placeholderOption);
  
      for (let i = 18; i <= 65; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.text = i;
          selectElement.add(option);
      }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
      populateAgeOptions();
  });
  
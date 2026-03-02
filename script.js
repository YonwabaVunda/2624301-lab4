const loadingIndicator = document.getElementById('loading-spinner');
async function searchCountry(countryName) {
    loadingIndicator.classList.remove('hidden');
    try {
        // Show loading spinner
        // Fetch country data
        // Update DOM
        // Fetch bordering countries
        // Update bordering countries section
        // Example DOM updates
        // Example API call
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) throw new Error('Country not found');
        const data = await response.json();
        const country = data[0];
        const capital = country.capital ? country.capital[0] : "no capital";
        const population = country.population;
        const region = country.region;
        const flag = country.flags.svg;
        const borders = country.borders || [];
        document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${region}</p>
            <img src="${flag}" alt="${country.name.common} flag">
        `;
        await fetchBorderingCountries(borders);
    } catch (error) {
        // Show error message
        document.getElementById('error-message').innerHTML = "<p>Country not found. Please try again.</p>";
    } finally {
        // Hide loading spinner
        loadingIndicator.classList.add('hidden');
        
    }
}
async function fetchBorderingCountries(code) {
    const bordersContainer = document.getElementById("bordering-countries");
    bordersContainer.innerHTML = "";

    if (code.length === 0) {
        bordersContainer.innerHTML = "<p>No bordering countries.</p>";
        return;
    }

    const url = `https://restcountries.com/v3.1/alpha?codes=${code.join(",")}`;

    try {
        const response = await fetch(url);
        const borderCountries = await response.json();

        borderCountries.forEach(border => {
            const flag = border.flags.svg;
            bordersContainer.innerHTML += `
                <section>
                    <h4>${border.name.common}</h4>
                    <img src="${flag}" alt="Flag of ${border.name.common}">
                </section>
            `;
        });
    } catch (error) {
        document.getElementById('error-message').innerHTML = "<p>Error fetching bordering countries. Please try again.</p>";
    }
}
// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});
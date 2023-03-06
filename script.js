const breweryList = document.getElementById('breweryList');
const searchInput = document.getElementById('searchInput');

async function getBreweries() {
  const response = await fetch('https://api.openbrewerydb.org/breweries');
  const data = await response.json();
  return data;
}

async function searchBreweries(query) {
  const response = await fetch(`https://api.openbrewerydb.org/breweries/search?query=${query}`);
  const data = await response.json();
  return data;
}

async function displayBreweries() {
  const breweries = await getBreweries();
  breweryList.innerHTML = '';
  breweries.forEach((brewery) => {
    const breweryDiv = document.createElement('div');
    breweryDiv.classList.add('brewery');

    const name = document.createElement('h2');
    name.innerText = brewery.name;

    const type = document.createElement('p');
    type.innerText = `Type: ${brewery.brewery_type}`;

    const address = document.createElement('p');
    address.innerText = `Address: ${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.postal_code}`;

    const website = document.createElement('a');
    website.href = brewery.website_url;
    website.innerText = 'Website';

    const phone = document.createElement('p');
    phone.innerText = `Phone: ${brewery.phone}`;

    breweryDiv.appendChild(name);
    breweryDiv.appendChild(type);
    breweryDiv.appendChild(address);
    breweryDiv.appendChild(website);
    breweryDiv.appendChild(phone);
    breweryList.appendChild(breweryDiv);
  });
}

displayBreweries();

searchInput.addEventListener('input', async (event) => {
  const query = event.target.value.trim();
  try {
    if (query) {
      const results = await searchBreweries(query);
      breweryList.innerHTML = '';
      results.forEach((result) => {
        const breweryDiv = document.createElement('div');
        breweryDiv.classList.add('brewery');

        const name = document.createElement('h2');
        name.innerText = result.name;

        const type = document.createElement('p');
        type.innerText = `Type: ${result.brewery_type}`;

        const address = document.createElement('p');
        address.innerText = `Address: ${result.street}, ${result.city}, ${result.state}, ${result.postal_code}`;

        const website = document.createElement('a');
        website.href = result.website_url;
        website.innerText = 'Website';

        const phone = document.createElement('p');
        phone.innerText = `Phone: ${result.phone}`;

        breweryDiv.appendChild(name);
        breweryDiv.appendChild(type);
        breweryDiv.appendChild(address);
        breweryDiv.appendChild(website);
        breweryDiv.appendChild(phone);
        breweryList.appendChild(breweryDiv);
      });
    } else {
      displayBreweries();
    }
  } catch (error) {
    console.error(error);
  }
});
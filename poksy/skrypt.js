async function fetchData(x, elementId, spriteType) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${x}`);
    const data = await response.json();
    let pokemonSprite;
    if (spriteType === "back") {
      pokemonSprite = data.sprites.back_default;
    } else if (spriteType === "front") {
      pokemonSprite = data.sprites.front_default;
    }
    const imgElement = document.getElementById(elementId);
    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}

async function fetchPokemonData(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error("Nie udało się pobrać danych o Pokemonie");
    }
    const data = await response.json();
    const name = data.name;
    const hp = data.stats.find((stat) => stat.stat.name === "hp").base_stat;
    const moves = data.moves.slice(0, 2).map((move) => move.move.name);
    return { name, hp, moves };
  } catch (error) {
    console.error(error);
  }
}

async function fetchMoveDamage(moveName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
    if (!response.ok) {
      throw new Error("Nie udało się pobrać danych o ataku");
    }
    const data = await response.json();
    const damage = data.power || 0; // Sprawdzanie obrażeń ataku, jeśli nie ma danych, przyjmujemy 0
    return damage;
  } catch (error) {
    console.error(error);
  }
}

async function losowanie() {
  try {
    let x1, x2;

    do {
      x1 = Math.floor(Math.random() * 151);
      x2 = Math.floor(Math.random() * 151);
    } while (x1 === x2);

    const { name: name1, hp: hp1, moves: moves1 } = await fetchPokemonData(x1);
    const { name: name2, hp: hp2, moves: moves2 } = await fetchPokemonData(x2);

    document.getElementById("hp1").innerText = `${name1} - HP: ${hp1}/${hp1}`;
    document.getElementById("hp1").setAttribute("data-hp", hp1); // Dodanie atrybutu data-hp
    document.getElementById("hp2").innerText = `${name2} - HP: ${hp2}/${hp2}`;
    document.getElementById("hp2").setAttribute("data-hp", hp2); // Dodanie atrybutu data-hp

    document.getElementById("pokemonSprite1").src = "";
    document.getElementById("pokemonSprite2").src = "";

    fetchData(x1, "pokemonSprite1", "back");
    fetchData(x2, "pokemonSprite2", "front");

    const atakiElement = document.getElementById("ataki");
    atakiElement.innerHTML = ""; // Usunięcie poprzednich ataków

    moves1.forEach((move) => {
      const button = document.createElement("button");
      button.innerText = move;
      button.addEventListener("click", async () => {
        const damage = await fetchMoveDamage(move);
        let hp2 = parseInt(
          document.getElementById("hp2").getAttribute("data-hp")
        ); // Pobranie punktów życia
        hp2 -= damage; // Odejmowanie obrażeń od zdrowia drugiego pokemona
        if (hp2 < 0) hp2 = 0; // Zabezpieczenie, aby punkty życia nie były ujemne
        document.getElementById(
          "hp2"
        ).innerText = `${name2} - HP: ${hp2}/${hp2}`;
        document.getElementById("hp2").setAttribute("data-hp", hp3); // Aktualizacja atrybutu data-hp
      });
      atakiElement.appendChild(button);
    });

    moves2.forEach((move) => {
      const button = document.createElement("button");
      button.innerText = move;
      button.addEventListener("click", async () => {
        const damage = await fetchMoveDamage(move);
        let hp1 = parseInt(
          document.getElementById("hp1").getAttribute("data-hp")
        ); // Pobranie punktów życia
        hp1 -= damage; // Odejmowanie obrażeń od zdrowia pierwszego pokemona
        if (hp1 < 0) hp1 = 0; // Zabezpieczenie, aby punkty życia nie były ujemne
        document.getElementById(
          "hp1"
        ).innerText = `${name1} - HP: ${hp1}/${hp1}`;
        document.getElementById("hp1").setAttribute("data-hp", hp1); // Aktualizacja atrybutu data-hp
      });
      atakiElement.appendChild(button);
    });
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("przycisk").onclick = losowanie;

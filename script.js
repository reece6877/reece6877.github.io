const ICON_PATH = "siegeimages/"; // Ensure this matches your folder name exactly

function getIconUrl(opName) {
    const name = opName.toLowerCase().replace(" ", ""); // removes spaces for names like "Black Beard"
    
    // We create an array of the possible patterns you have in your folder
    const patterns = [
        `r6-operator-list-${name}.avif`,
        `r6-operators-list-${name}.avif`,
        `r6s-operator-list-${name}.avif`,
        `r6s-operators-list-${name}.avif`
    ];

    // Specific fixes for the ones with random numbers in your screenshot
    if (name === "ash") return `${ICON_PATH}r6-operators-list-ash_317253.avif`;
    if (name === "mozzie") return `${ICON_PATH}r6-operators-list-mozzie_343537.avif`;
    if (name === "wamai") return `${ICON_PATH}r6-operators-list-wamai_358318.avif`;
    if (name === "kali") return `${ICON_PATH}r6-operators-list-kali_358317.avif`;
    if (name === "denari") return `${ICON_PATH}r6s-operators-list-denari__2_.avif`;

    // For the rest, we'll try the most common pattern first
    // Since JS can't "check" if a file exists easily without a server, 
    // we will default to 'r6-operators-list-' as it seems most common in your shots.
    return `${ICON_PATH}r6-operators-list-${name}.avif`;
}

function rollOperators() {
    const atk = attackers[Math.floor(Math.random() * attackers.length)];
    const def = defenders[Math.floor(Math.random() * defenders.length)];

    const atkIcon = document.getElementById('atk-icon');
    const defIcon = document.getElementById('def-icon');

    // This part is CRITICAL: 
    // It tries to load the image. If it fails (onerror), it tries the SECOND most common pattern.
    const tryAlternative = (img, name) => {
        const altPath = `${ICON_PATH}r6s-operators-list-${name.toLowerCase()}.avif`;
        img.src = altPath;
        // If it fails again, show initials
        img.onerror = () => {
            img.parentElement.innerHTML = name.slice(0,2).toUpperCase();
        };
    };

    atkIcon.innerHTML = `<img src="${getIconUrl(atk)}" class="op-img" onerror="tryAlternative(this, '${atk}')">`;
    defIcon.innerHTML = `<img src="${getIconUrl(def)}" class="op-img" onerror="tryAlternative(this, '${def}')">`;

    document.getElementById('atk-name').innerHTML = `<span class="anim">${atk}</span>`;
    document.getElementById('def-name').innerHTML = `<span class="anim">${def}</span>`;
    
    // Pop animation
    const cards = [document.getElementById('atk-card'), document.getElementById('def-card')];
    cards.forEach(card => {
        card.classList.remove('pop');
        void card.offsetWidth;
        card.classList.add('pop');
    });
}

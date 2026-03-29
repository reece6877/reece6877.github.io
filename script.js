const attackers = ["Sledge","Thatcher","Ash","Thermite","Twitch","Montagne","Glaz","Fuze","Blitz","IQ","Buck","Blackbeard","Capitao","Hibana","Jackal","Ying","Zofia","Dokkaebi","Lion","Finka","Maverick","Nomad","Gridlock","Nokk","Amaru","Kali","Iana","Ace","Zero","Flores","Osa","Sens","Grim","Brava","Ram","Deimos","Denari","Striker"];
const defenders = ["Smoke","Mute","Castle","Pulse","Doc","Rook","Kapkan","Tachanka","Jager","Bandit","Frost","Valkyrie","Caveira","Echo","Mira","Lesion","Ela","Vigil","Maestro","Alibi","Clash","Kaid","Mozzie","Warden","Goyo","Wamai","Oryx","Melusi","Aruni","Thunderbird","Thorn","Azami","Solis","Fenrir","Tubarao","Sentry","Skopos"];

const challenges = [
    { name: "Pistols Only", desc: "No primary. Sidearm all round. Yes, the whole round." },
    { name: "Iron Sights Only", desc: "No optics. Remove every scope and play completely ironsights." },
    { name: "No Sprinting", desc: "Walk only. You are not in a rush. You are calm. You are slow." },
    { name: "Floor is Lava", desc: "Stay off the ground floor at all times. Upstairs or rooftops only." },
    { name: "Crouch Walk", desc: "No standing. Crouch the entire round like your knees are broken." },
    { name: "Hipfire Only", desc: "No ADS whatsoever. All kills must be hipfired. Point and pray." },
    { name: "No Gadget", desc: "Do not deploy your operator gadget. Just you and your gun." },
    { name: "Drone Blindfolded", desc: "No droning allowed at all. Go in completely blind." },
    { name: "Window Gang", desc: "Every entry must be through a window. No doors allowed." },
    { name: "No Peeking", desc: "No leaning. Ever. If you can't see it straight on, you don't see it." },
    { name: "Reload After Every Kill", desc: "Mandatory full reload after every single elimination." },
    { name: "Maximum Aggression", desc: "Push immediately. No waiting. First 10 seconds — go." },
    { name: "Knife Finish", desc: "Down them with guns, but the final kill must be a melee." },
    { name: "Backwards Only", desc: "Move backwards the entire round. Strafe is fine, forward is banned." }
];

const ICON_PATH = "siegeimages/"; 

// This function tries to find the right name pattern automatically
function tryAllPaths(img, opName, attempt = 0) {
    const name = opName.toLowerCase().replace(/\s/g, '');
    
    // The variations found in your screenshots
    const variations = [
        `r6-operators-list-${name}.avif`,
        `r6s-operators-list-${name}.avif`,
        `r6-operator-list-${name}.avif`,
        `r6s-operator-list-${name}.avif`
    ];

    // Manual fixes for the ones with random numbers in your files
    const manualFixes = {
        "ash": "r6-operators-list-ash_317253.avif",
        "mozzie": "r6-operators-list-mozzie_343537.avif",
        "wamai": "r6-operators-list-wamai_358318.avif",
        "kali": "r6-operators-list-kali_358317.avif",
        "denari": "r6s-operators-list-denari__2_.avif"
    };

    // If it's a known "weird" filename, use it immediately
    if (attempt === 0 && manualFixes[name]) {
        img.src = ICON_PATH + manualFixes[name];
        img.onerror = () => tryAllPaths(img, opName, 1); // fallback if manual fix fails
        return;
    }

    // If we ran out of options, show initials
    if (attempt >= variations.length) {
        img.style.display = 'none'; // Hide broken img
        img.parentElement.textContent = opName.slice(0, 2).toUpperCase();
        return;
    }

    // Try the next variation
    img.src = ICON_PATH + variations[attempt];
    img.style.display = 'block';

    // If it fails to load, try the next one in the list
    img.onerror = () => tryAllPaths(img, opName, attempt + 1);
}

function rollOperators() {
    const atk = attackers[Math.floor(Math.random() * attackers.length)];
    const def = defenders[Math.floor(Math.random() * defenders.length)];

    const atkIconBox = document.getElementById('atk-icon');
    const defIconBox = document.getElementById('def-icon');

    // Clear and add new image tags
    atkIconBox.innerHTML = `<img class="op-img">`;
    defIconBox.innerHTML = `<img class="op-img">`;

    // Start the search for the images
    tryAllPaths(atkIconBox.querySelector('.op-img'), atk);
    tryAllPaths(defIconBox.querySelector('.op-img'), def);

    document.getElementById('atk-name').innerHTML = `<span class="anim">${atk}</span>`;
    document.getElementById('def-name').innerHTML = `<span class="anim">${def}</span>`;

    // Trigger the "Pop" animation
    const cards = [document.getElementById('atk-card'), document.getElementById('def-card')];
    cards.forEach(card => {
        card.classList.remove('pop');
        void card.offsetWidth; // Force CSS reflow
        card.classList.add('pop');
    });
}

function rollChallenge() {
    const shuffled = [...challenges].sort(() => 0.5 - Math.random());
    const c1 = shuffled[0];
    const c2 = shuffled[1];

    const p1 = document.getElementById('challenge-p1');
    const p2 = document.getElementById('challenge-p2');

    p1.innerHTML = `<div class="anim"><div class="challenge-name">${c1.name}</div><div class="challenge-desc">${c1.desc}</div></div>`;
    p2.innerHTML = `<div class="anim"><div class="challenge-name">${c2.name}</div><div class="challenge-desc">${c2.desc}</div></div>`;
}

// Event Listeners for the buttons
document.getElementById('btn-full').addEventListener('click', () => {
    rollOperators();
    rollChallenge();
});

document.getElementById('btn-challenge').addEventListener('click', rollChallenge);

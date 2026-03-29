const attackers = ["Sledge","Thatcher","Ash","Thermite","Twitch","Montagne","Glaz","Fuze","Blitz","IQ","Buck","Blackbeard","Capitao","Hibana","Jackal","Ying","Zofia","Dokkaebi","Lion","Finka","Maverick","Nomad","Gridlock","Nokk","Amaru","Kali","Iana","Ace","Zero","Flores","Osa","Sens","Grim","Brava","Ram","Deimos","Denari","Striker"];
const defenders = ["Smoke","Mute","Castle","Pulse","Doc","Rook","Kapkan","Tachanka","Jager","Bandit","Frost","Valkyrie","Caveira","Echo","Mira","Lesion","Ela","Vigil","Maestro","Alibi","Clash","Kaid","Mozzie","Warden","Goyo","Wamai","Oryx","Melusi","Aruni","Thunderbird","Thorn","Azami","Solis","Fenrir","Tubarao","Sentry","Skopos"];

const challenges = [
    { name: "Pistols Only", desc: "No primary. Sidearm all round." },
    { name: "Iron Sights Only", desc: "Remove every scope and play completely ironsights." },
    { name: "No Sprinting", desc: "Walk only. You are not in a rush." },
    { name: "Crouch Walk", desc: "No standing. Crouch the entire round." },
    { name: "Hipfire Only", desc: "No ADS whatsoever. Point and pray." },
    { name: "No Gadget", desc: "Do not deploy your operator gadget." },
    { name: "Drone Blindfolded", desc: "No droning allowed at all. Go in blind." },
    { name: "Window Gang", desc: "Every entry must be through a window." },
    { name: "No Peeking", desc: "No leaning. Ever." },
    { name: "Reload After Every Kill", desc: "Mandatory full reload after every elimination." },
    { name: "Maximum Aggression", desc: "Push immediately. First 10 seconds — go." }
    // ... add others as needed
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function getInitials(name) {
    return name.substring(0, 2).toUpperCase();
}

function rollOperators() {
    const atk = pick(attackers);
    const def = pick(defenders);

    const atkCard = document.getElementById('atk-card');
    const defCard = document.getElementById('def-card');

    // Trigger animation
    [atkCard, defCard].forEach(c => {
        c.classList.remove('pop');
        void c.offsetWidth;
        c.classList.add('pop');
    });

    document.getElementById('atk-icon').textContent = getInitials(atk);
    document.getElementById('def-icon').textContent = getInitials(def);
    document.getElementById('atk-name').innerHTML = `<span class="anim">${atk}</span>`;
    document.getElementById('def-name').innerHTML = `<span class="anim">${def}</span>`;
}

function rollChallenge() {
    const shuffled = [...challenges].sort(() => 0.5 - Math.random());
    const [c1, c2] = shuffled;

    const p1 = document.getElementById('challenge-p1');
    const p2 = document.getElementById('challenge-p2');

    p1.innerHTML = `<div class="anim"><div class="challenge-name">${c1.name}</div><div class="challenge-desc">${c1.desc}</div></div>`;
    p2.innerHTML = `<div class="anim"><div class="challenge-name">${c2.name}</div><div class="challenge-desc">${c2.desc}</div></div>`;
}

// Event Listeners
document.getElementById('btn-full').addEventListener('click', () => {
    rollOperators();
    rollChallenge();
});

document.getElementById('btn-challenge').addEventListener('click', rollChallenge);

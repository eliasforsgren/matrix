document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const prompt = document.querySelector('.prompt');

    const greetingMessage = `Welcome to Northwill - Revolutionizing Swedish Engineering\n\n`;
    const commands = {
        help: `Available commands:
- about: Learn about Northwill
- mission: Our company mission
- projects: Current revolutionary projects
- team: Meet our brilliant minds
- contact: Get in touch with us
- clear: Clear the terminal
- hack: Initiate a simulated hack (for demonstration purposes only)`,
        about: `Northwill is a cutting-edge tech company based in Northern Sweden. We're committed to pushing the boundaries of innovation and restoring Sweden's reputation as a global leader in engineering and technology.`,
        mission: `Our mission is to revolutionize the tech industry through groundbreaking Swedish engineering, focusing on sustainable solutions and ethical AI development.`,
        projects: `1. Project Aurora - AI-driven renewable energy grid
2. Project Frost - Quantum computing for climate modeling
3. Project Bifrost - Next-gen communication technology`,
        team: `Our team consists of Sweden's brightest minds in technology, including:
- Dr. Astrid Lindqvist - AI Research Lead
- Erik Andersson - Quantum Computing Specialist
- Ingrid Bergman - Sustainable Tech Innovator`,
        contact: `Email: info@northwill.se
Website: www.northwill.se
Address: Polcirkeln 1, 98139 Kiruna, Sweden`,
        clear: () => {
            return '';
        },
        hack: () => {
            simulateHack();
            return 'Initiating hack sequence...';
        }
    };

    function typeWriter(text, element, callback, speed = 50) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    function simulateHack() {
        const hackSequence = [
            "Accessing mainframe...",
            "Bypassing firewall...",
            "Decrypting files...",
            "Access granted!",
            "Just kidding! This is a simulated hack sequence."
        ];
        
        let delay = 0;
        hackSequence.forEach((message, index) => {
            setTimeout(() => {
                output.innerHTML += message + '\n';
                if (index === hackSequence.length - 1) {
                    output.innerHTML += '\n' + greetingMessage;
                }
            }, delay);
            delay += 1500;
        });
    }

    output.innerHTML = '';
    typeWriter(greetingMessage, output, () => {
        output.innerHTML += commands.help + '\n';
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            const response = commands[command];
            output.innerHTML += `\n[northwill]$ ${command}\n`;
            if (response) {
                if (command === 'clear') {
                    output.innerHTML = '';
                    output.innerHTML = greetingMessage;
                    output.innerHTML += commands.help + '\n';
                } else {
                    output.innerHTML += typeof response === 'function' ? response() : response + '\n';
                }
            } else {
                output.innerHTML += `Command not found: ${command}. Type 'help' for available commands.\n`;
            }
            input.value = '';
            output.scrollTop = output.scrollHeight;
        }
    });

    // Easter egg: Glitch effect on specific key combination
    let konami = '';
    document.addEventListener('keydown', (e) => {
        konami += e.key;
        if (konami.includes('northwill')) {
            output.classList.add('glitch');
            setTimeout(() => {
                output.classList.remove('glitch');
            }, 1000);
            konami = '';
        }
    });

    // Matrix background effect
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ÅÄÖ';
    const fontSize = 10;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    // Resize canvas when window is resized
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
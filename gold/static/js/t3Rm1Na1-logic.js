// Terminal functionality
const outputContainer = document.getElementById('output-container');
const commandInput = document.getElementById('command-input');
const promptElement = document.getElementById('prompt');
const currentPathElement = document.getElementById('current-path');
const exitScreen = document.getElementById('exit-screen');

let currentPath = '~';
let commandHistory = [];
let historyIndex = -1;

// File system structure
const fileSystem = {
    '~': {
        type: 'directory',
        contents: {
            'lab_hacking': {
                type: 'directory',
                contents: {
                    'README.txt': {
                        type: 'file',
                        content: 'Welcome to the hacking lab.\nThis is a secure environment for penetration testing and security research.'
                    },
                    'tools': {
                        type: 'directory',
                        contents: {}
                    }
                }
            },
            'world_game': {
                type: 'directory',
                contents: {
                    'game_manual.pdf': {
                        type: 'file',
                        content: 'World Game Manual\n\nExplore virtual worlds and complete missions to earn rewards.'
                    },
                    'saves': {
                        type: 'directory',
                        contents: {}
                    }
                }
            },
            'lobby': {
                type: 'directory',
                contents: {
                    'TheGambit.pdf': {
                        type: 'file',
                        content: 'The Aesthetes Gambit\n\nExplore virtual lobby with kingdom vibes.'
                    },
                    'saves': {
                        type: 'directory',
                        contents: {}
                    }
                }
            },
            'portofolio': {
                type: 'directory',
                contents: {
                    'projects': {
                        type: 'directory',
                        contents: {
                            'project_alpha': {
                                type: 'file',
                                content: 'Project Alpha: Advanced AI system for network security'
                            },
                            'project_beta': {
                                type: 'file',
                                content: 'Project Beta: Virtual reality simulation platform'
                            }
                        }
                    },
                    'resume.txt': {
                        type: 'file',
                        content: 'ZEROCOOL979\n\nCybersecurity Specialist\nAI Developer\nVirtual World Architect'
                    }
                }
            },
            'system_info.txt': {
                type: 'file',
                content: 'System Information:\n\nOS: CyberOS v4.0\nCPU: Quantum Processor 9000\nMemory: 128 Zettabytes\nSecurity: AES-256 Encryption'
            }
        }
    }
};

// Initialize terminal
commandInput.focus();

// Command execution
commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const command = commandInput.value.trim();
        
        if (command) {
            // Add command to output
            addOutputLine(`${promptElement.textContent} ${command}`, 'system');
            
            // Process command
            processCommand(command);
            
            // Add to history
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            
            // Clear input
            commandInput.value = '';
        }
    }
    
    // Handle up/down arrows for command history
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
            if (historyIndex <= 0) historyIndex = commandHistory.length;
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (commandHistory.length > 0) {
            historyIndex++;
            if (historyIndex >= commandHistory.length) {
                historyIndex = commandHistory.length;
                commandInput.value = '';
            } else {
                commandInput.value = commandHistory[historyIndex];
            }
        }
    }
});

function processCommand(command) {
    const parts = command.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    switch (cmd) {
        case 'help':
            showHelp();
            break;
        case 'ls':
            listDirectory();
            break;
        case 'cd':
            if (args.length === 0) {
                addOutputLine("cd: missing directory argument", "error");
                break;
            }
            if (args[0] === 'world_game') {
                window.location.href = "/go/pixel-start";
            } else if (args[0] === 'lobby') {
                window.location.href = "/go/TheGambit";
            } else if (args[0] === 'lab_hacking') {
                window.location.href = "/go/l4B-H4cK";
            } else if (args[0] === 'portofolio' || args[0] === 'portfolio') {
                window.location.href = "/go/TheGambit";
            } else if (args[0] === '~') {
                currentPath = '~';
                updatePrompt();
            }
            break;
        case 'exit':
            exitTerminal();
            break;
        case 'clear':
            clearTerminal();
            break;
        case 'cat':
            showFileContent(args);
            break;
        case 'whoami':
            addOutputLine('zerocool979', 'system');
            break;
        case 'date':
            const now = new Date();
            addOutputLine(now.toUTCString(), 'system');
            break;
        default:
            addOutputLine(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
    }
    
    // Auto-scroll to bottom
    outputContainer.scrollTop = outputContainer.scrollHeight;
}

function showHelp() {
    addOutputLine('Available commands:', 'system');
    addOutputLine('help     - Show this help message', 'system');
    addOutputLine('ls       - List directory contents', 'system');
    addOutputLine('cd <dir> - Change directory', 'system');
    addOutputLine('cat <file> - Show file content', 'system');
    addOutputLine('clear    - Clear terminal screen', 'system');
    addOutputLine('exit     - Exit terminal', 'system');
    addOutputLine('whoami   - Show current user', 'system');
    addOutputLine('date     - Show current date and time', 'system');
}

function listDirectory() {
    const pathParts = currentPath === '~' ? ['~'] : currentPath.split('/').filter(p => p);
    let currentDir = fileSystem['~'].contents; 
    
    for (const part of pathParts) {
        if (part === '~') continue;
        currentDir = currentDir[part].contents;
    }
    
    addOutputLine('Contents:', 'system');
    
    // List directories
    Object.keys(currentDir).forEach(key => {
        if (currentDir[key].type === 'directory') {
            addOutputLine(`${key}/`, 'dir');
        }
    });
    
    // List files
    Object.keys(currentDir).forEach(key => {
        if (currentDir[key].type === 'file') {
            addOutputLine(key, 'file');
        }
    });
}

function changeDirectory(args) {
    if (args.length === 0 || args[0] === '~') {
        currentPath = '~';
        updatePrompt();
        return;
    }
    
    const targetDir = args[0];
    if (targetDir === "word_game") {
        window.location.href = "/pixel-start";
        return;
    }
    
    if (targetDir === "lab_hacking") {
        window.location.href = "/L04d";
        return;
    }
    const pathParts = currentPath === '~' ? ['~'] : currentPath.split('/').filter(p => p);
    let currentDir = fileSystem;
    
    // Traverse to current directory
    for (const part of pathParts) {
        if (part === '~') continue;
        currentDir = currentDir[part].contents;
    }
    
    // Check if target directory exists
    if (currentDir[targetDir] && currentDir[targetDir].type === 'directory') {
        if (currentPath === '~') {
            currentPath = `~/${targetDir}`;
        } else {
            currentPath += `/${targetDir}`;
        }
        updatePrompt();
    } else if (targetDir === '..') {
        // Go up one directory
        if (currentPath !== '~') {
            const parts = currentPath.split('/');
            parts.pop();
            currentPath = parts.join('/') || '~';
            updatePrompt();
        }
    } else {
        addOutputLine(`cd: no such directory: ${targetDir}`, 'error');
    }
}

function showFileContent(args) {
    if (args.length === 0) {
        addOutputLine('cat: missing file operand', 'error');
        return;
    }
    
    const filename = args[0];
    const pathParts = currentPath === '~' ? ['~'] : currentPath.split('/').filter(p => p);
    let currentDir = fileSystem;['~'].contents;
    
    // Traverse to current directory
    for (const part of pathParts) {
        currentDir = currentDir[part].contents;
    }
    
    // Check if file exists
    if (currentDir[filename] && currentDir[filename].type === 'file') {
        addOutputLine(currentDir[filename].content, 'system');
    } else {
        addOutputLine(`cat: ${filename}: No such file`, 'error');
    }
}

function exitTerminal() {
    addOutputLine('Logging out...', 'system');
    
    // Show exit screen
    setTimeout(() => {
        exitScreen.style.opacity = '1';
        exitScreen.style.pointerEvents = 'all';
    }, 1000);
    
    // Close window after delay
    setTimeout(() => {
        alert("See you next time! fiends... :)");
        alert("You can close this window now by the way....");
        window.close();
    }, 4000);
}

function clearTerminal() {
    outputContainer.innerHTML = '';
    currentPathElement.textContent = `${promptElement.textContent}`;
    addOutputLine("Terminal cleared.", 'system');
}

function updatePrompt() {
    promptElement.textContent = `zerocool979@cybernet:${currentPath}$`;
    currentPathElement.textContent = `zerocool979@cybernet:${currentPath}$`;
}

function addOutputLine(text, type = 'system') {
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.textContent = text;
    outputContainer.appendChild(line);
}

// Initial prompt update
updatePrompt();

// Set focus on input when clicking anywhere
document.addEventListener('click', () => {
    commandInput.focus();
});

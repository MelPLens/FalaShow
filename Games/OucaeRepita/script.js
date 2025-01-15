const wordElement = document.getElementById("word");
const imageElement = document.getElementById("image");
const recordButton = document.getElementById("record");
const stopButton = document.getElementById("stop");
const modeSelector = document.getElementById("mode");
const previewElement = document.getElementById("preview");

let mediaRecorder;
let chunks = [];
let currentMode = "audio";
let stream;

// Lista de palavras e imagens
const words = ["MACACO", "ELEFANTE", "GATO"];
const images = ["macaco.png", "elefante.png", "gato.png"];
let currentIndex = 0;

// Atualiza palavra e imagem
function updateContent() {
    wordElement.textContent = words[currentIndex];
    imageElement.src = images[currentIndex];
}

// Inicia gravação
recordButton.addEventListener("click", async () => {
    currentMode = modeSelector.value;

    try {
        stream = currentMode === "audio"
            ? await navigator.mediaDevices.getUserMedia({ audio: true })
            : await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        mediaRecorder = new MediaRecorder(stream);
        chunks = [];

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: currentMode === "audio" ? "audio/wav" : "video/webm" });
            const url = URL.createObjectURL(blob);

            // Exibe a prévia
            if (currentMode === "audio") {
                const audio = document.createElement("audio");
                audio.controls = true;
                audio.src = url;
                previewElement.innerHTML = "";
                previewElement.appendChild(audio);
            } else {
                const video = document.createElement("video");
                video.controls = true;
                video.src = url;
                previewElement.innerHTML = "";
                previewElement.appendChild(video);
            }

            // Envia para o servidor (opcional)
            // uploadBlob(blob);
        };

        mediaRecorder.start();
        recordButton.disabled = true;
        stopButton.disabled = false;
    } catch (err) {
        console.error("Erro ao acessar mídia:", err);
    }
});

// Para gravação
stopButton.addEventListener("click", () => {
    mediaRecorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    recordButton.disabled = false;
    stopButton.disabled = true;
});

// Navegação
document.getElementById("next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % words.length;
    updateContent();
});

document.getElementById("prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + words.length) % words.length;
    updateContent();
});

// Inicializa o conteúdo
updateContent();

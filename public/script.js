
let currentAnswer = "";

function nextQuestion() {
  document.getElementById("feedback").innerText = "";
  const container = document.getElementById("options");
  container.innerHTML = "";

  const tipo = Math.floor(Math.random() * 4);
  const verbo = verbi[Math.floor(Math.random() * verbi.length)];

  if (tipo === 0 || tipo === 1) {
    const forma = verbo.forme_flesse[Math.floor(Math.random() * verbo.forme_flesse.length)];
    document.getElementById("question").innerText =
      tipo === 0
        ? `Qual è l'analisi grammaticale della forma: "${forma.forma}"?`
        : `Cosa significa in italiano la forma: "${forma.forma}"?`;

    const corretta = tipo === 0
      ? `${forma.modo} ${forma.tempo} – ${forma.persona}`
      : forma.traduzione;

    currentAnswer = corretta;

    const opzioni = new Set([corretta]);
    while (opzioni.size < 4) {
      const randForma = verbi[Math.floor(Math.random() * verbi.length)].forme_flesse[0];
      const opzione = tipo === 0
        ? `${randForma.modo} ${randForma.tempo} – ${randForma.persona}`
        : randForma.traduzione;
      opzioni.add(opzione);
    }

    [...opzioni].sort(() => Math.random() - 0.5).forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.innerText = opt;
      btn.onclick = () => checkAnswer(btn, opt);
      container.appendChild(btn);
    });

  } else if (tipo === 2) {
    const parte = Math.random() < 0.5 ? "perfetto" : "supino";
    const domanda = parte === "perfetto"
      ? `${verbo.verbo}, ${verbo.infinito}, _____, ${verbo.supino}`
      : `${verbo.verbo}, ${verbo.infinito}, ${verbo.perfetto}, _____`;
    document.getElementById("question").innerText = `Completa il paradigma:\n${domanda}`;

    currentAnswer = parte === "perfetto" ? verbo.perfetto : verbo.supino;
    const opzioni = new Set([currentAnswer]);

    while (opzioni.size < 4) {
      const alt = verbi[Math.floor(Math.random() * verbi.length)][parte];
      if (alt) opzioni.add(alt);
    }

    [...opzioni].sort(() => Math.random() - 0.5).forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.innerText = opt;
      btn.onclick = () => checkAnswer(btn, opt);
      container.appendChild(btn);
    });

  } else if (tipo === 3) {
    const forma = verbo.forme_flesse[Math.floor(Math.random() * verbo.forme_flesse.length)];
    document.getElementById("question").innerText =
      `Qual è la forma del verbo "${verbo.infinito}" al ${forma.modo} ${forma.tempo}, ${forma.persona}?`;

    currentAnswer = forma.forma;
    const opzioni = new Set([currentAnswer]);

    while (opzioni.size < 4) {
      const rand = verbi[Math.floor(Math.random() * verbi.length)].forme_flesse[0];
      if (rand) opzioni.add(rand.forma);
    }

    [...opzioni].sort(() => Math.random() - 0.5).forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.innerText = opt;
      btn.onclick = () => checkAnswer(btn, opt);
      container.appendChild(btn);
    });
  }
}

function checkAnswer(button, selected) {
  const buttons = document.querySelectorAll(".option");
  buttons.forEach(btn => btn.disabled = true);
  if (selected === currentAnswer) {
    button.classList.add("correct");
    document.getElementById("feedback").innerText = "✅ Corretto!";
  } else {
    button.classList.add("wrong");
    document.getElementById("feedback").innerText = "❌ Sbagliato, riprova.";
  }
}

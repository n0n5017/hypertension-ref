document.addEventListener("DOMContentLoaded", () => {
  const readingResult = document.getElementById("reading-result");
  const systolic = document.getElementById("systolic");
  const diastolic = document.getElementById("diastolic");

  document.getElementById("reading-check")?.addEventListener("click", () => {
    const top = Number(systolic.value);
    const bottom = Number(diastolic.value);
    readingResult.className = "reading-result";
    if (
      !systolic.value ||
      !diastolic.value ||
      top < 50 ||
      top > 300 ||
      bottom < 30 ||
      bottom > 200
    ) {
      readingResult.textContent =
        "Enter both numbers from 50–300 / 30–200 mmHg to see the guidance.";
      readingResult.classList.add("result-warn");
      return;
    }
    if (top > 180 || bottom > 120) {
      readingResult.textContent =
        "Very high reading. Sit quietly and repeat it after at least 1 minute. With chest pain, breathlessness, weakness, numbness, vision change, or trouble speaking, contact local emergency services now. Without symptoms, contact a health professional promptly.";
      readingResult.classList.add("result-urgent");
    } else if (top >= 140 || bottom >= 90) {
      readingResult.textContent =
        "This is at or above the WHO adult threshold. A single reading cannot diagnose hypertension; arrange repeat, properly taken measurements and discuss them with a clinician.";
      readingResult.classList.add("result-warn");
    } else if (top >= 120 || bottom >= 80) {
      readingResult.textContent =
        "This reading is below the WHO diagnostic threshold, but thresholds and personal targets vary. Keep the technique consistent and ask a clinician how to interpret your readings.";
      readingResult.classList.add("result-ok");
    } else {
      readingResult.textContent =
        "This reading is below common adult reference thresholds. One reading is only a snapshot; personal targets and interpretation should come from your clinician.";
      readingResult.classList.add("result-ok");
    }
  });

  const organInfo = {
    brain: {
      kicker: "BRAIN & BLOOD VESSELS",
      title: "A higher chance of stroke",
      copy: "Long-term high pressure can damage brain arteries. A vessel may become blocked or rupture, causing a stroke. Persistent hypertension is also associated with cognitive decline later in life.",
      action: "Confirming and treating high blood pressure lowers stroke risk.",
    },
    heart: {
      kicker: "HEART & ARTERIES",
      title: "More strain on the heart",
      copy: "High pressure makes the heart work harder and can damage artery walls. Over time it raises the risk of coronary heart disease, heart attack, and heart failure.",
      action: "Blood pressure control is one part of protecting heart health.",
    },
    kidneys: {
      kicker: "KIDNEYS & CIRCULATION",
      title: "A two-way relationship",
      copy: "High blood pressure can damage the small vessels in the kidneys. Kidney disease can also make blood pressure harder to control, so clinicians may check kidney function and urine.",
      action: "Routine follow-up can help identify changes early.",
    },
  };
  const organTabs = [...document.querySelectorAll(".organ-tab")];
  const organHotspots = [...document.querySelectorAll(".organ-hotspot")];
  function showOrgan(name) {
    const info = organInfo[name];
    if (!info) return;
    document.getElementById("organ-kicker").textContent = info.kicker;
    document.getElementById("organ-title").textContent = info.title;
    document.getElementById("organ-copy").textContent = info.copy;
    document.getElementById("organ-action").innerHTML =
      `<b>What helps:</b> ${info.action}`;
    organTabs.forEach((tab) => {
      const active = tab.dataset.organ === name;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    document
      .getElementById("organ-detail")
      .setAttribute("aria-labelledby", `tab-${name}`);
  }
  organTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showOrgan(tab.dataset.organ));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const next =
        organTabs[
          (index + (event.key === "ArrowRight" ? 1 : organTabs.length - 1)) %
            organTabs.length
        ];
      next.focus();
      showOrgan(next.dataset.organ);
    });
  });
  organHotspots.forEach((spot) => {
    spot.addEventListener("click", () => showOrgan(spot.dataset.organ));
    spot.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showOrgan(spot.dataset.organ);
        document.getElementById(`tab-${spot.dataset.organ}`).focus();
      }
    });
  });

  const measurementSteps = [
    {
      kicker: "BEFORE YOU START",
      title: "Give your body a quiet moment.",
      copy: "Avoid caffeine, smoking, and exercise for 30 minutes beforehand. Empty your bladder, then sit quietly for at least five minutes.",
    },
    {
      kicker: "GET COMFORTABLE",
      title: "Sit in a supported position.",
      copy: "Sit with your back supported, feet flat on the floor, and legs uncrossed. Rest your arm on a surface so the cuff is at heart level.",
    },
    {
      kicker: "PLACE THE CUFF",
      title: "Use a bare upper arm.",
      copy: "Use a properly fitting cuff on bare skin, following the monitor instructions. Keep still, stay quiet, and do not talk during the measurement.",
    },
    {
      kicker: "RECORD THE RESULTS",
      title: "Take two readings.",
      copy: "Take two measurements at least one minute apart and write both down with the date and time. Follow your clinician's advice about how often to measure.",
    },
  ];
  const stepTabs = [...document.querySelectorAll(".step-card")];
  function showStep(index) {
    const info = measurementSteps[index];
    document.getElementById("step-kicker").textContent = info.kicker;
    document.getElementById("step-title").textContent = info.title;
    document.getElementById("step-copy").textContent = info.copy;
    stepTabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
  }
  stepTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showStep(index));
    tab.addEventListener("keydown", (event) => {
      if (
        !["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)
      )
        return;
      event.preventDefault();
      const direction = ["ArrowDown", "ArrowRight"].includes(event.key)
        ? 1
        : -1;
      const nextIndex = (index + direction + stepTabs.length) % stepTabs.length;
      stepTabs[nextIndex].focus();
      showStep(nextIndex);
    });
  });

  const quizItems = [
    {
      question: "Is high blood pressure always noticeable?",
      answers: ["Yes, usually", "No, often it has no symptoms"],
      correct: 1,
      explain: "That’s right. Many people feel well, so checking is important.",
    },
    {
      question: "Can one high reading confirm hypertension?",
      answers: [
        "Yes, one reading is enough",
        "Usually no; repeat readings help confirm it",
      ],
      correct: 1,
      explain:
        "Correct. A single reading is a snapshot; diagnosis usually uses repeated measurements.",
    },
    {
      question: "What should you do if medicine causes side effects?",
      answers: [
        "Stop it immediately on your own",
        "Contact your prescriber or pharmacist",
      ],
      correct: 1,
      explain:
        "Exactly. A health professional can help assess side effects and adjust a plan safely.",
    },
  ];
  const quizStart = document.getElementById("start-quiz");
  const quizQuestion = document.getElementById("quiz-question");
  const quizOptions = document.getElementById("quiz-options");
  const quizFeedback = document.getElementById("quiz-feedback");
  const quizCount = document.getElementById("quiz-count");
  const quizDots = [...document.querySelectorAll(".quiz-dots i")];
  let quizIndex = -1;
  function loadQuestion(index) {
    quizIndex = index;
    if (index >= quizItems.length) {
      quizCount.textContent = "Complete";
      quizDots.forEach((dot) => dot.classList.add("done"));
      quizQuestion.textContent = "Nice work. You’ve got the essentials.";
      quizOptions.innerHTML =
        '<button type="button" id="quiz-again">Try again</button>';
      quizFeedback.textContent =
        "Remember: a clinician can help interpret your own readings and care.";
      document
        .getElementById("quiz-again")
        .addEventListener("click", () => loadQuestion(0));
      quizStart.textContent = "Play again ↗";
      return;
    }
    const item = quizItems[index];
    quizCount.textContent = `Question ${index + 1} of ${quizItems.length}`;
    quizDots.forEach((dot, i) => dot.classList.toggle("done", i < index));
    quizQuestion.textContent = item.question;
    quizFeedback.textContent = "Choose an answer.";
    quizOptions.innerHTML = "";
    item.answers.forEach((answer, answerIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = answer;
      button.addEventListener(
        "click",
        () => {
          [...quizOptions.children].forEach((option) => {
            option.disabled = true;
          });
          const correct = answerIndex === item.correct;
          button.classList.add(correct ? "correct" : "incorrect");
          if (!correct)
            quizOptions.children[item.correct].classList.add("correct");
          quizFeedback.textContent = `${correct ? "Correct! " : "Not quite. "}${item.explain}`;
          quizDots[index].classList.add("done");
          const next = document.createElement("button");
          next.type = "button";
          next.className = "quiz-next";
          next.textContent =
            index === quizItems.length - 1
              ? "See results →"
              : "Next question →";
          next.addEventListener("click", () => loadQuestion(index + 1));
          quizOptions.append(next);
        },
        { once: true },
      );
      quizOptions.append(button);
    });
  }
  quizStart.addEventListener("click", () => {
    if (quizIndex < 0 || quizIndex >= quizItems.length) loadQuestion(0);
    document
      .getElementById("quiz-panel")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  });

  document
    .getElementById("print-btn")
    ?.addEventListener("click", () => window.print());
});

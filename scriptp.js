
  // Configura un canvas para permitir dibujo
  function configurarFirma(idCanvas) {
    const canvas = document.getElementById(idCanvas);
    const ctx = canvas.getContext("2d");
    let drawing = false;

    function getPosition(e) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX || e.touches?.[0]?.clientX) - rect.left,
        y: (e.clientY || e.touches?.[0]?.clientY) - rect.top
      };
    }

    function startDrawing(e) {
      drawing = true;
      const pos = getPosition(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function draw(e) {
      if (!drawing) return;
      e.preventDefault();
      const pos = getPosition(e);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function stopDrawing() {
      drawing = false;
      ctx.beginPath();
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);
  }

  // Limpia un canvas por ID
  function clearSignature(idCanvas) {
    const canvas = document.getElementById(idCanvas);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Mantén tu función de impresión como está
  function generatePDF() {
    window.print();
  }

  // Inicializa ambas firmas
  window.addEventListener("load", () => {
    configurarFirma("signature-pad");
    configurarFirma("signature-pad-tecnico");
  });
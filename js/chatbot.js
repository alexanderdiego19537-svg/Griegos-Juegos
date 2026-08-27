/* ═══════════════════════════════════════════════════════════════
   GRIEGOS JUEGOS — chatbot.js
   Ares — Asistente pre-programado de Griegos Juegos
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const WA = 'https://wa.me/5511913373569?text=Hola%21+Quiero+m%C3%A1s+informaci%C3%B3n+sobre+sus+productos';

  /* ─── KNOWLEDGE BASE ─── */
  const KB = [
    {
      tags: ['envio','envío','envian','envían','entrega','entregan','llega','mandan','shipping','mando','paquete'],
      reply: '🚚 Enviamos a *toda la República Mexicana*.\n\nUsamos DHL y FedEx para garantizar que tu pedido llegue seguro. El costo de envío varía entre $500 y $820 MXN según tu ciudad.'
    },
    {
      tags: ['tiempo','tarda','días','dias','cuándo','cuando','rápido','rapido','horas','demora','tardanza','express'],
      reply: '⚡ Envío *express — máximo 2 días hábiles* para todo México.\n\nCDMX, Monterrey, Guadalajara, Tijuana, Hermosillo y Cancún pueden recibir en 24–48 horas.'
    },
    {
      tags: ['pago','pagar','precio','cuánto','cuanto','formas','métodos','transferencia','oxxo','tarjeta','paypal','efectivo','pagues'],
      reply: '💳 Aceptamos *TODOS los métodos de pago*:\n• Transferencia SPEI\n• Depósito OXXO\n• Tarjeta crédito/débito\n• PayPal\n• Efectivo\n\nY también ofrecemos *pago en dos partes*. 👇'
    },
    {
      tags: ['dos partes','mitad','anticipo','enganche','parcial','abonos','meses','50%'],
      reply: '💰 ¡Sí, pago en *dos partes*!\n\nPagas el 50% de anticipo para apartar tu producto y el otro 50% lo coordinamos directamente por WhatsApp antes del envío. Súper flexible.'
    },
    {
      tags: ['garantía','garantia','falla','fallas','problema','problemas','roto','garantizado','daño','defecto'],
      reply: '🛡️ Todos nuestros productos tienen *garantía de 3 meses*.\n\nCubre fallas eléctricas, problemas del dispositivo y soporte de cuentas. Si algo falla, nos escribes por WhatsApp y lo resolvemos de inmediato.'
    },
    {
      tags: ['original','originales','falso','fake','copia','pirata','auténtico','legitimo','nuevo','usado'],
      reply: '✅ Todos nuestros productos son *100% originales y verificados*.\n\nCada artículo pasa revisión antes de enviarse. Te mandamos *fotos + video + guía de rastreo* para total transparencia.'
    },
    {
      tags: ['productos','catalogo','catálogo','tienen','venden','disponible','disponibles','qué venden','que tienen','stock','iphone','xbox','ps5','playstation','consola','celular'],
      reply: '🎮 *Catálogo actual:*\n\n📱 iPhone 13 Pro Max 256GB — $6,000 MXN\n🎮 Xbox Series S — $3,000 MXN\n🎮 PlayStation 5 2026 — $5,000 MXN\n🎮 Xbox Series X 1TB — $5,000 MXN\n\nProximamente accesorios. ¡Pregunta por disponibilidad!'
    },
    {
      tags: ['costo','precio envio','precio envío','cuánto envío','cuanto envio','cobran envio','cobran envío','flete'],
      reply: '📦 El envío cuesta entre *$500 y $820 MXN* dependiendo de tu ciudad.\n\nVía DHL o FedEx, con número de rastreo incluido y fotos del empaque.'
    },
    {
      tags: ['rastreo','rastrear','seguimiento','trackear','donde está','dónde esta','guía','guia','tracking'],
      reply: '📍 ¡Sí, siempre incluimos *número de rastreo*!\n\nAl hacer el envío te mandamos la guía de DHL o FedEx para que veas tu pedido en tiempo real. Sin sorpresas.'
    },
    {
      tags: ['cómo compro','como compro','proceso','comprar','quiero comprar','pedido','cómo funciona','como funciona','pasos','inicio','empezar'],
      reply: '🛒 *Comprar es súper fácil:*\n\n1️⃣ Elige tu producto en nuestro catálogo\n2️⃣ Escríbenos por WhatsApp\n3️⃣ Acuerda tu método de pago\n4️⃣ Recibe en casa en máx. 2 días 📦\n\n¡Sin complicaciones!'
    },
    {
      tags: ['confiable','confiables','fraude','estafa','seguro','seguros','real','verdad','legítimo','legitimo','estafan'],
      reply: '💎 Somos *100% confiables*.\n\n✅ +347 ventas realizadas con éxito\n✅ Fotos y video antes de enviar\n✅ Guía de rastreo incluida\n✅ Garantía de 3 meses\n✅ Atención directa sin bots\n\nTu tranquilidad es nuestra prioridad.'
    },
    {
      tags: ['horario','horas','disponibles','atienden','atención','atencion','cuando atienden','cuando me responden'],
      reply: '🕐 Atendemos *24/7 — todos los días sin excepción*.\n\nNuestro equipo responde por WhatsApp a cualquier hora. Tiempo promedio de respuesta: menos de 1 hora.'
    },
    {
      tags: ['contacto','numero','número','whatsapp','teléfono','telefono','llamar','escribir','comunicar'],
      reply: '📱 Puedes contactarnos directamente por *WhatsApp al +55 11913373569*.\n\nAtención 24/7, respuesta rápida y personalizada. ¡Sin esperas largas!'
    },
    {
      tags: ['facebook','instagram','redes','red social','pagina','página','fb','ig'],
      reply: '📲 Síguenos en nuestras redes:\n\n👉 *Facebook:* Griegos Juegos\n👉 *Instagram:* @griego.juegos.tu.opcion\n\nSube y ve nuestras publicaciones y testimonios de clientes.'
    },
    {
      tags: ['empaque','empacado','bien empacado','protegido','caja','seguro envio','fotos empaque'],
      reply: '📦 Sí, *empacamos con todo el cuidado*.\n\nAnte de enviar te mandamos:\n✅ Foto del producto\n✅ Video de funcionamiento\n✅ Foto del paquete listo\n✅ Guía de rastreo\n\nTransparencia total.'
    }
  ];

  const QUICK_TOPICS = [
    '¿Hacen envíos?',
    '¿Cuánto tarda?',
    '¿Cómo pago?',
    '¿Tienen garantía?',
    '¿Qué productos tienen?',
    '¿Son confiables?',
    '¿Pago en dos partes?',
  ];

  const DEFAULT_REPLY =
    '🤔 Hmm, no entendí bien tu pregunta.\n\nPuedo ayudarte con:\n• 🚚 Envíos a México\n• ⏱️ Tiempos de entrega\n• 💳 Formas de pago\n• 🛡️ Garantía de 3 meses\n• 🎮 Productos disponibles\n• 🛒 Cómo comprar\n\nEscribe tu duda o usa los botones 👇';

  /* ─── STATE ─── */
  let chatOpen    = false;
  let greeted     = false;
  const notif     = document.getElementById('chatbot-notif');
  const window_   = document.getElementById('chatbot-window');
  const messagesEl= document.getElementById('chatbot-messages');
  const quickEl   = document.getElementById('chatbot-quick');
  const inputEl   = document.getElementById('chatbot-input');

  /* ─── TOGGLE ─── */
  window.toggleChatbot = function () {
    chatOpen = !chatOpen;
    window_.classList.toggle('open', chatOpen);
    if (notif) notif.style.display = 'none';

    if (chatOpen && !greeted) {
      greeted = true;
      setTimeout(() => {
        addBot('¡Hola! Soy **Ares** ⚔️, el asistente de Griegos Juegos.\n\nEstoy aquí para resolver todas tus dudas sobre productos, envíos, pagos y más. ¿En qué te puedo ayudar hoy?');
        renderQuickReplies();
      }, 250);
    }
    if (chatOpen) inputEl.focus();
  };

  /* ─── NORMALIZE (for matching) ─── */
  function normalize(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ');
  }

  /* ─── FIND RESPONSE ─── */
  function findReply(input) {
    const norm = normalize(input);
    for (const item of KB) {
      for (const tag of item.tags) {
        if (norm.includes(normalize(tag))) return item.reply;
      }
    }
    return DEFAULT_REPLY;
  }

  /* ─── RENDER MESSAGE ─── */
  function addBot(text) {
    const div = document.createElement('div');
    div.className = 'chat-bot';

    // Convert **bold** to <strong>
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g,     '<strong>$1</strong>')
      .replace(/\n/g,            '<br>');
    div.innerHTML = formatted;

    // WhatsApp CTA button
    const waBtn = document.createElement('a');
    waBtn.href      = WA;
    waBtn.target    = '_blank';
    waBtn.rel       = 'noopener noreferrer';
    waBtn.className = 'chat-wa-link';
    waBtn.innerHTML = '📱 Hablar con un asesor';
    div.appendChild(waBtn);

    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function addUser(text) {
    const div = document.createElement('div');
    div.className = 'chat-user';
    div.textContent = text;
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function addTyping() {
    const div = document.createElement('div');
    div.className  = 'chat-bot';
    div.id         = 'typing-indicator';
    div.innerHTML  = '<span style="opacity:.5;font-size:18px;letter-spacing:3px">•••</span>';
    div.style.minWidth = '60px';
    messagesEl.appendChild(div);
    scrollToBottom();
    return div;
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  /* ─── QUICK REPLIES ─── */
  function renderQuickReplies() {
    quickEl.innerHTML = '';
    QUICK_TOPICS.forEach(topic => {
      const btn = document.createElement('button');
      btn.className   = 'quick-btn';
      btn.textContent = topic;
      btn.onclick     = () => {
        quickEl.innerHTML = '';
        processMessage(topic);
      };
      quickEl.appendChild(btn);
    });
  }

  /* ─── PROCESS MESSAGE ─── */
  function processMessage(text) {
    if (!text.trim()) return;
    addUser(text);
    inputEl.value = '';

    const typing = addTyping();
    setTimeout(() => {
      typing.remove();
      const reply = findReply(text);
      addBot(reply);
    }, 700 + Math.random() * 400);
  }

  /* ─── PUBLIC SEND ─── */
  window.sendChat = function () {
    const val = inputEl.value.trim();
    if (val) processMessage(val);
  };

  /* ─── AUTO-SHOW NOTIFICATION after 10s ─── */
  setTimeout(() => {
    if (!chatOpen && notif) {
      notif.style.display = 'flex';
    }
  }, 10_000);

})();

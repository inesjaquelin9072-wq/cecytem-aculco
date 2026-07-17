// ================================
// Cargar componentes HTML (Corregido)
// ================================

document.addEventListener("DOMContentLoaded", () => {
    // Solo se ejecuta cuando el HTML está listo
    cargarComponente("navbar", "/partials/navbar.html");
    cargarComponente("footer", "/partials/footer.html");
    
    console.log('✅ CECYTEM Aculco - Sitio cargado correctamente');
});

async function cargarComponente(id, archivo) {
    const contenedor = document.getElementById(id);
    if (!contenedor) return;

    try {
        const respuesta = await fetch(archivo);
        if (!respuesta.ok) throw new Error(`HTTP error! status: ${respuesta.status}`);
        const html = await respuesta.text();
        contenedor.innerHTML = html;
    } catch (error) {
        console.error(`Error al cargar ${archivo}:`, error);
    }
}

// Icons modernos (Asegúrate de que esta dependencia esté bien instalada)
import '@fortawesome/fontawesome-free/css/all.min.css';
window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("loader-hidden");
        }, 1800);
    }

});

// Smooth scroll para anclas internas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const destino = document.querySelector(this.getAttribute("href"));

        if (!destino) return;

        e.preventDefault();

        destino.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        const navCollapse = document.getElementById("navMenu");

        if (navCollapse && navCollapse.classList.contains("show")) {
            new bootstrap.Collapse(navCollapse).hide();
        }

    });

});

// =======================
// CONTADORES
// =======================

const counters = document.querySelectorAll(".counter");

const iniciarContadores = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let count = 0;

        const incremento = target / 120;

        const actualizar = () => {

            count += incremento;

            if (count < target) {

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(actualizar);

            } else {

                counter.innerText = target;

            }

        };

        actualizar();

    });

};

const basura = document.querySelector("#basura");

if (basura && counters.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                iniciarContadores();

                observer.disconnect();

            }

        });

    });

    observer.observe(basura);

}


// ===========================
// FORMULARIO CAMPAÑA
// ===========================

const formCampania = document.getElementById("formCampania");

if (formCampania) {

    formCampania.addEventListener("submit", async function (e) {

        e.preventDefault();

        const datos = new FormData(formCampania);

        const respuesta = await fetch(formCampania.action, {

            method: "POST",

            body: datos,

            headers: {

                Accept: "application/json"

            }

        });

        if (respuesta.ok) {

            // Cambiar botón principal
            const boton = document.getElementById("btnEnviarCampania");

            boton.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                Ya estás registrado
            `;

            boton.disabled = true;

            // Guardar registro
            localStorage.setItem("campaniaRegistrado", "true");

            // Cerrar modal
            bootstrap.Modal.getInstance(
                document.getElementById("modalCampania")
            ).hide();

            // Mensaje bonito
            alert("🌱 ¡Registro enviado correctamente!\n\nGracias por apoyar la campaña ambiental.");

            formCampania.reset();

        } else {

            alert("Ocurrió un error al enviar el formulario.");

        }

    });

}



// ===========================
// VERIFICAR SI YA SE REGISTRÓ
// ===========================

if (localStorage.getItem("campaniaRegistrado") === "true") {

    const boton = document.getElementById("btnEnviarCampania");

    if (boton) {

        boton.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            Ya estás registrado
        `;

        boton.disabled = true;

    }

}


// ===========================
// Formulario de contacto
// ===========================

const formulario = document.getElementById("formContacto");

if (formulario) {

    formulario.addEventListener("submit", function(e){

        e.preventDefault();

        if(!formulario.checkValidity()){
            e.stopPropagation();
            formulario.classList.add("was-validated");
            return;
        }

        if(!document.getElementById("privacidad").checked){
            alert("Debes aceptar el Aviso de Privacidad.");
            return;
        }

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const asunto = document.getElementById("asunto").options[
            document.getElementById("asunto").selectedIndex
        ].text;

        const mensaje = document.getElementById("mensaje").value;

        const texto =
`📩 *Nuevo mensaje desde la página web*

👤 Nombre: ${nombre}

📧 Correo: ${correo}

📱 Teléfono: ${telefono}

📌 Asunto: ${asunto}

💬 Mensaje:
${mensaje}`;

        const numero = "524461529930";

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

        window.location.href = url;

        formulario.reset();
        formulario.classList.remove("was-validated");

    });

}



// ===========================
// CHATBOT
// ===========================

const chatbotBtn = document.getElementById("chatbotBtn");
const chatbotWindow = document.getElementById("chatbotWindow");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotBody = document.getElementById("chatbotBody");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

// Abrir o cerrar chatbot
chatbotBtn?.addEventListener('click', (e) => {
  e.stopPropagation();

  chatbotWindow?.classList.toggle('d-none');

  if (!chatbotWindow?.classList.contains('d-none')) {
    chatInput?.focus();
  }
});


// Evitar que se cierre al hacer clic dentro del chatbot
chatbotWindow?.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Cerrar con la X
chatbotClose?.addEventListener('click', () => {
  chatbotWindow?.classList.add('d-none');
});

// Cerrar al hacer clic fuera del chatbot
document.addEventListener('click', (e) => {
  if (
    chatbotWindow &&
    !chatbotWindow.classList.contains('d-none') &&
    !chatbotWindow.contains(e.target) &&
    !chatbotBtn.contains(e.target)
  ) {
    chatbotWindow.classList.add('d-none');
  }
});

// ================= RESPUESTAS =================

const respuestas = {

    inscripcion:
`📝 Las inscripciones ya están abiertas.

📌 Horario:
Lunes a Viernes
7:00 AM - 2:00 PM

📄 Documentos:

• Acta de nacimiento
• CURP
• Certificado de secundaria
• 6 fotografías
• Comprobante de domicilio`,

    requisitos:
`📋 Requisitos:

• CURP

• Acta

• Certificado

• Fotografías

• Comprobante de domicilio`,

    horario:
`🕒 Nuestro horario escolar es:

Lunes a Viernes

7:00 AM - 2:00 PM`,

    carreras:
`🎓 Carreras disponibles:

💻 Informática

📊 Contabilidad

🏢 Administración`,

    ubicacion:
`📍 Estamos ubicados en:

Carretera Aculco-Timilpan

Km 2.5

Aculco, Estado de México.`,

    telefono:
`📞 Teléfono:

712-123-4567`,

    costos:
`💰

La educación es GRATUITA.

Únicamente se paga una cuota semestral.`,

    contacto:
`📧

Puedes comunicarte con nosotros mediante el formulario de contacto o por WhatsApp.`

};

function buscarRespuesta(texto){

    texto = texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"");

    if(texto.includes("inscripcion"))
        return respuestas.inscripcion;

    if(texto.includes("requisito"))
        return respuestas.requisitos;

    if(texto.includes("horario"))
        return respuestas.horario;

    if(texto.includes("carrera"))
        return respuestas.carreras;

    if(texto.includes("ubicacion"))
        return respuestas.ubicacion;

    if(texto.includes("contacto"))
        return respuestas.contacto;

    if(texto.includes("telefono"))
        return respuestas.telefono;

    if(texto.includes("costo") || texto.includes("cuota"))
        return respuestas.costos;

    return `🤖 Lo siento, no encontré información sobre esa pregunta.

Puedes preguntarme sobre:

• Inscripciones
• Requisitos
• Carreras
• Horarios
• Ubicación
• Contacto`;
}

function obtenerHora(){

    const ahora = new Date();

    return ahora.toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit"

    });

}



function agregarMensaje(texto, tipo) {

    if (!chatbotBody) return;

    const mensaje = document.createElement("div");

    mensaje.className = tipo === "user" ? "user-msg" : "bot-msg";

    mensaje.innerHTML = `
        <div>${texto.replace(/\n/g,"<br>")}</div>
        <small style="opacity:.6">${obtenerHora()}</small>
    `;

    chatbotBody.appendChild(mensaje);

    chatbotBody.scrollTop = chatbotBody.scrollHeight;

}

function escribiendo(){

    const div=document.createElement("div");

    div.className="bot-msg";

    div.id="typing";

    div.innerHTML="🤖 Escribiendo...";

    chatbotBody.appendChild(div);

    chatbotBody.scrollTop=chatbotBody.scrollHeight;

}

function sendMessage(){

    const texto=chatInput.value.trim();

    if(texto==="") return;

    agregarMensaje(texto,"user");

    chatInput.value="";

    escribiendo();

    setTimeout(()=>{

        document.getElementById("typing")?.remove();

        agregarMensaje(

            buscarRespuesta(texto),

            "bot"

        );

    },1000);

}

document.querySelectorAll(".quick-btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        const pregunta = btn.dataset.pregunta;

        agregarMensaje(pregunta,"user");

        escribiendo();

        setTimeout(()=>{

            document.getElementById("typing")?.remove();

            console.log("Pregunta:", pregunta);
            console.log("Respuesta:", buscarRespuesta(pregunta));

            agregarMensaje(
                buscarRespuesta(pregunta),
                "bot"
            );

        },800);

    });

});








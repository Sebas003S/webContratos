/* =========================================================
   AGREGAR SERVICIO
========================================================= */

function agregarFila() {

    const detalle =
        document.getElementById("detalle");


    const fila =
        document.createElement("tr");


    fila.innerHTML = `

        <td>

            <input
                type="text"
                class="descripcion"
                placeholder="Descripción del servicio"
            >

        </td>


        <td>

            <input
                type="number"
                class="cantidad"
                value="1"
                min="0"
                step="1"
                oninput="calcular()"
            >

        </td>


        <td>

            <input
                type="number"
                class="precio"
                value="0"
                min="0"
                step="0.01"
                oninput="calcular()"
            >

        </td>


        <td>

            <input
                type="number"
                class="descuentoFila"
                value="0"
                min="0"
                step="0.01"
                oninput="calcular()"
            >

        </td>


        <td class="totalFila">

            S/ 0.00

        </td>


        <td class="pf-no-pdf">

            <button
                type="button"
                class="pf-delete-btn"
                onclick="eliminarFila(this)"
                title="Eliminar"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        </td>

    `;


    detalle.appendChild(fila);


    calcular();

}



/* =========================================================
   ELIMINAR SERVICIO
========================================================= */

function eliminarFila(boton) {

    const filas =
        document.querySelectorAll(
            "#detalle tr"
        );


    if (filas.length <= 1) {

        alert(
            "Debe existir al menos un servicio."
        );

        return;

    }


    boton.closest("tr").remove();


    calcular();

}



/* =========================================================
   CALCULAR
========================================================= */

function calcular() {

    const filas =
        document.querySelectorAll(
            "#detalle tr"
        );


    let subtotal = 0;


    filas.forEach(fila => {


        const cantidad =
            parseFloat(
                fila.querySelector(
                    ".cantidad"
                ).value
            ) || 0;


        const precio =
            parseFloat(
                fila.querySelector(
                    ".precio"
                ).value
            ) || 0;


        const descuento =
            parseFloat(
                fila.querySelector(
                    ".descuentoFila"
                ).value
            ) || 0;



        const importe =
            cantidad * precio;


        let totalFila =
            importe - descuento;


        if (totalFila < 0) {

            totalFila = 0;

        }


        fila.querySelector(
            ".totalFila"
        ).textContent =
            formatoMoneda(totalFila);


        subtotal += totalFila;

    });



    const movilidad =
        obtenerNumero("movilidad");


    const otros =
        obtenerNumero("otros");


    const descuentoGeneral =
        obtenerNumero(
            "descuentoGeneral"
        );



    let total =
        subtotal
        + movilidad
        + otros
        - descuentoGeneral;


    if (total < 0) {

        total = 0;

    }


    document.getElementById(
        "subtotal"
    ).textContent =
        formatoMoneda(subtotal);


    document.getElementById(
        "total"
    ).textContent =
        formatoMoneda(total);

}



/* =========================================================
   OBTENER NÚMERO
========================================================= */

function obtenerNumero(id) {

    return (
        parseFloat(
            document.getElementById(id).value
        ) || 0
    );

}



/* =========================================================
   MONEDA
========================================================= */

function formatoMoneda(valor) {

    return new Intl.NumberFormat(

        "es-PE",

        {

            style: "currency",

            currency: "PEN",

            minimumFractionDigits: 2,

            maximumFractionDigits: 2

        }

    ).format(valor);

}



/* =========================================================
   FECHA ACTUAL
========================================================= */

function colocarFechaActual() {

    const fecha =
        document.getElementById("fecha");


    if (!fecha) {

        return;

    }


    const hoy =
        new Date();


    const anio =
        hoy.getFullYear();


    const mes =
        String(
            hoy.getMonth() + 1
        ).padStart(2, "0");


    const dia =
        String(
            hoy.getDate()
        ).padStart(2, "0");


    fecha.value =
        `${anio}-${mes}-${dia}`;

}



/* =========================================================
   LIMPIAR
========================================================= */

function limpiarProforma() {

    const respuesta =
        confirm(
            "¿Deseas limpiar todos los datos de la proforma?"
        );


    if (!respuesta) {

        return;

    }


    document.getElementById(
        "cliente"
    ).value = "";


    document.getElementById(
        "documento"
    ).value = "";


    document.getElementById(
        "telefonoCliente"
    ).value = "";


    document.getElementById(
        "direccionCliente"
    ).value = "";


    document.getElementById(
        "fechaEvento"
    ).value = "";


    document.getElementById(
        "movilidad"
    ).value = 0;


    document.getElementById(
        "otros"
    ).value = 0;


    document.getElementById(
        "descuentoGeneral"
    ).value = 0;


    document.getElementById(
        "comentarios"
    ).value = "";


    document.getElementById(
        "metodoPago"
    ).value = "Efectivo";


    document.getElementById(
        "detalle"
    ).innerHTML = `

        <tr>

            <td>

                <input
                    type="text"
                    class="descripcion"
                    placeholder="Ej. Servicio de barman"
                >

            </td>


            <td>

                <input
                    type="number"
                    class="cantidad"
                    value="1"
                    min="0"
                    step="1"
                    oninput="calcular()"
                >

            </td>


            <td>

                <input
                    type="number"
                    class="precio"
                    value="0"
                    min="0"
                    step="0.01"
                    oninput="calcular()"
                >

            </td>


            <td>

                <input
                    type="number"
                    class="descuentoFila"
                    value="0"
                    min="0"
                    step="0.01"
                    oninput="calcular()"
                >

            </td>


            <td class="totalFila">

                S/ 0.00

            </td>


            <td class="pf-no-pdf">

                <button
                    type="button"
                    class="pf-delete-btn"
                    onclick="eliminarFila(this)"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

    `;


    calcular();

}



/* =========================================================
   NOMBRE DEL PDF
========================================================= */

function obtenerNombrePDF() {

    const numero =
        document
            .getElementById(
                "numeroProforma"
            )
            .value
            .trim()
        || "0001";


    const cliente =
        document
            .getElementById(
                "cliente"
            )
            .value
            .trim();


    let nombreCliente =
        cliente || "cliente";


    nombreCliente =
        nombreCliente

            .normalize("NFD")

            .replace(
                /[\u0300-\u036f]/g,
                ""
            )

            .replace(
                /[^a-zA-Z0-9 ]/g,
                ""
            )

            .trim()

            .replace(
                /\s+/g,
                "_"
            );


    return (
        `Proforma_${numero}_${nombreCliente}.pdf`
    );

}



/* =========================================================
   CREAR COPIA PARA PDF
========================================================= */

function crearClonParaPDF() {

    const original =
        document.getElementById(
            "proformaPDF"
        );


    if (!original) {

        throw new Error(
            "No se encontró #proformaPDF"
        );

    }



    /*
     * Creamos una copia COMPLETA.
     */

    const clon =
        original.cloneNode(true);


    clon.removeAttribute("id");


    clon.classList.add(
        "pf-pdf-clone"
    );



    /*
     * Quitamos todos los botones
     * y columnas que no deben aparecer.
     */

    clon
        .querySelectorAll(
            ".pf-no-pdf"
        )
        .forEach(elemento => {

            elemento.remove();

        });



    /*
     * Pasamos los valores actuales
     * del formulario original al clon.
     */

    convertirCamposATexto(
        original,
        clon
    );



    /*
     * Creamos un contenedor temporal
     * anclado exactamente en 0,0.
     *
     * ESTA ES LA PARTE QUE EVITA
     * EL RECORTE EN TELÉFONOS.
     */

    const renderRoot =
        document.createElement(
            "div"
        );


    renderRoot.className =
        "pf-pdf-render-root";


    renderRoot.appendChild(clon);


    document.body.appendChild(
        renderRoot
    );


    return {

        renderRoot,

        clon

    };

}



/* =========================================================
   CONVERTIR FORMULARIO EN TEXTO PARA EL PDF
========================================================= */

function convertirCamposATexto(
    original,
    clon
) {

    const originales =
        Array.from(
            original.querySelectorAll(
                "input, textarea, select"
            )
        );


    const copias =
        Array.from(
            clon.querySelectorAll(
                "input, textarea, select"
            )
        );


    originales.forEach(
        (campoOriginal, indice) => {


            const campoClon =
                copias[indice];


            if (!campoClon) {

                return;

            }



            let valor = "";



            /*
             * SELECT
             */

            if (
                campoOriginal.tagName ===
                "SELECT"
            ) {

                const opcion =
                    campoOriginal.options[
                        campoOriginal.selectedIndex
                    ];


                valor =
                    opcion
                        ? opcion.text
                        : "";

            }



            /*
             * INPUT / TEXTAREA
             */

            else {

                valor =
                    campoOriginal.value || "";

            }



            const texto =
                document.createElement(
                    campoOriginal.tagName ===
                    "TEXTAREA"
                        ? "div"
                        : "span"
                );



            /*
             * TABLA
             */

            if (
                campoOriginal.closest(
                    ".pf-table"
                )
            ) {

                texto.className =
                    "pf-static-table-field";

            }



            /*
             * TOTALES
             */

            else if (
                campoOriginal.closest(
                    ".pf-money-input"
                )
            ) {

                texto.className =
                    "pf-static-money";

            }



            /*
             * SELECT
             */

            else if (
                campoOriginal.tagName ===
                "SELECT"
            ) {

                texto.className =
                    "pf-static-select";

            }



            /*
             * COMENTARIOS
             */

            else if (
                campoOriginal.tagName ===
                "TEXTAREA"
            ) {

                texto.className =
                    "pf-static-textarea";

            }



            /*
             * DATOS DEL CLIENTE / FECHAS
             */

            else {

                texto.className =
                    "pf-static-field";

            }



            /*
             * Si está vacío dejamos espacio,
             * así no desaparece la línea.
             */

            texto.textContent =
                valor || " ";



            campoClon.replaceWith(
                texto
            );


        }
    );

}



/* =========================================================
   OPCIONES HTML2PDF
========================================================= */

function opcionesPDF(elemento) {

    return {

        margin: 0,

        filename: obtenerNombrePDF(),

        image: {
            type: "jpeg",
            quality: 0.98
        },

        html2canvas: {

            scale: 2,

            useCORS: true,

            allowTaint: true,

            backgroundColor: "#ffffff",

            logging: false,

            /*
             * MUY IMPORTANTE
             */
            scrollX: 0,
            scrollY: 0,

            x: 0,
            y: 0,

            width: 794,

            windowWidth: 794,

            windowHeight:
                Math.max(
                    elemento.scrollHeight,
                    1123
                )

        },

        jsPDF: {

            unit: "mm",

            format: "a4",

            orientation: "portrait",

            compress: true

        },

        pagebreak: {

            mode: [
                "css",
                "legacy"
            ]

        }

    };

}


/* =========================================================
   ESPERAR IMÁGENES
========================================================= */

async function esperarImagenes(
    elemento
) {

    const imagenes =
        Array.from(
            elemento.querySelectorAll(
                "img"
            )
        );


    const promesas =
        imagenes.map(imagen => {


            if (imagen.complete) {

                return Promise.resolve();

            }


            return new Promise(
                resolve => {


                    imagen.onload =
                        resolve;


                    imagen.onerror =
                        resolve;

                }
            );

        });


    await Promise.all(
        promesas
    );

}



/* =========================================================
   CREAR PDF BLOB
========================================================= */

/* =========================================================
   GENERAR PDF BLOB
========================================================= */

async function generarPDFBlob() {

    calcular();


    const {
        renderRoot,
        clon
    } = crearClonParaPDF();


    try {

        /* Esperar logo */
        await esperarImagenes(clon);


        /*
         * Esperar que el navegador termine
         * de acomodar el formato A4.
         */
        await new Promise(resolve => {

            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    setTimeout(resolve, 150);

                });

            });

        });


        /*
         * Forzar posición exacta antes de capturar
         */
        renderRoot.style.left = "0px";
        renderRoot.style.top = "0px";

        clon.style.margin = "0";
        clon.style.transform = "none";


        const blob = await html2pdf()

            .set(
                opcionesPDF(clon)
            )

            .from(clon)

            .outputPdf("blob");


        return blob;

    }

    finally {

        if (renderRoot) {

            renderRoot.remove();

        }

    }

}


/* =========================================================
   GUARDAR PDF
========================================================= */

async function guardarPDF() {

    const boton =
        document.querySelector(
            ".pf-pdf-btn"
        );

if (boton && boton.disabled) {
    return;
}
    const contenidoOriginal =
        boton
            ? boton.innerHTML
            : "";


    try {


        if (boton) {

            boton.disabled = true;


            boton.innerHTML = `

                <i class="fa-solid fa-spinner fa-spin"></i>

                Generando...

            `;

        }


        const blob =
            await generarPDFBlob();


        descargarBlob(
            blob,
            obtenerNombrePDF()
        );

    }


    catch (error) {


        console.error(
            "Error al generar PDF:",
            error
        );


        alert(
            "No se pudo generar el PDF. Inténtalo nuevamente."
        );

    }


    finally {


        if (boton) {

            boton.disabled = false;


            boton.innerHTML =
                contenidoOriginal;

        }

    }

}



/* =========================================================
   DESCARGAR BLOB
========================================================= */

function descargarBlob(
    blob,
    nombre
) {

    const url =
        URL.createObjectURL(
            blob
        );


    const enlace =
        document.createElement(
            "a"
        );


    enlace.href =
        url;


    enlace.download =
        nombre;


    document.body.appendChild(
        enlace
    );


    enlace.click();


    enlace.remove();


    setTimeout(
        () => {

            URL.revokeObjectURL(
                url
            );

        },
        1500
    );

}



/* =========================================================
   CREAR ARCHIVO PDF
========================================================= */

async function crearArchivoPDF() {

    const blob =
        await generarPDFBlob();


    return new File(

        [blob],

        obtenerNombrePDF(),

        {

            type:
                "application/pdf"

        }

    );

}



/* =========================================================
   COMPARTIR PDF
========================================================= */

async function compartirPDF() {

    const boton =
        document.querySelector(
            ".pf-whatsapp-btn"
        );

if (boton && boton.disabled) {
    return;
}
    const contenidoOriginal =
        boton
            ? boton.innerHTML
            : "";


    try {


        if (boton) {

            boton.disabled = true;


            boton.innerHTML = `

                <i class="fa-solid fa-spinner fa-spin"></i>

                Generando...

            `;

        }



        const archivo =
            await crearArchivoPDF();



        /*
         * Android / iPhone / navegadores
         * compatibles con Web Share.
         */

        if (

            navigator.share &&

            navigator.canShare &&

            navigator.canShare({

                files: [archivo]

            })

        ) {


            await navigator.share({

                title:
                    "Proforma - La Marquesina Catering",

                text:
                    "Te envío la proforma de La Marquesina Catering.",

                files: [
                    archivo
                ]

            });


            return;

        }



        /*
         * Si el navegador NO permite
         * compartir archivos directamente.
         */

        descargarBlob(
            archivo,
            archivo.name
        );


        alert(

            "Tu navegador no permite adjuntar el PDF directamente. " +

            "El archivo fue descargado para que puedas enviarlo por WhatsApp."

        );

    }


    catch (error) {


        /*
         * Si el usuario simplemente
         * cerró la ventana de compartir,
         * no mostramos error.
         */

        if (
            error.name !==
            "AbortError"
        ) {


            console.error(
                "Error compartiendo PDF:",
                error
            );


            alert(
                "No se pudo compartir el PDF."
            );

        }

    }


    finally {


        if (boton) {

            boton.disabled = false;


            boton.innerHTML =
                contenidoOriginal;

        }

    }

}



/* =========================================================
   POPUP LOGOUT
========================================================= */

window.openLogoutPopup =
function () {

    const el =
        document.getElementById(
            "logoutPopup"
        );


    if (el) {

        el.classList.remove(
            "hidden"
        );

    }

};



/* =========================================================
   INICIALIZACIÓN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        colocarFechaActual();

        calcular();

    }
);
function final() {
    generarPDF();
    // Luego de generar el PDF, rediriges a la página de los PDFs
    Swal.fire({
        icon: 'success',
        title: '¡Se ha Guardo Exitosamente!',
        timer: 1500,
        showConfirmButton: false,
        backdrop: false
    }).then(() => {
        // Redirige a la página de PDFs
        window.location.href = '../formulario/pdfs.html';  // Ajusta esta ruta según sea necesario
    });
}
function generarPDF() {
    const { jsPDF } = window.jspdf;

    const img = new Image();
    img.src = '../img/Logo.png';
    img.src = '../../img/Logo.png'; // Ajusta la ruta si es necesario

    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL('image/png'); // Convertir la imagen a base64

        // Generar URLs de los PDFs
        const pdf1 = generarPDF1(imgData);
        const pdf2 = generarPDF2(imgData);

        // Mostrar en iframes dentro de la página
        document.getElementById("preview1").src = pdf1;
        document.getElementById("preview2").src = pdf2;

    };
}
function generarPDF1(imgData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [612, 1200]
    });

    doc.addImage(imgData, 'PNG', 40, 30, 80, 40);

    // **Tabla de información del vehículo**
    doc.autoTable({
        startY: 80,
        head: [["MARCA", "SUBMARCA", "SERIE", "MODELO", "PLACA", "N° ECO"]],
        body: [
            ["Toyota", "Corolla", "3XXAAB", "2022", "ABC-123", "0218"] // Datos de ejemplo
        ],
        theme: "grid",
        styles: {
            fontSize: 10,
            cellPadding: 5,
            halign: "center",
            fillColor: [26, 35, 65],
            textColor: [0, 0, 0]
        },
        headStyles: {
            fillColor: [26, 35, 65],
            textColor: [255, 255, 255]
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240]
        }
    });

    let y = doc.autoTable.previous.finalY + 20;

    // **Lista de reglas**
    const reglas = [
        "1.- Las unidades deberán ser conducidas por servidores públicos que conozcan el Reglamento de Tránsito en vigor y cuenten con licencia para conducir vigente y credencial institucional de la FGJET.",
        "2.- El usuario es responsable de mantener la unidad en perfectas condiciones de uso, por lo que deberá cumplir con los programas de revisión y mantenimiento preventivo y/o correctivo, según se mencione en la póliza de garantía del vehículo.",
        "3.- El usuario no deberá transferir la unidad a otro usuario sin previo aviso por escrito a la Dirección de Recursos Materiales y Servicios, para que se genere un nuevo formato de resguardo vehicular",
        "4.- El usuario no podrá realizar cambios en las características físicas de la unidad.",
        "5.- El vehículo no se destinará para uso distinto del entregado, ni podrá subarrendar ni prestarlo; de lo contrario, el usuario será responsable por los daños y perjuicios que pudieran ocasionarse.",
        "6.- El usuario se obliga a entregar el vehículo en el momento que se requiera por la Dirección de Recursos Materiales y Servicios, entregándose en el mismo contexto y estado físico con el que se recibió (pese al desgaste natural del vehículo), con todos sus accesorios.",
        "7.- El usuario tiene la responsabilidad de carácter administrativo, por cualquier daño y/o faltante ocasionado intencionalmente, por negligencia, mal uso, etc.., de la unidad que tenga Asignada, así como de la documentación, placas, llaves, equipo y accesorios entregados a su cuidado.",
        "8.- Será responsabilidad del El Usuario, una vez que reciba la documentación oficial (tarjeta de circulación, holograma y copia de la póliza de seguro) colocarla en la unidad, a fin de que circule con documentos actualizados.",
        "9.- En caso de colisión o accidente, El usuario sea responsable en cualquiera de las modalidades, este deberá cubrir todos lo daños, multas y demás conceptos derivados que no sean cubiertos por el seguro y deberá reportar de manera inmediata el siniestro a la aseguradora y dar aviso por escrito , en un plazo no mayor de 72 horas a la Dirección General de Administración, para determinar las responsabilidades a las que pudiera ser acreedor, y de igual forma se le dará vista a la Dirección de Recursos Materiales y Servicios.",
        "10.- En caso de colisión o accidente El  Usuario será responsable de la  verificación y situación que guarde con relación a la reparación efectuada a la unidad, debiendo notificar por escrito a la Dirección el estatus de esta.",
        "11.- En caso de robo o incendio parcial o total de la unidad, El Usuario deberá levantar el acta correspondiente ante el ministerio Público y dar aviso a la Dirección General de Administración para los trámites correspondientes .",
        "12.- El Usuario, sin excepciones, está obligado a acudir a cualquier citatorio enviado por la Dirección General de Administración de esta Fiscalía General de Justicia del Estado de Tamaulipas, para realización de aclaraciones y/o revisiones relacionadas con las unidades que tiene asignadas.",
        "13.- El usuario será responsable de administrar y darle buen uso a la tarjeta de combustible asignada al vehículo; así como de comprobar en el tiempo establecido, el gasto de combustible asignado, dicha tarjeta no podrá ser utilizada para otro vehiculo .",
        "Cualquier acto u omisión a lo aquí establecido se regulará conforme a las atribuciones y responsabilidades inherentes al orden jurídico aplicable, la Ley de Responsabilidades Administrativas del Estado de Tamaulipas y el reglamento para el uso y control de vehículos oficiales.",
        "En caso de que se realice un cambio de resguardo, deberá ser informado a la Dirección General de Administración vía oficio y mediante correo electrónico a: actualizar.resguardovehicular@fgjtam.gob.tam en un plazo no mayor a 24 horas. En caso contrario, la responsabilidad por negligencia, mal uso, siniestro y cualquier uso indebido de la unidad oficial recaerá en el último resguardante registrado en esta Dirección General de Administración.",
        "Con fundamento en el artículo 93, fracción I del reglamento de la Ley Orgánica de la Fiscalía General de Justicia del Estado de Tamaulipas, así como en los capítulos segundo (numerales IV, V y VI) y tercero (numerales VII, VIII, IX, X, XI, XII, XIII, XIV, XV y XVI) de los Lineamientos para la asignación, uso y control de vehículos, combustibles y cajones de estacionamiento de la Fiscalía General de Justicia del Estado de Tamaulipas."
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // Justificar el texto y agregar salto de línea después de cada párrafo
    reglas.forEach((texto) => {
        const lines = doc.splitTextToSize(texto, 530);
        lines.forEach((line) => {
            doc.text(line, 40, y, {
                align: 'justify', // Asegura la justificación
                lineHeightFactor: 1.5,
                maxWidth: 530
            });
            y += 15;
        });

        y += 10;
    });

    y += 30; // Añadir espacio antes de la firma
    doc.setFont("helvetica", "bold");
    doc.text("Firma del Resguardante Interno", doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
    y += 40;
    doc.line(doc.internal.pageSize.getWidth() / 2 - 80, y + 5, doc.internal.pageSize.getWidth() / 2 + 80, y + 5);
    y += 10;
    doc.text("Nombre y Firma", doc.internal.pageSize.getWidth() / 2, y + 12, { align: 'center' });

    return doc.output("bloburl"); // Devuelve la URL para previsualización
}

function generarPDF2(imgData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });

    // Agregar imagen del logo en la esquina superior izquierda
    doc.addImage(imgData, 'JPEG', 40, 30, 60, 60);

    // Encabezado alineado al lado de la imagen
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text("DIRECCIÓN GENERAL DE ADMINISTRACIÓN", 120, 70);
    doc.text("DIRECCIÓN DE RECURSOS MATERIALES Y SERVICIOS", 120, 90);
    doc.text("RESGUARDO VEHICULAR", 120, 110);

    // Número de folio
    doc.setFontSize(12);
    doc.text("N° 0342", 450, 140);

    // Datos generales
    doc.setFontSize(10);
    doc.text("FECHA:", 40, 170);
    doc.text("MUNICIPIO:", 250, 170);
    doc.text("FGJRM", 340, 170);

    // Tabla de datos
    const filas = [
        ["RESGUARDANTE", ""]
        ["CARGO", ""],
        ["LICENCIA", ""],
        ["VIGENCIA", ""],
        ["FISCALÍA GENERAL", ""],
        ["FISCALÍA ESPECIALIZADA EN", ""],
        ["VICEFISCALÍA EN", ""],
        ["DIRECCIÓN GENERAL", ""],
        ["DEPARTAMENTO/ÁREA", ""],
        ["RESGUARDANTE INTERNO", ""],
        ["CARGO", ""],
        ["LICENCIA", ""],
        ["VIGENCIA", ""],
        ["NÚMERO DE EMPLEADO", ""]
    ];

    // Generar el PDF
    return doc.output("bloburl"); // Devuelve la URL del PDF
}

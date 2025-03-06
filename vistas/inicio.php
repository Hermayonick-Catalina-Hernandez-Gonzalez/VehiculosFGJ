<?php
session_start(); 
if ($_SESSION['rol'] != 'resguardante') {
    header("Location: ../index.php");
    exit();  
}

include "../php/conexion.php"; 

$vehiculos = [];
if ($conn) {
    try {
        // Valores predeterminados para los parámetros
        $valor_generico = ''; // Usamos cadenas vacías en lugar de 0
        
        // Preparamos la llamada al procedimiento con los parámetros
        $stmt = $conn->prepare("EXEC CONSULTA_DATOS_VEHICULO_EMPLEADO :NUM_ECONOMICO, :PLACA, :NUM_EMPLEADO");
        
        // Asignamos los valores a los parámetros
        $stmt->bindParam(':NUM_ECONOMICO', $valor_generico, PDO::PARAM_STR);
        $stmt->bindParam(':PLACA', $valor_generico, PDO::PARAM_STR);
        $stmt->bindParam(':NUM_EMPLEADO', $valor_generico, PDO::PARAM_STR);
        
        // Ejecutamos la consulta
        $stmt->execute();
        
        // Verificar si la consulta devuelve algún resultado
        $vehiculos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Si no hay resultados, muestra un mensaje
        if (empty($vehiculos)) {
            echo "<p>No se encontraron vehículos.</p>";
        }
        
    } catch (PDOException $e) {
        // Si ocurre un error, lo mostramos
        echo "<p>Error al obtener los datos: " . $e->getMessage() . "</p>";
    }
} else {
    echo "<p>No se pudo conectar a la base de datos.</p>";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resguardo Vehicular</title>
    <link rel="shortcut icon" href="../img/Icono.png" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="../css/stylesInicio.css">
</head>
<body>
    <header class="head">
        <div class="esquina-container">
            <button class="btn-salir" onclick="salir()">
                <img src="../img/Salir.png" alt="Salir">
            </button>
            <div class="esquina">
                <img src="../img/Esquina.png" alt="Imagen de Esquina">
            </div>
        </div>
        <div class="titulo">
            <h1>Resguardo Vehicular</h1>
        </div>
        <div class="logo">
            <img src="../img/Logo.png" alt="Logo FGJ">
        </div>
    </header>

    <div class="barra-busqueda">
        <input type="text" id="search" placeholder="Buscar..." oninput="buscar()">
        <img src="../img/Buscador.png" alt="Buscar" class="icono-buscar">
    </div>

    <table>
        <thead>
            <tr>
                <th>N° Económico</th>
                <th>Placa</th>
                <th>Serie</th>
                <th>Clase</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="vehiculos">
            <?php if (!empty($vehiculos)): ?>
                <?php foreach ($vehiculos as $vehiculo): ?>
                    <tr>
                        <td><?= htmlspecialchars($vehiculo['numero_economico']) ?></td>
                        <td><?= htmlspecialchars($vehiculo['placa']) ?></td>
                        <td><?= htmlspecialchars($vehiculo['serie']) ?></td>
                        <td><?= htmlspecialchars($vehiculo['clase_vehiculo']) ?></td>
                        <td><?= htmlspecialchars($vehiculo['marca_vehiculo']) ?></td>
                        <td><?= htmlspecialchars($vehiculo['modelo_vehiculo']) ?></td>
                        <td>
                            <button onclick="editar()"><i class="fa fa-pencil"></i> Editar</button>
                            <button onclick="ver('<?= $vehiculo['numero_economico'] ?>')"><i class="fa fa-eye"></i> Ver</button>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php else: ?>
                <tr><td colspan="7">No hay vehículos registrados</td></tr>
            <?php endif; ?>
        </tbody>
    </table>

    <script src="../JS/acciones.js"></script>
</body>
</html>

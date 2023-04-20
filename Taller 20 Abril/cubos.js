var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var size = 700;
var arrowSize = 40;
var divisions = 20;
var origin = new THREE.Vector3( 0, 0, 0 );
var x = new THREE.Vector3( 1, 0, 0 );
var y = new THREE.Vector3( 0, 1, 0 );
var z = new THREE.Vector3( 0, 0, 1 );
var color2 = new THREE.Color( 0x333333 );  /// 0x333333
var colorR = new THREE.Color( 0xAA0000 );
var colorG = new THREE.Color( 0x00AA00 );
var colorB = new THREE.Color( 0x0000AA );

//Crear la Grilla
var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

//Flechas
var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );

var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.z = 20;
camera.position.y = 5;
scene.add(camera);

//OrbitControls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
const light = new THREE.AmbientLight(0x404040, 5);
scene.add(light);

//Colores
const color = [0x2c5a57, 0x4F9543];

var L = 15;

/**
 * cubo: crea la geometría y el material de los cubos
 * Entradas: base = la base del cubo, altura = la altura del cubo, ancho = el ancho del cubo (Valga la redundancia xd), 
 * col = el arreglo con los colores para el material
 * Salida: geometry = la geometría usando la base, altura y ancho para los cubos, material = el material para los cubos usando los colores
*/
function cubo(base, altura, ancho, col) {
    const geometry = new THREE.BoxGeometry(base, altura, ancho);
    const material = new THREE.MeshToonMaterial({ color: col });
    return new THREE.Mesh(geometry, material);
}

var Cub = [];


/**
 * rotacion: rota el cubo con los parámetros ingresados
 * Entradas: eje = el eje donde se rota, angulo = el ángulo de rotación
 * Salida: retorna un false si el parámetro ingresado para el eje no es beta, gamma o alpha
*/
function rotacion (eje, angulo){
    if (eje == beta){
        group.rotation.x = angulo;
    } else if(eje == alpha){
        group.rotation.z = angulo;
    } else if(eje == gamma){
        group.rotation.y = angulo;
    } else{
        return false;
    }
}

const alpha = z;
const beta = x;
const gamma = z;


//Ingreso de parámetros geometría cubos
for (var i = 0; i < 2; i++) {
    Cub[i] = cubo(1, L, 1, color[i]);
    Cub[i].position.y = 5;
}
for (var i = 1; i < 2; i++) {
    Cub[1].position.y = L;
    Cub[1].position.x =L/2;
}


const group = new THREE.Group();
for (i = 0; i < 2; i++) {
    group.add(Cub[i]);
}

//Parámetros para la función rotacion para el primer cubo
for (var i = 0; i < 1; i++) {
    rotacion(alpha, -60);
    rotacion(beta, 13);
}

//Parámetros para la función rotacion para el segundo cubo
for (var i = 1; i < 2; i++) {
    rotacion(alpha, 40);
}


// Agregar elementos al escenario
scene.add(gridHelperXZ);
scene.add(arrowX);	
scene.add(arrowY);	
scene.add(arrowZ);
scene.add(group);

//Animación para el OrbitControls
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera)
}

animate();
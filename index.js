let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;
let totalPreguntas = 0;

window.onload = function () {
  base_preguntas = readText("base-preguntas.json");
  interprete_bp = JSON.parse(base_preguntas);
  escogerPreguntaAleatoria();
};

let pregunta;
let posibles_respuestas;
btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4"),
];
let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;
var numPreguntas = 0;


function escogerPreguntaAleatoria() {

  let n;
  if (preguntas_aleatorias) {
    n = Math.floor(Math.random() * interprete_bp.length);
  } else {
    n = 0;
  }

  while (npreguntas.includes(n)) {
    n++;
    if (n >= interprete_bp.length) {
      n = 0;
    }
  }

  if (npreguntas.length == numPreguntas) {
    //reemplazar interprete_bp por la numero de preguntas(por crear)
    //Aquí es donde el juego se reinicia
    if (mostrar_pantalla_juego_términado) {
      swal.fire({
        title: "Juego finalizado",
        text: "Puntuación: " + preguntas_correctas + "/" + preguntas_hechas, // dejar el -1 esta mal
        icon: "success",
      });
    }
    if (reiniciar_puntos_al_reiniciar_el_juego) {
      preguntas_correctas = 0;
      preguntas_hechas = 0;
    }
    npreguntas = [];
  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
}

function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n + 1; //para que la pregunta comience en 1
  let pc = preguntas_correctas;
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
  } else {
    select_id("puntaje").innerHTML = "";
  }

  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    interprete_bp.length,
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i) {
  //evento onclick desde HTML
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  if (posibles_respuestas[i] == pregunta.respuesta) {
    preguntas_correctas++;
    btn_correspondiente[i].style.background = "lightgreen";
  } else {
    btn_correspondiente[i].style.background = "pink";
  }
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 3000);
}

// let p = prompt("numero")

function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria();
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}

function lanzarPregunta(m) {
  materias(m);
  document.getElementById("modalPregunta").style.display = "block";
}
function closeModal() {
  document.getElementById("modalPregunta").style.display = "none";
}

function materias(m) {
  switch (m) {
    case 1:
      document.getElementById("materia1").innerHTML = "Razonamiento verbal";
      document.getElementById("materia2").innerHTML = "Razonamiento matemático";
      document.getElementById("materia3").innerHTML = "Aritmetica y álgebra";
      document.getElementById("materia4").innerHTML =
        "Geometria y Trigonometria";
      document.getElementById("materia5").innerHTML = "Lenguaje";
      document.getElementById("materia6").innerHTML = "Biología";
      document.getElementById("materia7").innerHTML = "Física";
      document.getElementById("materia8").innerHTML = "Química";
      document.getElementById("entrada1").value = 6;
      document.getElementById("entrada2").value = 6;
      document.getElementById("entrada3").value = 3;
      document.getElementById("entrada4").value = 2;
      document.getElementById("entrada5").value = 2;
      document.getElementById("entrada6").value = 9;
      document.getElementById("entrada7").value = 5;
      document.getElementById("entrada8").value = 7;
      totalPreguntas = 5;
      break;
    case 2:
      document.getElementById("materia1").innerHTML = "Razonamiento verbal";
      document.getElementById("materia2").innerHTML = "Razonamiento matemático";
      document.getElementById("materia3").innerHTML = "Aritmetica y álgebra";
      document.getElementById("materia4").innerHTML =
        "Geometria y Trigonometria";
      document.getElementById("materia5").innerHTML = "Lenguaje";
      document.getElementById("materia6").innerHTML = "Lógica";
      document.getElementById("materia7").innerHTML = "Física";
      document.getElementById("materia8").innerHTML = "Química";
      document.getElementById("entrada1").value = 6;
      document.getElementById("entrada2").value = 6;
      document.getElementById("entrada3").value = 7;
      document.getElementById("entrada4").value = 7;
      document.getElementById("entrada5").value = 1;
      document.getElementById("entrada6").value = 2;
      document.getElementById("entrada7").value = 6;
      document.getElementById("entrada8").value = 5;
      totalPreguntas = 4;
      break;
    case 3:
      document.getElementById("materia1").innerHTML = "Razonamiento verbal";
      document.getElementById("materia2").innerHTML = "Razonamiento matemático";
      document.getElementById("materia3").innerHTML = "Aritmetica y álgebra";
      document.getElementById("materia4").innerHTML = "Literatura";
      document.getElementById("materia5").innerHTML = "Lenguaje";
      document.getElementById("materia6").innerHTML = "Historia";
      document.getElementById("materia7").innerHTML = "Geografía";
      document.getElementById("materia8").innerHTML = "Economía";
      document.getElementById("entrada1").value = 6;
      document.getElementById("entrada2").value = 6;
      document.getElementById("entrada3").value = 4;
      document.getElementById("entrada4").value = 5;
      document.getElementById("entrada5").value = 7;
      document.getElementById("entrada6").value = 5;
      document.getElementById("entrada7").value = 4;
      document.getElementById("entrada8").value = 3;
      totalPreguntas = 3;
      break;
    case 4:
      document.getElementById("materia1").innerHTML = "Razonamiento verbal";
      document.getElementById("materia2").innerHTML = "Razonamiento matemático";
      document.getElementById("materia3").innerHTML = "Aritmetica y álgebra";
      document.getElementById("materia4").innerHTML =
        "Geometria y Trigonometria";
      document.getElementById("materia5").innerHTML = "Lenguaje";
      document.getElementById("materia6").innerHTML = "Historia";
      document.getElementById("materia7").innerHTML = "Geografía";
      document.getElementById("materia8").innerHTML = "Economía";
      document.getElementById("entrada1").value = 6;
      document.getElementById("entrada2").value = 6;
      document.getElementById("entrada3").value = 6;
      document.getElementById("entrada4").value = 3;
      document.getElementById("entrada5").value = 5;
      document.getElementById("entrada6").value = 4;
      document.getElementById("entrada7").value = 3;
      document.getElementById("entrada8").value = 7;
      totalPreguntas = 2;
      break;
    default:
      document.getElementById("materia1").innerHTML = "Celda 8";
  }
}

/* 
function abrirExamen() {
  document.getElementById("btnIniciarExamen")
} */

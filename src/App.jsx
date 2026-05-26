import { db } from "./firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { useState, useEffect } from "react";

function App() {

const thStyle = {

  border: "1px solid #ddd",

  padding: "15px",

  fontSize: "16px",

  whiteSpace: "nowrap",

};

const tdStyle = {

  border: "1px solid #ddd",

  padding: "15px",

  fontSize: "16px",

};

  // 🔐 LOGIN

  const usuariosSistema = [

    {
      numero: "2171",
      password: "1234",
      nombre: "DE PAZ GONZALEZ, GUSTAVO",
    },

    {
      numero: "5611",
      password: "1234",
      nombre: "JIMENEZ MEZA, ROY MANUEL",
    },

    {
      numero: "46036",
      password: "1234",
      nombre: "HERNANDEZ DIAZ, FRIEDICH",
    },

    {
      numero: "5241",
      password: "1234",
      nombre: "TORRES MARTINEZ, REBECA",
    },

    {
      numero: "100879",
      password: "1234",
      nombre: "MEDINA SANCHEZ, JESUS",
    },

    {
      numero: "110541",
      password: "1234",
      nombre: "RUELAS SALDAÑA, BRAYAN ERIVIER",
    },

    {
      numero: "110547",
      password: "1234",
      nombre: "GOMEZ MELENDRES, JESUS MARIO",
    },

    {
      numero: "110527",
      password: "1234",
      nombre: "REYES PEREZ, GERARDO ALBERTO",
    },

    {
      numero: "4459",
      password: "1234",
      nombre: "TORRES RAMIREZ, JUAN RAMON",
    },

    {
      numero: "5329",
      password: "1234",
      nombre: "RAMIREZ PEREZ, JONATAN ALEJANDRO",
    },

    {
      numero: "76613",
      password: "1234",
      nombre: "CALALPA CHOCOLATL, ABRAHAM",
    },

    {
      numero: "110639",
      password: "1234",
      nombre: "SOLANO DAMIAN, HERIBERTO",
    },

    {
      numero: "110661",
      password: "1234",
      nombre: "ALVARADO DE LA CRUZ, JUAN ANTONIO",
    },

  ];

  const [mostrarPassword,
setMostrarPassword] =
useState(false);

const [accionPendiente,
setAccionPendiente] =
useState(null);

const [passwordAdmin,
setPasswordAdmin] =
useState("Foxconn123456!");

  const PASSWORD_ADMIN = "Tijuana123456!";
  const [usuarioInput, setUsuarioInput] = useState("");
  const [logueado, setLogueado] = useState(false);

  const [usuarioActual, setUsuarioActual] = useState(null);

  // 🔥 SISTEMA

const [mostrarManual, setMostrarManual] =
useState(false);

const [materialesFS10,
setMaterialesFS10] =
useState([
]);

const [mostrarManualJaula1,
setMostrarManualJaula1] =
useState(false);

const [mostrarManualJaula2,
setMostrarManualJaula2] =
useState(false);

const [orgManual, setOrgManual] =
useState("");

const [idMaterialManual, setIdMaterialManual] =
useState("");

const [parteManual, setParteManual] =
useState("");

const [cantidadManual, setCantidadManual] =
useState("");

const [empleadoManual, setEmpleadoManual] =
useState("");

  const [pantalla, setPantalla] = useState("inicio");

  const [parte, setParte] = useState("");
  const [modelo, setModelo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [org, setOrg] = useState("");

const [imagen1, setImagen1] = useState(null);
const [imagen2, setImagen2] = useState(null);
const [imagen3, setImagen3] = useState(null);
const [imagen4, setImagen4] = useState(null);

const [imagenEdit1, setImagenEdit1] = useState(null);

const [imagenEdit2, setImagenEdit2] = useState(null);

const [imagenEdit3, setImagenEdit3] = useState(null);

const [imagenEdit4, setImagenEdit4] = useState(null);

const [imagenesActuales, setImagenesActuales] = useState([]);

  const [imagenGrande, setImagenGrande] = useState(null);

  const [materiales, setMateriales] = useState([]);

const [passwordInput, setPasswordInput] = useState("");

  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [editandoFS10,
setEditandoFS10] =
useState(null);

const [orgEditFS10,
setOrgEditFS10] =
useState("");

const [idMaterialEditFS10,
setIdMaterialEditFS10] =
useState("");

const [parteEditFS10,
setParteEditFS10] =
useState("");

const [cantidadEditFS10,
setCantidadEditFS10] =
useState("");

const [empleadoEditFS10,
setEmpleadoEditFS10] =
useState("");

const [parteEdit, setParteEdit] = useState("");
const [modeloEdit, setModeloEdit] = useState("");
const [descripcionEdit, setDescripcionEdit] = useState("");
const [orgEdit, setOrgEdit] = useState("");

  useEffect(() => {

    const cargarMateriales = async () => {

      const querySnapshot = await getDocs(
        collection(db, "materiales")
      );

      const lista = [];

      querySnapshot.forEach((docu) => {

        lista.push({
          id: docu.id,
          ...docu.data(),
        });

      });

     
      setMateriales(lista);

    };

    cargarMateriales();

    const intervalo = setInterval(() => {

      cargarMateriales();

    }, 2000);

    return () => clearInterval(intervalo);

  }, []);

useEffect(() => {

  const cargarFS10 =
  async () => {

    const querySnapshot =
      await getDocs(
        collection(db, "fs10")
      );

    const lista = [];

    querySnapshot.forEach(
      (docu) => {

        console.log(docu.data())

        lista.push({

          id: docu.id,

          ...docu.data(),

        });

      }
    );

    setMaterialesFS10(lista);

  };

  cargarFS10();

}, []);

const iniciarSesion = () => {

    const usuarioEncontrado = usuariosSistema.find(

      (u) =>

        u.numero === usuarioInput &&
        u.password === passwordInput

    );

    if (usuarioEncontrado) {

      setUsuarioActual(usuarioEncontrado);

      setLogueado(true);

    } else {

      alert("Usuario o contraseña incorrectos");

    }

  };

  const borrarMaterial = async (id) => {

    const confirmar = window.confirm(
      "¿Borrar material?"
    );

    if (!confirmar) return;

    await deleteDoc(
      doc(db, "materiales", id)
    );

    setMateriales(
      materiales.filter(
        (item) => item.id !== id
      )
    );

  };

  const guardarEdicion = async () => {

  const ref = doc(
    db,
    "materiales",
    editandoId
  );

  await updateDoc(ref, {

   parte: parteEdit,
modelo: modeloEdit,
descripcion: descripcionEdit,
org: orgEdit,

imagenes: [

  imagenEdit1 || imagenesActuales[0],

  imagenEdit2 || imagenesActuales[1],

  imagenEdit3 || imagenesActuales[2],

  imagenEdit4 || imagenesActuales[3],

].filter(
  (img) =>
    typeof img === "string" &&
    img.trim() !== ""
),

  });

  setMateriales(

    materiales.map((item) =>

      item.id === editandoId

        ? {
            ...item,
           parte: parteEdit,
modelo: modeloEdit,
descripcion: descripcionEdit,
org: orgEdit,
          }

        : item

    )

  );


  setEditandoId(null);

  alert("Material actualizado");

};

  const sidebarStyle = {
    width: "300px",
    background: "#08142c",
    color: "white",
    minHeight: "100vh",
    padding: "20px",
  };

  const buttonMenu = {
    width: "100%",
    padding: "16px",
    marginTop: "15px",
    border: "none",
    borderRadius: "15px",
    background: "#1e2b45",
    color: "white",
    fontSize: "22px",
    cursor: "pointer",
  };

  const inputStyle = {
    width: "100%",
    padding: "18px",
    marginTop: "20px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "18px",
  };

  // 🔐 LOGIN

  if (!logueado) {

  return (

    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#63d3d9,#d9ffff)",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          width: "900px",
          height: "500px",
          display: "flex",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          background: "white",
        }}
      >

        <div
          style={{
            flex: 1,
            background:
              "linear-gradient(135deg,#63d3d9,#b8ffff)",
          }}
        />

        <div
          style={{
            width: "350px",
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >

          <h1
            style={{
              marginBottom: "40px",
            }}
          >
            Login
          </h1>

          <input
            placeholder="Número de empleado"
            value={usuarioInput}
            onChange={(e) =>
              setUsuarioInput(e.target.value)
            }
            style={{
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={passwordInput}
            onChange={(e) =>
              setPasswordInput(e.target.value)
            }
            style={{
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />

          <button
            onClick={iniciarSesion}
            style={{
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#37b8c7",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Iniciar sesión
          </button>

        </div>

      </div>

    </div>

  );

}

  // 🔥 SISTEMA PRINCIPAL

  return (
    <div
      style={{
        display: "flex",
        background: "#eef1f5",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >

      {/* SIDEBAR */}
      <div style={sidebarStyle}>

        <h1>📦 Recording Material</h1>

        <div style={{ marginTop: "40px" }}>

          <p>👤 Usuario:</p>
          <strong>{usuarioActual.numero}</strong>

          <p style={{ marginTop: "10px" }}>
            📝 Nombre:
          </p>

          <strong>{usuarioActual.nombre}</strong>

        </div>

        <button
          style={buttonMenu}
          onClick={() => setPantalla("inicio")}
        >
          🏠 Inicio
        </button>

        <button
          style={buttonMenu}
          onClick={() => setPantalla("registrar")}
        >
          ➕ Registrar
        </button>

        <button
          style={buttonMenu}
          onClick={() => setPantalla("buscar")}
        >
          🔎 Buscar
        </button>

        <button
          style={buttonMenu}
          onClick={() => setPantalla("organizaciones")}
        >
          📂 Organizaciones
        </button>

        <button

          onClick={() => {

            setLogueado(false);

            setUsuarioInput("");

            setPasswordInput("");

          }}

          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            background: "#dc2626",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          🚪 Cerrar sesión
        </button>

      </div>

      {/* CONTENIDO */}
      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >

        {/* INICIO */}
        {pantalla === "inicio" && (

          <div>

            <div
              style={{
                display: "flex",
                gap: "20px",
               marginTop: "10px", 
              }}
            >

              <div
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "20px",
                  width: "220px",
                }}
              >
                <h1>{materiales.length}</h1>
                <p>Materiales</p>
              </div>

              <div
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "20px",
                  width: "220px",
                }}
              >
                <h1>{usuariosSistema.length}</h1>
                <p>Usuarios</p>
              </div>

                            <div
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "20px",
                  width: "220px",
                }}
              >
                <h1>6</h1>
                <p>Organizaciones</p>
              </div>



            </div>


<div
  style={{
    display: "flex",
    gap: "30px",
    marginTop: "40px",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
  }}
>

  {/* GRAFICA */}

  <div
    style={{
      background: "white",
      borderRadius: "25px",
      padding: "30px",
      width: "500px",
      minHeight: "400px",
    }}
  >

    <h2
      style={{
        marginBottom: "30px",
      }}
    >
      Materiales
    </h2>

    <div
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "space-around",
        height: "250px",
        marginTop: "40px",
      }}
    >

      <div
        style={{
          textAlign: "center",
        }}
      >

        <div
          style={{
            width: "60px",
            height: "120px",
            background:
              "linear-gradient(#b56cff,#6d28d9)",
            borderRadius: "10px",
          }}
        />

        <p>Materiales</p>

      </div>

      <div
        style={{
          textAlign: "center",
        }}
      >

        <div
          style={{
            width: "60px",
            height: "170px",
            background:
              "linear-gradient(#c084fc,#7c3aed)",
            borderRadius: "10px",
          }}
        />

        <p>FH20</p>

      </div>

      <div
        style={{
          textAlign: "center",
        }}
      >

        <div
          style={{
            width: "60px",
            height: "80px",
            background:
              "linear-gradient(#ddd6fe,#a855f7)",
            borderRadius: "10px",
          }}
        />

        <p>Jaula 1</p>

      </div>

      <div
        style={{
          textAlign: "center",
        }}
      >

        <div
          style={{
            width: "60px",
            height: "200px",
            background:
              "linear-gradient(#7e22ce,#4c1d95)",
            borderRadius: "10px",
          }}
        />

        <p>Jaula 2</p>

      </div>

    </div>

  </div>

  {/* CATEGORIAS */}

  <div
    style={{
      background: "white",
      borderRadius: "25px",
      padding: "30px",
      width: "500px",
      minHeight: "400px",
    }}
  >

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >

      <h2>
        Categorías
      </h2>

      <p
        style={{
          color: "#7c3aed",
          cursor: "pointer",
        }}
      >
        VER TODO
      </p>

    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(3,1fr)",
        gap: "20px",
        marginTop: "30px",
      }}
    >

      {[

        "FS10 A FH20",

        "Jaula 1",

        "Jaula 2",


      ].map((cat,index) => (

      <div
  key={index}

  onClick={() => {

   if(cat === "FS10 A FH20") {

  setPantalla("fs10");

}

if(cat === "Jaula 1") {

  setPantalla("jaula1");

}

if(cat === "Jaula 2") {

  setPantalla("jaula2");

}
  }}

  style={{
    background: "#f3e8ff",
    borderRadius: "20px",
    padding: "25px",
    textAlign: "center",
    cursor: "pointer",
  }}
>

          <div
            style={{
              fontSize: "40px",
              marginBottom: "10px",
            }}
          >

            {index === 0 && "📦"}

            {index === 1 && "⛓️"}

            {index === 2 && "⛓️"}


          </div>

          <p
            style={{
              fontWeight: "bold",
            }}
          >
            {cat}
          </p>

        </div>

      ))}

    </div>

  </div>

</div>


          </div>



        )}

        {/* REGISTRAR */}
        {pantalla === "registrar" && (

          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "25px",
            }}
          >

         <h1>Registrar material</h1>

<input
  placeholder="Número de parte"
  value={parte}
  onChange={(e) => setParte(e.target.value)}
  style={inputStyle}
/>

<input
  placeholder="Modelo"
  value={modelo}
  onChange={(e) => setModelo(e.target.value)}
  style={inputStyle}
/>

<input
  placeholder="Descripción del componente"

  value={descripcion}

  onChange={(e) =>
    setDescripcion(e.target.value)
  }

  style={inputStyle}
/>

<input
  placeholder="ORG"
  value={org}
  onChange={(e) => setOrg(e.target.value)}
  style={inputStyle}
/>


            <div
              style={{
                marginTop: "25px",
              }}
            >

              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
              >
                📸 Imágenes del material
              </p>

              <p>Imagen 1</p>

              <input
                type="file"
                accept="image/*"

               onChange={(e) => {

  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onloadend = () => {
    setImagen1(reader.result);
  };

  reader.readAsDataURL(file);

}}

                style={inputStyle}
              />

              <p>Imagen 2</p>

              <input
                type="file"
                accept="image/*"

                onChange={(e) => {

  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onloadend = () => {
    setImagen2(reader.result);
  };

  reader.readAsDataURL(file);

}}

                style={inputStyle}
              />

              <p>Imagen 3</p>

              <input
                type="file"
                accept="image/*"

               onChange={(e) => {

  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onloadend = () => {
    setImagen3(reader.result);
  };

  reader.readAsDataURL(file);

}}

                style={inputStyle}
              />

              <p>Imagen 4</p>

              <input
                type="file"
                accept="image/*"

               onChange={(e) => {

  const file = e.target.files[0];

  const reader = new FileReader();

reader.onloadend = () => {
  setImagen4(reader.result);
};

  reader.readAsDataURL(file);

}}

                style={inputStyle}
              />

            </div>

            <button

              onClick={async () => {

                if (!parte || !modelo || !org) {

                  alert("Llena todos los campos");

                  return;
                }

            const nuevoMaterial = {

  parte,
  modelo,
  descripcion,

  org: org.toUpperCase(),

  imagenes: [

    imagen1,
    imagen2,
    imagen3,
    imagen4,

  ].filter(
    (img) =>
      typeof img === "string" &&
      img.trim() !== ""
  ),

};

console.log(
  imagen1,
  imagen2,
  imagen3,
  imagen4
);

await addDoc(
  collection(db, "materiales"),
  nuevoMaterial
);

                setMateriales([
                  ...materiales,
                  nuevoMaterial,
                ]);

                alert("Material guardado en Firebase");

              setParte("");
setModelo("");
setDescripcion("");
setOrg("");

                setImagen1(null);
                setImagen2(null);
                setImagen3(null);
                setImagen4(null);

              }}

              style={{
                width: "100%",
                padding: "20px",
                marginTop: "30px",
                border: "none",
                borderRadius: "12px",
                background: "#2f64e1",
                color: "white",
                fontSize: "22px",
                cursor: "pointer",
              }}

            >
              Guardar material
            </button>

          </div>

        )}

        {/* ORGANIZACIONES */}
        {pantalla === "organizaciones" && (

          <div>

            <h1
              style={{
                fontSize: "40px",
                marginBottom: "30px",
              }}
            >
              📂 Organizaciones
            </h1>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >

              {["TODOS", "SHTV", "SOTV", "SPTV", "FBC0", "FBC1", "EV03"].map((orgItem) => (

               <button
  key={orgItem}

  onClick={() => {

    setEditandoId(null);

    setOrganizacionSeleccionada(orgItem);

  }}
                  style={{
                    padding: "18px",
                    border: "none",
                    borderRadius: "12px",
                    background: "#2563eb",
                    color: "white",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  {orgItem}
                </button>

              ))}

            </div>













                        {/* RESULTADOS */}

            {organizacionSeleccionada && (

              <div
                style={{
                  marginTop: "40px",
                }}
              >

                <h2>
                  Materiales de {organizacionSeleccionada}
                </h2>

                {materiales

                .filter((item) => {

  if (!item) return false;

  if (
    organizacionSeleccionada === "TODOS"
  ) {
    return true;
  }

  if (!item.org) return false;

  return (
    item.org
      .toString()
      .trim()
      .toUpperCase() ===
    organizacionSeleccionada
      .toString()
      .trim()
      .toUpperCase()
  );

})

                  .map((item, index) => (

                    <div
                      key={index}
                      style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "15px",
                        marginTop: "20px",
                        position: "relative",
                      }}
                    >

                      {/* 3 PUNTOS */}

                      <details
                        style={{
                          position: "absolute",
                          top: "15px",
                          right: "20px",
                        }}
                      >

                        <summary
                          style={{
                            cursor: "pointer",
                            fontSize: "28px",
                            listStyle: "none",
                            userSelect: "none",
                          }}
                        >
                          ⋮
                        </summary>

                        <div
                          style={{
                            background: "#f3f4f6",
                            borderRadius: "10px",
                            padding: "10px",
                            marginTop: "10px",
                            width: "180px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                          }}
                        >

                         <button

onClick={() => {

  setAccionPendiente(() => () => {

    setImagenesActuales(
      item.imagenes || []
    );

    setEditandoId(item.id);

    setDescripcionEdit(
      item.descripcion || ""
    );

    setParteEdit(item.parte);

    setModeloEdit(item.modelo);

    setOrgEdit(item.org);

    setImagenEdit1(
      item.imagenes?.[0] || null
    );

    setImagenEdit2(
      item.imagenes?.[1] || null
    );

    setImagenEdit3(
      item.imagenes?.[2] || null
    );

    setImagenEdit4(
      item.imagenes?.[3] || null
    );

  });

  setMostrarPassword(true);

}}

  style={{
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    marginBottom: "10px",
    cursor: "pointer",
  }}
>
  ✏️ Editar material
</button>

<button
                           onClick={() => {

 setAccionPendiente(() => () => {

  borrarMaterial(item.id);

});

setMostrarPassword(true);

}}
                            style={{
                              width: "100%",
                              padding: "10px",
                              border: "none",
                              borderRadius: "8px",
                              background: "#dc2626",
                              color: "white",
                              cursor: "pointer",
                            }}
                          >
                            🗑️ Borrar material


                          </button>

                        </div>

                      </details>

                      <h3>
                        📦 {item.parte}
                      </h3>

                      <p>
  ID: {item.id}
</p>

           <p>
  Modelo: {item.modelo || "Sin modelo"}
</p>

<p>
  Descripción: {
    item.descripcion || "Sin descripción"
  }
</p>

<p>
  Organización: {item.org}
</p>

{editandoId === item.id && (
  <div
    style={{
      marginTop: "20px",
      background: "#f3f4f6",
      padding: "20px",
      borderRadius: "15px",
    }}
  >



    <input
      value={parteEdit}
      onChange={(e) =>
        setParteEdit(e.target.value)
      }
      placeholder="Parte"
      style={inputStyle}
    />

    <input
      value={modeloEdit}
      onChange={(e) =>
        setModeloEdit(e.target.value)
      }
      placeholder="Modelo"
      style={inputStyle}
    />


<input
  placeholder="Descripción"

  value={descripcionEdit || ""}

  onChange={(e) =>
    setDescripcionEdit(e.target.value)
  }

  style={{
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
/>

<p style={{ marginTop: "15px" }}>
  Cambiar imágenes
</p>

<input
  type="file"
  accept="image/*"

  onChange={(e) => {

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagenEdit1(reader.result);
    };

    reader.readAsDataURL(file);

  }}
/>

<input
  type="file"
  accept="image/*"

  onChange={(e) => {

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagenEdit2(reader.result);
    };

    reader.readAsDataURL(file);

  }}
/>

<input
  type="file"
  accept="image/*"

  onChange={(e) => {

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagenEdit3(reader.result);
    };

    reader.readAsDataURL(file);

  }}
/>

<input
  type="file"
  accept="image/*"

  onChange={(e) => {

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagenEdit4(reader.result);
    };

    reader.readAsDataURL(file);

  }}
/>

    <input
      value={orgEdit}
      onChange={(e) =>
        setOrgEdit(e.target.value)
      }
      placeholder="Organización"
      style={inputStyle}
    />

    <button

      onClick={guardarEdicion}

      style={{
        width: "100%",
        marginTop: "20px",
        padding: "15px",
        border: "none",
        borderRadius: "10px",
        background: "#16a34a",
        color: "white",
        cursor: "pointer",
      }}
    >
      💾 Guardar cambios
    </button>

  </div>

)}


                   {/* IMÁGENES */}

<div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    flexWrap: "wrap",
  }}
>

  {(

    Array.isArray(item.imagenes)

      ? item.imagenes

      : [
          item.img1,
          item.img2,
          item.img3,
          item.img4,
        ]

  )

    .filter(
      (img) =>
        typeof img === "string" &&
        img.trim() !== ""
    )

    .map((img, index) => (

      <img
        key={index}
src={img}

        onClick={() =>
          setImagenGrande(img)
        }

        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      />

    ))}

</div>

                    </div>

                  ))}

              </div>

            )}

          </div>

        )}

        {/* BUSCAR MATERIAL */}

        {pantalla === "buscar" && (

          <div
            style={{
              width: "80%",
              maxWidth: "1200px",
              padding: "20px",
            }}
          >

            <h1
              style={{
                fontSize: "40px",
                marginBottom: "30px",
              }}
            >
              🔎 Buscar material
            </h1>

            <input

              type="text"

              placeholder="Buscar por número de parte"

              value={busqueda}

              onChange={(e) =>
                setBusqueda(e.target.value)
              }

              style={{
                width: "95%",
                boxSizing: "border-box",
                padding: "18px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                fontSize: "18px",
              }}

            />

            <div
              style={{
                marginTop: "30px",
              }}
            >

{materiales

  .filter((item) => {

    if (!item) return false;

    const textoBusqueda =
      busqueda.toLowerCase();

    const parte =
      item.parte
        ?.toString()
        .toLowerCase() || "";

    const modelo =
      item.modelo
        ?.toString()
        .toLowerCase() || "";

    const descripcion =
      item.descripcion
        ?.toString()
        .toLowerCase() || "";

    return (

      parte.includes(textoBusqueda)

      ||

      modelo.includes(textoBusqueda)

      ||

      descripcion.includes(textoBusqueda)

    );

  })

  .map((item, index) => (

                  <div
                    key={index}
                    style={{
                      background: "white",
                      padding: "20px",
                      borderRadius: "15px",
                      marginTop: "20px",
                    }}
                  >

                    <h2>
                      📦 {item.parte}
                    </h2>

<p>
  ID: {item.id}
</p>

                    <p>
                      Modelo: {item.modelo}
                    </p>

<p>
  Descripción: {
    item.descripcion || "Sin descripción"
  }
</p>

                    <p>
                      Organización: {item.org}
                    </p>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    flexWrap: "wrap",
  }}
>

  {(

    Array.isArray(item.imagenes)

      ? item.imagenes

      : [
          item.img1,
          item.img2,
          item.img3,
          item.img4,
        ]

  )

    .filter(
      (img) =>
        typeof img === "string" &&
        img.trim() !== ""
    )

    .map((img, index) => (

      <img
        key={index}

        src={img}

        onClick={() =>
          setImagenGrande( img)
        }

        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      />

    ))}

</div>

                  </div>

                ))}

            </div>

          </div>

        )}

       {/* FS10 */}

{pantalla === "fs10" && (

<div
style={{
width: "95%",
padding: "30px",
boxSizing: "border-box",
overflowX: "hidden",
}}
>

<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
}}
>

<div>

<h1
style={{
fontSize: "50px",
}}
>
Producto FS10 A FH20
</h1>

<p
style={{
fontSize: "25px",
color: "#555",
}}
>
Buscar y administrar inventario
</p>

</div>

<div
style={{
display: "flex",
gap: "20px",
}}
>

<button
style={{
padding: "20px 40px",
borderRadius: "10px",
border: "2px solid #2563eb",
background: "white",
color: "#2563eb",
fontSize: "20px",
cursor: "pointer",
}}
>
Escanear
</button>

<button

onClick={() =>
setMostrarManual(true)
}

style={{
padding: "20px 40px",
borderRadius: "10px",
border: "2px solid red",
background: "white",
color: "red",
fontSize: "20px",
cursor: "pointer",
}}
>
Manual
</button>

</div>

</div>

<input
placeholder="🔎 Buscar material"

style={{
marginTop: "40px",
padding: "25px",
borderRadius: "10px",
border: "2px solid #2563eb",
fontSize: "22px",
}}
/>

<h2
style={{
marginTop: "40px",
}}
>
Total Items Scanned: {materialesFS10.length}
</h2>

<table
style={{
width: "100%",
borderCollapse: "collapse",
background: "white",
tableLayout: "auto",
}}
>

<thead>

<tr>

<th style={thStyle}>
Organización
</th>

<th style={thStyle}>
ID Material
</th>

<th style={thStyle}>
Número de parte
</th>

<th style={thStyle}>
Cantidad
</th>

<th style={thStyle}>
Num.Empleado
</th>

<th style={thStyle}>
Editar
</th>

<th style={thStyle}>
Remove
</th>

</tr>

</thead>

<tbody>

{materialesFS10.map(
(item, index) => (

<tr key={index}>

<td style={tdStyle}>
{item.organizacion}
</td>

<td style={tdStyle}>
{item.idMaterial}
</td>

<td style={tdStyle}>
{item.parte}
</td>

<td style={tdStyle}>
{item.cantidad}
</td>

<td style={tdStyle}>
{item.empleado}
</td>

<td style={tdStyle}>

<button

onClick={() => {

const pass = prompt(
"Ingrese contraseña"
);

if (
pass !== PASSWORD_ADMIN
) {

alert(
"Contraseña incorrecta"
);

return;

}

setEditandoFS10(
item.id
);

setOrgEditFS10(
item.organizacion
);

setIdMaterialEditFS10(
item.idMaterial
);

setParteEditFS10(
item.parte
);

setCantidadEditFS10(
item.cantidad
);

setEmpleadoEditFS10(
item.empleado
);

}}

style={{
border: "none",
background: "transparent",
cursor: "pointer",
fontSize: "20px",
}}

>

✏️

</button>

</td>

<td style={tdStyle}>

<button

onClick={async () => {

const pass = prompt(
"Ingrese contraseña"
);

if (
pass !== PASSWORD_ADMIN
) {

alert(
"Contraseña incorrecta"
);

return;

}

const confirmar =
window.confirm(
"¿Eliminar material?"
);

if (!confirmar)
return;

await deleteDoc(
doc(db, "fs10", item.id)
);

setMaterialesFS10(

materialesFS10.filter(
(mat) =>
mat.id !== item.id
)

);

}}

style={{
border: "none",
background: "transparent",
cursor: "pointer",
fontSize: "20px",
}}

>

🗑️

</button>

</td>

</tr>

)
)}

</tbody>

</table>

{editandoFS10 && (

<div
style={{
position: "fixed",
top: 0,
left: 0,
width: "100%",
height: "100%",
background:
"rgba(0,0,0,0.5)",
display: "flex",
justifyContent:
"center",
alignItems: "center",
zIndex: 9999,
}}
>

<div
style={{
background: "white",
padding: "30px",
borderRadius: "20px",
width: "500px",
display: "flex",
flexDirection:
"column",
gap: "15px",
}}
>

<h2>
Editar material
</h2>

<input
value={orgEditFS10}
onChange={(e) =>
setOrgEditFS10(
e.target.value
)
}
placeholder="Organización"
style={inputStyle}
/>

<input
value={idMaterialEditFS10}
onChange={(e) =>
setIdMaterialEditFS10(
e.target.value
)
}
placeholder="ID Material"
style={inputStyle}
/>

<input
value={parteEditFS10}
onChange={(e) =>
setParteEditFS10(
e.target.value
)
}
placeholder="Parte"
style={inputStyle}
/>

<input
value={cantidadEditFS10}
onChange={(e) =>
setCantidadEditFS10(
e.target.value
)
}
placeholder="Cantidad"
style={inputStyle}
/>

<input
value={empleadoEditFS10}
onChange={(e) =>
setEmpleadoEditFS10(
e.target.value
)
}
placeholder="Empleado"
style={inputStyle}
/>

<div
style={{
display: "flex",
justifyContent:
"space-between",
marginTop: "20px",
}}
>

<button

onClick={() =>
setEditandoFS10(
null
)
}

style={{
padding: "12px 25px",
border: "none",
borderRadius: "10px",
cursor: "pointer",
}}

>

Cancelar

</button>

<button

onClick={async () => {

await updateDoc(

doc(
db,
"fs10",
editandoFS10
),

{

organizacion:
orgEditFS10,

idMaterial:
idMaterialEditFS10,

parte:
parteEditFS10,

cantidad:
cantidadEditFS10,

empleado:
empleadoEditFS10,

}

);

setMaterialesFS10(

materialesFS10.map(
(mat) =>

mat.id ===
editandoFS10

? {

...mat,

organizacion:
orgEditFS10,

idMaterial:
idMaterialEditFS10,

parte:
parteEditFS10,

cantidad:
cantidadEditFS10,

empleado:
empleadoEditFS10,

}

: mat

)

);

setEditandoFS10(
null
);

}}

style={{
padding: "12px 25px",
border: "none",
borderRadius: "10px",
background:
"#2563eb",
color: "white",
cursor: "pointer",
}}

>

Guardar

</button>

</div>

</div>

</div>

)}

</div>

)}

{pantalla === "jaula1" && (

 <div
  style={{
    width: "95%",
    padding: "30px",
    boxSizing: "border-box",
    overflowX: "hidden",
  }}
>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >

      <div>

        <h1
          style={{
            fontSize: "50px",
          }}
        >
          Producto Jaula 1
        </h1>

        <p
          style={{
            fontSize: "25px",
            color: "#555",
          }}
        >
          Buscar y administrar inventario
        </p>

      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >

        <button
          style={{
            padding: "20px 40px",
            borderRadius: "10px",
            border: "2px solid #2563eb",
            background: "white",
            color: "#2563eb",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          Escanear
        </button>

        <button

  onClick={() =>
   setMostrarManualJaula1(true)
  }

  style={{
    padding: "20px 40px",
    borderRadius: "10px",
    border: "2px solid red",
    background: "white",
    color: "red",
    fontSize: "20px",
    cursor: "pointer",
  }}
>
  Manual
</button>

      </div>

    </div>

    <input
      placeholder="🔎 Buscar material"

      style={{
        marginTop: "40px",
        padding: "25px",
        borderRadius: "10px",
        border: "2px solid #2563eb",
        fontSize: "22px",
      }}
    />

    <h2
      style={{
        marginTop: "40px",
      }}
    >
      Total Items Scanned: 13
    </h2>

 <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    tableLayout: "auto",
  }}
>

      <thead>

        <tr>

          <th   style={{
    ...thStyle,
   
  }}
>
            Organización
          </th>

<th   style={{
    ...thStyle,
   
    
  }}
>
  ID Material
</th>

         <th
  style={{
    ...thStyle,
   
  }}
>
  Número de parte
</th>

          <th   style={{
    ...thStyle,
  
  }}
>
            Cantidad
          </th>

          <th   style={{
    ...thStyle,
   
  }}
>
            Num.Empleado
          </th>

          <th   style={{
    ...thStyle,
    
  }}
>
            Editar
          </th>

          <th   style={{
    ...thStyle,
    
  }}
>
            Remove
          </th>

        </tr>

      </thead>

      <tbody>

       {materialesFS10.map(
(item,index) => (

<tr key={index}>

<td style={tdStyle}>
{item.organizacion}
</td>

<td style={tdStyle}>
{item.idMaterial}
</td>

<td style={tdStyle}>
{item.parte}
</td>

<td style={tdStyle}>
{item.cantidad}
</td>

<td style={tdStyle}>
{item.empleado}
</td>

<td style={tdStyle}>
✏️
</td>

<td style={tdStyle}>
🗑️
</td>

</tr>

))}

      </tbody>

    </table>

  </div>

)}

{pantalla === "jaula2" && (

 <div
  style={{
    width: "95%",
    padding: "30px",
    boxSizing: "border-box",
    overflowX: "hidden",
  }}
>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >

      <div>

        <h1
          style={{
            fontSize: "50px",
          }}
        >
          Producto Jaula 2
        </h1>

        <p
          style={{
            fontSize: "25px",
            color: "#555",
          }}
        >
          Buscar y administrar inventario
        </p>

      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >

        <button
          style={{
            padding: "20px 40px",
            borderRadius: "10px",
            border: "2px solid #2563eb",
            background: "white",
            color: "#2563eb",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          Escanear
        </button>

      <button

  onClick={() =>
   setMostrarManualJaula2(true)
  }

  style={{
    padding: "20px 40px",
    borderRadius: "10px",
    border: "2px solid red",
    background: "white",
    color: "red",
    fontSize: "20px",
    cursor: "pointer",
  }}
>
  Manual
</button>

      </div>

    </div>

    <input
      placeholder="🔎 Buscar material"

      style={{
        marginTop: "40px",
        padding: "25px",
        borderRadius: "10px",
        border: "2px solid #2563eb",
        fontSize: "22px",
      }}
    />

    <h2
      style={{
        marginTop: "40px",
      }}
    >
      Total Items Scanned: 13
    </h2>

 <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    tableLayout: "auto",
  }}
>

      <thead>

        <tr>

          <th   style={{
    ...thStyle,
   
  }}
>
            Organización
          </th>

<th   style={{
    ...thStyle,
   
    
  }}
>
  ID Material
</th>

         <th
  style={{
    ...thStyle,
   
  }}
>
  Número de parte
</th>

          <th   style={{
    ...thStyle,
  
  }}
>
            Cantidad
          </th>

          <th   style={{
    ...thStyle,
   
  }}
>
            Num.Empleado
          </th>

          <th   style={{
    ...thStyle,
    
  }}
>
            Editar
          </th>

          <th   style={{
    ...thStyle,
    
  }}
>
            Remove
          </th>

        </tr>

      </thead>

      <tbody>

        <tr>

          <td   style={{
    ...tdStyle,
  }}
>
            SOTV
          </td>

<td   style={{
    ...tdStyle,
  }}
>
  MAT-0001
</td>

         <td
  style={{
    ...tdStyle,
  }}
>
  3-0541-2597-01
</td>

          <td   style={{
    ...tdStyle,
  }}
>
            250
          </td>

          <td   style={{
    ...tdStyle,
  }}
>
            1023
          </td>

          <td   style={{
    ...tdStyle,
  }}
>
            ✏️
          </td>

          <td   style={{
    ...tdStyle,
  }}
>
            🗑️
          </td>

        </tr>

      </tbody>

    </table>

  </div>

)}

{/* MODAL FS10 */}

{mostrarManual && (

  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >

    <div
      style={{
        width: "90%",
maxWidth: "500px",
        background: "white",
        borderRadius: "20px",
        padding: "30px",
      }}
    >

      <h1>📦 Registro manual FS10</h1>

      <input
        placeholder="Organización"
        value={orgManual}
        onChange={(e) =>
          setOrgManual(e.target.value)
        }
        style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Material identificación"
        value={idMaterialManual}
        onChange={(e) =>
          setIdMaterialManual(
            e.target.value
          )
        }
        style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Número de parte"
        value={parteManual}
        onChange={(e) =>
          setParteManual(
            e.target.value
          )
        }
       style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Cantidad"
        value={cantidadManual}
        onChange={(e) =>
          setCantidadManual(
            e.target.value
          )
        }
        style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Num empleado"
        value={empleadoManual}
        onChange={(e) =>
          setEmpleadoManual(
            e.target.value
          )
        }
       style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >

        <button
          onClick={() =>
            setMostrarManual(false)
          }
          style={{
            padding: "15px 30px",
            border: "none",
            borderRadius: "10px",
            background: "#ddd",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>

      <button

  onClick={async () => {

    const nuevoMaterial = {

      organizacion: orgManual,

      idMaterial:
        idMaterialManual,

      parte: parteManual,

      cantidad: cantidadManual,

      empleado: empleadoManual,

    };

    await addDoc(
      collection(db, "fs10"),
      nuevoMaterial
    );

    setMaterialesFS10([
      ...materialesFS10,
      nuevoMaterial,
    ]);

    setOrgManual("");
    setIdMaterialManual("");
    setParteManual("");
    setCantidadManual("");
    setEmpleadoManual("");

    setMostrarManual(false);

  }}

  style={{
    padding: "15px 30px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  }}
>
  Guardar
</button>

      </div>

    </div>

  </div>

)}

{/* MODAL JAULA 1 */}

{mostrarManualJaula1 && (

  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >

    <div
      style={{
        width: "90%",
maxWidth: "500px",
        background: "white",
        borderRadius: "20px",
        padding: "30px",
      }}
    >

      <h1>📦 Registro manual Jaula 1</h1>

      <input
        placeholder="Organización"
        value={orgManual}
        onChange={(e) =>
          setOrgManual(e.target.value)
        }
        style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Material identificación"
        value={idMaterialManual}
        onChange={(e) =>
          setIdMaterialManual(
            e.target.value
          )
        }
        style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Número de parte"
        value={parteManual}
        onChange={(e) =>
          setParteManual(
            e.target.value
          )
        }
        style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Cantidad"
        value={cantidadManual}
        onChange={(e) =>
          setCantidadManual(
            e.target.value
          )
        }
        style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Num empleado"
        value={empleadoManual}
        onChange={(e) =>
          setEmpleadoManual(
            e.target.value
          )
        }
        style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >

        <button
          onClick={() =>
            setMostrarManualJaula1(false)
          }
          style={{
            padding: "15px 30px",
            border: "none",
            borderRadius: "10px",
            background: "#ddd",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>

        <button
          style={{
            padding: "15px 30px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          Guardar
        </button>

      </div>

    </div>

  </div>

)}

{/* MODAL JAULA 2 */}

{mostrarManualJaula2 && (

  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >

    <div
      style={{
        width: "90%",
maxWidth: "500px",
        background: "white",
        borderRadius: "20px",
        padding: "30px",
      }}
    >

      <h1>📦 Registro manual Jaula 2</h1>

      <input
        placeholder="Organización"
        value={orgManual}
        onChange={(e) =>
          setOrgManual(e.target.value)
        }
       style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Material identificación"
        value={idMaterialManual}
        onChange={(e) =>
          setIdMaterialManual(
            e.target.value
          )
        }
       style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Número de parte"
        value={parteManual}
        onChange={(e) =>
          setParteManual(
            e.target.value
          )
        }
        style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Cantidad"
        value={cantidadManual}
        onChange={(e) =>
          setCantidadManual(
            e.target.value
          )
        }
        style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <input
        placeholder="Num empleado"
        value={empleadoManual}
        onChange={(e) =>
          setEmpleadoManual(
            e.target.value
          )
        }
        style={{
  ...inputStyle,
  width: "100%",
  boxSizing: "border-box",
}}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >

        <button
          onClick={() =>
            setMostrarManualJaula2(false)
          }
          style={{
            padding: "15px 30px",
            border: "none",
            borderRadius: "10px",
            background: "#ddd",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>

        <button
          style={{
            padding: "15px 30px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          Guardar
        </button>

      </div>

    </div>

  </div>

)}

        {/* VISOR IMAGEN */}

        {imagenGrande && (

          <div

            onClick={() =>
              setImagenGrande(null)
            }

            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >

            <img
              src={imagenGrande}

              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: "20px",
              }}
            />

          </div>

        )}

{mostrarPassword && (

  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >

    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "20px",
        width: "350px",
      }}
    >

      <h2>
        🔒 Acceso administrador
      </h2>

      <p>
        Ingrese contraseña
      </p>

      <input
        type="password"

        value={passwordInput}

        onChange={(e) =>
          setPasswordInput(e.target.value)
        }

        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          marginTop: "10px",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >

        <button

          onClick={() => {

            setMostrarPassword(false);

            setPasswordInput("");

          }}

          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>

        <button

          onClick={() => {

            if (
              passwordInput !== PASSWORD_ADMIN
            ) {

              alert(
                "Contraseña incorrecta"
              );

              return;

            }

            accionPendiente?.();

            setMostrarPassword(false);

            setPasswordInput("");

          }}

          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>

      </div>

    </div>

  </div>

)}
      </div>

    </div>
  );
}

export default App;

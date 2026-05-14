
import { db } from "./firebase";

import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { useState, useEffect } from "react";

function App() {

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

  const [usuarioInput, setUsuarioInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [logueado, setLogueado] = useState(false);

  const [usuarioActual, setUsuarioActual] = useState(null);

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

  // 🔥 SISTEMA

  const [pantalla, setPantalla] = useState("inicio");

  const [parte, setParte] = useState("");
  const [modelo, setModelo] = useState("");
  const [org, setOrg] = useState("");

  const [imagen1, setImagen1] = useState(null);
  const [imagen2, setImagen2] = useState(null);
  const [imagen3, setImagen3] = useState(null);
  const [imagen4, setImagen4] = useState(null);

  const [imagenGrande, setImagenGrande] = useState(null);

  const [materiales, setMateriales] = useState([]);

useEffect(() => {

  const cargarMateriales = async () => {

    const querySnapshot = await getDocs(
      collection(db, "materiales")
    );

    const lista = [];

    querySnapshot.forEach((doc) => {

      lista.push(doc.data());

    });

    setMateriales(lista);

    console.log(lista);

  };

  cargarMateriales();

  const intervalo = setInterval(() => {

    cargarMateriales();

  }, 2000);

  return () => clearInterval(intervalo);

}, []);

  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState("");
  const [busqueda, setBusqueda] = useState("");

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

  // 🔐 PANTALLA LOGIN

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

            <h1
              style={{
                fontSize: "50px",
              }}
            >
              Dashboard de Materiales
            </h1>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "30px",
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
              placeholder="ORG"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              style={inputStyle}
            />

            {/* IMÁGENES */}

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

                onChange={(e) =>
                  setImagen1(
                    URL.createObjectURL(
                      e.target.files[0]
                    )
                  )
                }

                style={inputStyle}
              />

              <p>Imagen 2</p>

              <input
                type="file"
                accept="image/*"

                onChange={(e) =>
                  setImagen2(
                    URL.createObjectURL(
                      e.target.files[0]
                    )
                  )
                }

                style={inputStyle}
              />

              <p>Imagen 3</p>

              <input
                type="file"
                accept="image/*"

                onChange={(e) =>
                  setImagen3(
                    URL.createObjectURL(
                      e.target.files[0]
                    )
                  )
                }

                style={inputStyle}
              />

              <p>Imagen 4</p>

              <input
                type="file"
                accept="image/*"

                onChange={(e) =>
                  setImagen4(
                    URL.createObjectURL(
                      e.target.files[0]
                    )
                  )
                }

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

  org: org.toUpperCase(),

  imagenes: [
    imagen1,
    imagen2,
    imagen3,
    imagen4,
  ],

};

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

              {["SHTV", "SOTV", "SPTV", "FBC0", "FBC1", "EV03"].map((orgItem) => (

                <button
                  key={orgItem}
                  onClick={() =>
                    setOrganizacionSeleccionada(orgItem)
                  }

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
                      }}
                    >

                      <h3>
                        📦 {item.parte}
                      </h3>

                      <p>
                        Modelo: {item.modelo}
                      </p>

                      <p>
                        Organización: {item.org}
                      </p>

                      {/* MOSTRAR IMÁGENES */}

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "15px",
                          flexWrap: "wrap",
                        }}
                      >

              {(

  item.imagenes ||

  [
    item.img1,
    item.img2,
    item.img3,
    item.img4,
  ]

)?.map((img, index) => (

  img && (

    <img
      key={index}

      src={
        img.startsWith("data:image")
          ? img
          : `data:image/jpeg;base64,${img}`
      }

      onClick={() =>
        setImagenGrande(
          img.startsWith("data:image")
            ? img
            : `data:image/jpeg;base64,${img}`
        )
      }

      style={{
        width: "120px",
        height: "120px",
        objectFit: "cover",
        borderRadius: "12px",
        cursor: "pointer",
      }}
    />

  )

))}
                          

                      </div>

                    </div>

                  ))}

              </div>

            )}

          </div>

        )}

      </div>

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

          if (!busqueda) return false;

          return item.parte
            ?.toString()
            .toLowerCase()
            .includes(
              busqueda.toLowerCase()
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
              Modelo: {item.modelo}
            </p>

            <p>
              Organización: {item.org}
            </p>

          </div>

        ))}

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

    </div>
  );
}

export default App;
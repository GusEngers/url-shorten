# URL-SHORTEN

Proyecto con la finalidad de acortar urls que sean extensas. Esta nueva versión posee algunos pequeños cambios:

- Posibilidad de obtener una lista con todas las urls filtradas según el host donde se encuentran.
- Validaciones de formato url en el campo **original** directamente en la creación de una nueva instancia del documento.
- Cambio en el modelo del documento donde se almacen la información:

| **CAMPO** | **DESCRIPCIÓN** |
| --- | --- |
| id | Identificador con el cual usaremos para realizar la redirección |
| original | Ruta url original `(este campo cuenta con validación para determinar si es una url válida -es necesario también indicar el protocolo-)` |
| shorten | Ruta acortada |

**GET -** `/`

Obtiene una lista con todas las urls según su host

`200`

```Typescript
[
  {
    "id": string // Identificador de la url
    "original": string // Url original
    "shorten": string // Url acortada
  },
  ...
]
```

**POST -** `/generate`

Añade un nuevo documento a la base de datos con los datos solicitados por body

`body`

```Typescript
{
  "original": string // Url a acortar
}
```

`201`

```Typescript
{
  "url": string // Url acortada
}
```

**GET -** `/:id`

Busca y obtiene la url original alojada en el documento con el identificador pasado como parámetro, adémas verifica si dicho verificador existe o no. Una vez obtenido los datos, redirecciona a la página de la url original

`params`

```Typescript
{
  "id": string // Identificador de la url
}
```

`302`

```Typescript
Redirección a la página solicitada
```

`500`

```Typescript
"Error: Requested URL doesn't exist!"
```

`500`

```Typescript
"Error: Missing Parameter!"
```

### REQUERIMIENTOS

Si deseas descargar para experimentar este proyecto debes añadir en la raíz un archivo **.env** con las siguientes propiedades:

```Typescript
PORT // Número de puerto
MONGO_URI // Uri de la base de datos en MongoDB
```

### PRÓXIMOS PASOS

- Añadir un cliente en el cual poder hacer las solicitudes de generación del acortador de forma más cómoda.
- Añadir nuevas funcionalidades:
  - Autenticación a través de [user-auth-api](https://github.com/GusEngers/user-auth-api#readme) para que sólo usuarios registrados puedan usar la herramienta.
  - En conjunto con la autenticación los usuarios podrán eliminar o modificar sus urls.
- Fixes.

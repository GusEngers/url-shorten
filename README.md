# URL-SHORTEN


### REQUERIMIENTOS
Si deseas descargar para experimentar este proyecto debes añadir en la raíz un archivo **.env** con las siguientes propiedades:
```Typescript
PORT // Número de puerto
MONGO_URI // Uri de la base de datos en MongoDB
```

## V1.0.1
- Ruta para obtener todas las urls guardadas:

**GET -** ``/``

``200``
```Typescript
[
  {
    "id": string // Identificador de la url
    "url": string // Url original
  },
  ...
]
```

---

## V1.0.0
Primera versión del acortador de urls con solamente dos funcionalidades **crear** y **redireccionar**.

### ENDPOINTS
**POST -** ``/generate``

Añade un nuevo documento a la base de datos con los datos solicitados por body, además verifica si la url en cuestión ya existe en la base de datos.

``body``
```Typescript
{
  "url": string // Url a acortar
}
```
``201``
```Typescript
{
  "data": string // Url acortada
}
```
``500``
```Typescript
"Error: The URL already has a shortener!"
```
``500``
```Typescript
"Error: Missing Parameter!"
```

**GET -** ``/:id``

Busca y obtiene la url original alojada en el documento con el identificador pasado como parámetro, adémas verifica si dicho verificador existe o no. Una vez obtenido los datos, redirecciona a la página de la url original.

``params``
```Typescript
{
  "id": string // Identificador de la url
}
```
``302``
```Typescript
Redirección a la página solicitada
```
``500``
```Typescript
"Error: Requested URL doesn't exist!"
```
``500``
```Typescript
"Error: Missing Parameter!"
```

### PRÓXIMOS PASOS
- Añadir un cliente en el cual poder hacer las solicitudes de generación del acortador de forma más cómoda.
- Añadir nuevas funcionalidades:
- - Autenticación a través de [user-auth-api](https://github.com/GusEngers/user-auth-api) para que sólo usuarios registrados puedan usar la herramienta.
- - En conjunto con la autenticación los usuarios podrán eliminar o modificar sus urls.
- Fixes.
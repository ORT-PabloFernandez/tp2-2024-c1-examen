# TALLER DE PROGRAMACION 2

## Instrucciones de resolución de examen

Es tu primer día en [tecnoshare.com](http://tecnoshare.com) luego de un intenso entrenamiento de 10 semanas por fin tenes la oportunidad de mostrar lo que aprendiste, y tu potencial como desarrollador backend en nodejs con express y mongodb.

Luego de abrir el correo encuentras un mail de tu Líder Técnico con tu primera asignación!! 💪

> Bienvenid@! estuvimos esperando por horas que llegares, tenemos varias tareas criticas y prioritarias en nuestro backlog. Por favor presta mucha atención a las instrucciones. No dudes en preguntarme cualquier cosa, aunque generalmente estoy muy ocupado resolviendo problemas heredados de las rotaciones de los desarrolladores.

> En el presente repositorío encontrarás un proyecto de nodejs que ya tiene codigo base del backend con el que vamos a trabajar. Te aconsejo que sigas los siguientes pasos para armar tu entorno de trabajo.

> 1. Realizar un Fork del presente repositorio
> 2. Realizar un clone del presente repositorio
> 3. Instalar las dependencias
> 4. Solicitar las variables de entorno que contiene la conexion string a mongodb (antes de preguntar, revisa el chat, seguro estan ahí)
> 5. Ejecutar el servidor web de la api REST con el script de npm start-dev si queres trabajar con nodemon (tendrías que instalarlo) con start solo, tambien funciona.
>    El backend se conecta con una base de datos Mongodb en la cual se encuentra la base de datos **sample_supplies** con una collection llamada **sales**, ahí se encuentran aprox. 5.001 ventas.
> 6. Proba el endpoint que ya se encuentra desarrollado: /api/sales debería retornar un json con 5.001 películas. Sin embargo te aconsejo que uses el paginado que tiene para probar (mira la definición del end-point). Sí por algun motivo no llegase a funcionar, solicita asistencia.

> ### TUS TAREAS SON LAS SIGUIENTES POR ORDEN DE PRIORIDAD
>
> 1. Necesitamos un endpoint que nos devuelva una venta (**sales**) particular por \_id
> 2. Necesitamos un endpoint que nos permita filtrar las ventas por localización (**storeLocation**). Por emeplo todas las ventas de las tiendas en Seatle
> 3. El equipo de frontend esta preparando una pagina que permita filtrar tanto por localización como por el medio que se hizo la venta (**purchaseMethod**) y ademas si se uso un cupon (**couponUsed**)
> 4. Recientemente nos llegó un requerimiento para promocionar en la pagina los productos mas vendidos. Por lo cual se requiere un endpoint que retorne los 10 productos mas vendidos

> ### SI TE DA EL TIEMPO DAME UN MANO TAMBIEN EN...
>
> 5. El equipo Marketing esta preparando una promoción via mail para los clientes mas satisfechos, y rebajas para los clientes mas insatisfechos. Para tal efecto, se quiere un endpoint que proporcione a los clientes ordenados por satisfacción (**satisfaction**)
>
> Desde ya muchas gracias por la colaboración! 😉 como te comente en la entrevista soy muy detallista en la prolijidad del codigo y la performance cada detalle cuenta, no me gusta mucho las cosas fuera del estandar de APIREST, sin embargo si no estas seguro, es mejor que lo resuelvas como puedas y me dejes notas en el readme.md del repo, para que yo pueda probar.

## Intrucciones para la entrega

Si ya terminaste o son las 10:00 asegurate de seguir los siguientes pasos para la entrega:

1. Completar el listado de endpoints, especificando parametros si los hubiera, mas abajo en este mismo archivo.
2. Realizar un commit a tu repo con un mensaje con tu nombre completo
3. Realizar un push a tu repositorio
4. Realizar un pull request a mi repositorio

## Listado de endpoint
- GET /api/sales
  - Descripción: Obtiene todas las ventas.
  - Parámetros: `pageSize` (opcional, número de elementos por página), `page` (opcional, número de página)
  - Ejemplo: `/api/sales?pageSize=10&page=1`

- GET /api/sales/:id
  - Descripción: Obtiene una venta por su ID.
  - Parámetros: `id` (obligatorio, el ID de la venta)
  - Ejemplo: `/api/sales/60d5ec9af682fbd39a8924`

- GET /api/sales/storeLocation/:storeLocation
  - Descripción: Obtiene las ventas por ubicación de la tienda.
  - Parámetros: `storeLocation` (obligatorio, la ubicación de la tienda), `pageSize` (opcional, número de elementos por página), `page` (opcional, número de página)
  - Ejemplo: `/api/sales/storeLocation/New%20York?pageSize=10&page=1`

- GET /api/sales/storeLocationAndPurchaseMethod
  - Descripción: Obtiene las ventas por ubicación de la tienda y método de compra.
  - Parámetros: `storeLocation` (obligatorio, la ubicación de la tienda), `purchaseMethod` (obligatorio, el método de compra), `couponUsed` (opcional, si se usó un cupón), `pageSize` (opcional, número de elementos por página), `page` (opcional, número de página)
  - Ejemplo: `/api/sales/storeLocationAndPurchaseMethod?storeLocation=New%20York&purchaseMethod=Online&couponUsed=true&pageSize=10&page=1`

- GET /api/sales/TopTenSoldItems
  - Descripción: Obtiene los diez artículos más vendidos.
  - Parámetros: Ninguno
  - Ejemplo: `/api/sales/TopTenSoldItems`

- GET /api/sales/CustomersBySatisfaction
  - Descripción: Obtiene todos los clientes por satisfacción.
  - Parámetros: Ninguno
  - Ejemplo: `/api/sales/CustomersBySatisfaction`
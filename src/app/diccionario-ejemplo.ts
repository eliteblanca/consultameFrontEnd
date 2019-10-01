import { Article, articleConf } from "./article";
export class DiccionarioEjemplo {  

    public listadoPalabras:string[] =
[
    'qué'
    ,"abono"    
    ,"abreviaturas" 
    ,"acceso"   
    ,"acción"
    ,"acciones" 
    ,"aclaracion"   
    ,"acreditacion" 
    ,"activacion"   
    ,"actividad"    
    ,"actividades"  
    ,"actual"
    ,"actualización"    
    ,"acuerdo"
    ,"además"
    ,"afiliación"   
    ,"afiliaciones" 
    ,"agendamiento" 
    ,"agua"     
    ,"ahora"
    ,"aire"
    ,"ajuste"   
    ,"alertas"  
    ,"algo"
    ,"algún"
    ,"alguna"
    ,"algunas"
    ,"alguno"
    ,"algunos"
    ,"alianza"  
    ,"allí"
    ,"alta"
    ,"alternativa"  
    ,"alto"
    ,"ambos"
    ,"amor"
    ,"amparo"   
    ,"amparos"  
    ,"anexo"    
    ,"ante"
    ,"anterior"
    ,"antes"
    ,"antonio"
    ,"anulacion"    
    ,"anular"       
    ,"años"
    ,"apertura" 
    ,"aplicación"   
    ,"aplicativo"   
    ,"aplicativos"  
    ,"aportes"  
    ,"aquel"
    ,"aquella"
    ,"aquellos"
    ,"aquí"
    ,"archivo"  
    ,"arte"
    ,"articulo" 
    ,"asesor"   
    ,"asesores" 
    ,"asesoria"     
    ,"asignación"   
    ,"asistencia"   
    ,"asistencias"  
    ,"atención"
    ,"atributos"    
    ,"audiorespuesta"       
    ,"aunque"
    ,"autenticación"    
    ,"autorizacion" 
    ,"autorizaciones"   
    ,"avaya"    
    ,"ayer"
    ,"ayudas"   
    ,"baja"
    ,"bajo"
    ,"bancolombia"  
    ,"barcelona"
    ,"base"
    ,"bastantes "
    ,"beneficio"    
    ,"beneficios"   
    ,"bien"
    ,"bloqueo"  
    ,"bloqueos" 
    ,"boletín"  
    ,"bono" 
    ,"buen"
    ,"buena"
    ,"bueno"
    ,"búsqueda" 
    ,"cabeza"
    ,"cada"
    ,"calculo"  
    ,"calendario"   
    ,"calidad" 
    ,"calle"
    ,"cambio"   
    ,"cambios"  
    ,"camino"
    ,"campaña"
    ,"campañas" 
    ,"campo"
    ,"canal"    
    ,"canales"  
    ,"cancelación"  
    ,"capacidad"
    ,"capital"
    ,"capitulo" 
    ,"cara"
    ,"características"  
    ,"carlos"
    ,"carta"    
    ,"cartas"   
    ,"cartera"  
    ,"casa"
    ,"casi"
    ,"caso"
    ,"casos"    
    ,"catalogo" 
    ,"categoría"    
    ,"causales"      
    ,"central"
    ,"centro"   
    ,"centros"  
    ,"cerca"
    ,"certificado"  
    ,"certificados" 
    ,"cesantias"    
    ,"cesion"   
    ,"chat" 
    ,"cheques"  
    ,"ciento"
    ,"cierre"   
    ,"cierres"  
    ,"cierto"
    ,"cinco"
    ,"circular" 
    ,"citas"    
    ,"ciudad"
    ,"claro"
    ,"clases"   
    ,"cliente"  
    ,"clientes" 
    ,"club" 
    ,"cobertura"    
    ,"coberturas"   
    ,"cobranzas"    
    ,"cobro"    
    ,"codificación" 
    ,"código"   
    ,"códigos"  
    ,"colecciòn"    
    ,"comisión"
    ,"comision" 
    ,"comité"   
    ,"cómo"
    ,"comparativo"  
    ,"compra"   
    ,"comunicado"   
    ,"comunidad"    
    ,"conceptos"    
    ,"concurso" 
    ,"condiciones"  
    ,"conexión" 
    ,"configuración"    
    ,"confirmación" 
    ,"consejo"
    ,"consignación" 
    ,"consolidado"  
    ,"constancia"   
    ,"consulta" 
    ,"consultar"    
    ,"consultas"    
    ,"contacto" 
    ,"contactos"    
    ,"contingencia" 
    ,"contingencias"    
    ,"contra"
    ,"control"  
    ,"convenio" 
    ,"convenios"    
    ,"copagos"  
    ,"copia"    
    ,"correccion"   
    ,"correo"   
    ,"correos"  
    ,"cosa"
    ,"cosas"
    ,"cotizacion"   
    ,"creación" 
    ,"crear"    
    ,"crédito"  
    ,"creditos" 
    ,"creo"
    ,"cronograma"   
    ,"cuadro"   
    ,"cuádruple"
    ,"cuál"
    ,"cuáles"
    ,"cuáles"   
    ,"cualquier"
    ,"cualquiera"
    ,"cuando"   
    ,"cuánta"
    ,"cuántas"
    ,"cuánto"
    ,"cuántos"
    ,"cuarta"
    ,"cuatro"
    ,"cuenta"   
    ,"cuentas"  
    ,"cuerpo"
    ,"cultura"
    ,"cuota"    
    ,"cursos"   
    ,"cuya"
    ,"cuyo"
    ,"dado"    
    ,"datos"    
    ,"debe"
    ,"deben"
    ,"debito"   
    ,"débitos"  
    ,"decir"
    ,"decreto"  
    ,"decretos" 
    ,"décuple"
    ,"deducibles"   
    ,"defensor" 
    ,"definición"   
    ,"definiciones"    
    ,"delima"   
    ,"demás"
    ,"demasiados"
    ,"dentro"
    ,"derecho"
    ,"desarrollo"
    ,"desbloqueo"   
    ,"descarga" 
    ,"descripcion"  
    ,"descuento"    
    ,"descuentos"   
    ,"desde"
    ,"después"
    ,"deuda"    
    ,"devolución"    
    ,"días"
    ,"dice"
    ,"dicho"
    ,"diez"
    ,"diferentes"
    ,"difícil"
    ,"dijo"
    ,"diligenciamiento" 
    ,"dinero"    
    ,"dios"
    ,"dirección"
    ,"direccionamiento" 
    ,"director"
    ,"directorio"   
    ,"distribucion" 
    ,"doble"
    ,"doce"
    ,"documentacion"    
    ,"documentos"    
    ,"dónde"    
    ,"durante"
    ,"edad"
    ,"educación"
    ,"efecto"
    ,"ejemplo"
    ,"eliminación"  
    ,"ella"
    ,"ellas"
    ,"ello"
    ,"ellos"
    ,"embargo"
    ,"emision"  
    ,"empresa"
    ,"empresas" 
    ,"encuesta" 
    ,"endoso"   
    ,"enfoque"  
    ,"entonces"
    ,"entre"
    ,"entrega"  
    ,"envio59"
    ,"equipo"    
    ,"eran"
    ,"error"    
    ,"errores"      
    ,"esas"
    ,"escalamiento" 
    ,"escalamientos"    
    ,"escasos"        
    ,"esos"
    ,"espacio"
    ,"españa"
    ,"español"
    ,"española"
    ,"especial" 
    ,"especialidades"   
    ,"esquema"  
    ,"esta"
    ,"está"
    ,"estaba"
    ,"estaban"
    ,"estado"
    ,"estado"   
    ,"estados"  
    ,"están"
    ,"estar"
    ,"estas"
    ,"éste"
    ,"esto"
    ,"estos"
    ,"estoy"
    ,"estrategia"   
    ,"estructura"   
    ,"estudio"
    ,"evaluacion"   
    ,"evento"   
    ,"eventos"  
    ,"evidente" 
    ,"exámenes" 
    ,"exclusiones"  
    ,"existe"
    ,"expedicion"   
    ,"extensiones"  
    ,"extracto" 
    ,"extractos"    
    ,"factoring"    
    ,"fallas"   
    ,"falta"
    ,"familia"
    ,"fecha"    
    ,"fechas"   
    ,"feria"    
    ,"festival" 
    ,"figura"    
    ,"final"
    ,"financiacion" 
    ,"flash"    
    ,"flash:"   
    ,"fondo"    
    ,"forma"    
    ,"formas"   
    ,"formato"  
    ,"formatos" 
    ,"frente"    
    ,"fuera"
    ,"fueron"
    ,"fuerza"
    ,"funciones"    
    ,"fusión"   
    ,"futuro"
    ,"generacion"   
    ,"general"
    ,"generalidades"    
    ,"gente"
    ,"gestion"  
    ,"giros"    
    ,"glosario" 
    ,"gobierno"
    ,"gonzález"
    ,"gran"
    ,"grandes"
    ,"grupo"
    ,"grupos"
    ,"guerra"
    ,"guía" 
    ,"guias"    
    ,"guion"    
    ,"guiones"  
    ,"haber"
    ,"había"
    ,"habían"
    ,"hablar"
    ,"hablemos,"    
    ,"hace"
    ,"hacer"
    ,"hacia"
    ,"hacía"    
    ,"hasta"    
    ,"haya"
    ,"hecho"
    ,"hemos"
    ,"herramienta"  
    ,"hijo"
    ,"historia" 
    ,"historial"    
    ,"historico"    
    ,"hizo"
    ,"hoja" 
    ,"hombre"
    ,"hombres"
    ,"hora"
    ,"horario"  
    ,"horarios" 
    ,"horas"    
    ,"hubiera"    
    ,"idea"
    ,"identificación"   
    ,"igual"
    ,"imagen"
    ,"importante"   
    ,"impreso"  
    ,"impuesto" 
    ,"incentivo"    
    ,"incidente"    
    ,"incluso"
    ,"inconveniente"    
    ,"inconvenientes"   
    ,"incremento"   
    ,"indicativos"  
    ,"índice"   
    ,"información"
    ,"informe"  
    ,"ingreso"  
    ,"inscripción"  
    ,"instalacion"  
    ,"instituciones"    
    ,"instrucciones"    
    ,"instructivo"  
    ,"instructivos" 
    ,"interés"
    ,"interior"
    ,"internacional"
    ,"inventario"   
    ,"investigación"
    ,"invitacion"               
    ,"josé"
    ,"joven"
    ,"juan"
    ,"juego"    
    ,"julio"
    ,"junto"      
    ,"lado"
    ,"lanzamiento"  
    ,"largo"          
    ,"leasing"      
    ,"levantamiento"           
    ,"libertad"
    ,"libro"
    ,"licencia" 
    ,"licuadora"    
    ,"linea"    
    ,"lineas"   
    ,"liquidacion"  
    ,"lista"    
    ,"listado"  
    ,"llamada"  
    ,"llamadas" 
    ,"llegar"
    ,"llegó"    
      
    ,"luego"
    ,"lugar"
    ,"luis"    
    ,"madre"
    ,"manejo"   
    ,"manera"
    ,"mano"
    ,"manos"
    ,"mantenimiento"    
    ,"manual"   
    ,"manuales" 
    ,"mañana"
    ,"mapa" 
    ,"marcación"    
    ,"maría"    
    ,"matriz"   
    ,"mayor"
    ,"mayoría"
    ,"media"
    ,"mediante"
    ,"medicamentos" 
    ,"medicina" 
    ,"medicos"  
    ,"medida"
    ,"medio"
    ,"medios"
    ,"mejor"
    ,"menos"
    ,"mensajes" 
    ,"menu" 
    ,"mercado"    
    ,"meses"
    ,"métodos"  
    ,"méxico"
    ,"miembros"
    ,"mientras"
    ,"migracion"        
    ,"millones"
    ,"ministro"
    ,"minutos"    
    ,"misma"
    ,"mismo"
    ,"modelo"   
    ,"modificación" 
    ,"modificaciones"   
    ,"modo"
    ,"modulo"   
    ,"momento"
    ,"motivos"  
    ,"movimiento"
    ,"mucha"
    ,"muchas"
    ,"mucho"
    ,"muchos"
    ,"muerte"
    ,"mujer"
    ,"mujeres"
    ,"multicase"    
    ,"multiconsulta"    
    ,"mundo"
    ,"música"    
    ,"nacional"
    ,"nada"
    ,"nadie"
    ,"navegacion"   
    ,"necesario"
    ,"necesidad"
    ,"negociacion"              
    ,"ningún"
    ,"ninguna"
    ,"ninguno"
    ,"niño"
    ,"niños"      
    ,"nivel"
    ,"noche"
    ,"nombre"
    ,"nónuple"
    ,"normas"   
    ,"normatividad"     
    ,"nosotros"
    ,"notas"    
    ,"noti" 
    ,"notificacion" 
    ,"novedad"  
    ,"novedades"  
    ,"nuestra"
    ,"nuestro"
    ,"nuestros"
    ,"nueva"
    ,"nueva"    
    ,"nuevas"
    ,"nuevas"   
    ,"nueve"
    ,"nuevo"
    ,"nuevo"    
    ,"nuevos"
    ,"nuevos"   
    ,"número"
    ,"número"   
    ,"números"  
    ,"nunca"
    ,"objeciones"   
    ,"obra"
    ,"obras"
    ,"observaciones"    
    ,"ocho"
    ,"óctuple"
    ,"odontología"  
    ,"oferta"   
    ,"ofertas"  
    ,"oficinas" 
    ,"ojos"
    ,"olla" 
    ,"once"
    ,"opcion"   
    ,"opciones" 
    ,"operaciones"  
    ,"operadores"   
    ,"orbitel"  
    ,"orden"
    ,"organización"
    ,"otra"
    ,"otras"    
    ,"otro"
    ,"otros"
    ,"otros"          
    ,"pacientes"    
    ,"padre"
    ,"página"   
    ,"páginas"  
    ,"pago" 
    ,"pagos"    
    ,"país"
    ,"países"
    ,"palabras"
    ,"pamd" 
    ,"papel"
    ,"paquete"  
    ,"paquetes" 
    ,"para" 
    ,"parametrización"  
    ,"parece"
    ,"parte"
    ,"partido"
    ,"partir"
    ,"pasa"
    ,"pasado"
    ,"paso" 
    ,"pasos"        
    ,"pedido"   
    ,"pensión"  
    ,"pérdida"  
    ,"perfil"   
    ,"perfiles" 
    ,"pero"
    ,"persona"
    ,"personal" 
    ,"personas" 
    ,"pesar"
    ,"pesetas"
    ,"pico" 
    ,"piloto"   
    ,"plan" 
    ,"planeación"   
    ,"planes"   
    ,"planilla" 
    ,"plantilla"    
    ,"plantillas"   
    ,"plus" 
    ,"población"
    ,"poco"
    ,"pocos"
    ,"poder"
    ,"podía"
    ,"podría"
    ,"policía"
    ,"política" 
    ,"políticas"    
    ,"político"
    ,"poliza"   
    ,"polizas"      
    ,"porque"
    ,"portadas" 
    ,"portafolio"   
    ,"portafolio:"  
    ,"portal"   
    ,"posibilidad"
    ,"posible"
    ,"precios"  
    ,"preguntas"    
    ,"premios"  
    ,"presencia"
    ,"presentacion" 
    ,"presentaciones"   
    ,"presidente"
    ,"preturno" 
    ,"preturnos"    
    ,"primer"
    ,"primera"
    ,"primero"
    ,"primeros"
    ,"principio"
    ,"problema"
    ,"problemas"    
    ,"procedimiento"    
    ,"procedimientos"   
    ,"proceso"  
    ,"procesos" 
    ,"producción"
    ,"producto" 
    ,"productos"    
    ,"programa"
    ,"progracion" 
    ,"programas"    
    ,"promocion"    
    ,"promociones"  
    ,"pronto"
    ,"propia"
    ,"propio"
    ,"protección"   
    ,"protocolo"    
    ,"proveedor"    
    ,"proveedores"  
    ,"proyecto" 
    ,"prueba"   
    ,"pruebas"  
    ,"público"
    ,"pueblo"
    ,"puede"
    ,"pueden"
    ,"puerta"
    ,"pues"
    ,"puesto"
    ,"punto"
    ,"puntos"
    ,"queja"    
    ,"quejas"   
    ,"quién"
    ,"quiénes"
    ,"quiere"
    ,"quinta"
    ,"quinto"
    ,"quíntuple"
    ,"radicación"   
    ,"razón"
    ,"real"
    ,"realidad"
    ,"recaudo"  
    ,"recaudos" 
    ,"reclamacion"  
    ,"reclamaciones"    
    ,"reclamos" 
    ,"recomendaciones"  
    ,"reconocimiento"   
    ,"recuperacion"       
    ,"rediseño" 
    ,"referidos"    
    ,"reforma"  
    ,"registro" 
    ,"reglas"   
    ,"reintegro"    
    ,"relación"
    ,"relaciones"
    ,"renovación"   
    ,"renta"    
    ,"rentabilidad" 
    ,"reporte"  
    ,"reportes" 
    ,"requisitos"   
    ,"resolucion"   
    ,"respecto"
    ,"respuesta"    
    ,"resultados"
    ,"resumen"  
    ,"retención"    
    ,"retiro"   
    ,"retiros"  
    ,"revisión" 
    ,"revista"  
    ,"ruta" 
    ,"rutas"    
    ,"sabe"
    ,"saber"
    ,"salario"  
    ,"saldos"   
    ,"salud"    
    ,"sector"
    ,"sedes"    
    ,"según"
    ,"segunda"
    ,"segundo"
    ,"seguridad"
    ,"seguro"   
    ,"seguros"  
    ,"seis"
    ,"semana"
    ,"sentido"
    ,"señor"
    ,"séptima"
    ,"séptimo"
    ,"séptuple"    
    ,"sera"
    ,"será"
    ,"sería"
    ,"serie"
    ,"servicio" 
    ,"servicios"         
    ,"sexta"
    ,"sexto"
    ,"séxtuple"
    ,"sido"
    ,"siempre"
    ,"siendo"
    ,"siete"
    ,"siglo"
    ,"sigue"
    ,"siguiente"    
    ,"siniestros"   
    ,"sino"
    ,"sistema"  
    ,"situación"
    ,"sobre"
    ,"social"
    ,"sociedad"
    ,"solicitud"    
    ,"solicitudes"  
    ,"solo"
    ,"solución"     
    ,"soporte"      
    ,"sucursal" 
    ,"sucursales"       
    ,"suspension"   
    ,"tabla"        
    ,"talleres" 
    ,"también"
    ,"tampoco"    
    ,"tanto"
    ,"tantos"
    ,"tarde"
    ,"tarifa"   
    ,"tarifas"  
    ,"tarjeta"  
    ,"tarjetas" 
    ,"tasa" 
    ,"tasas"          
    ,"telefonos"    
    ,"telemercadeo" 
    ,"tema"
    ,"temporada"    
    ,"tener"
    ,"tengo"
    ,"tenía"
    ,"tercer"
    ,"tercera"
    ,"tercero"
    ,"tercio"
    ,"terminologia" 
    ,"tiempo"
    ,"tiempos"  
    ,"tiene"
    ,"tienen"
    ,"tierra"
    ,"tipificación" 
    ,"tipo"
    ,"tipos"    
    ,"tips" 
    ,"toda"
    ,"todas"
    ,"todavía"
    ,"todo"
    ,"todos"
    ,"toma" 
    ,"topes"    
    ,"total"
    ,"trabajo"
    ,"tramite"  
    ,"tramites" 
    ,"transacciones"    
    ,"transferencia"    
    ,"transferencias"   
    ,"transpromo"   
    ,"tras"
    ,"traslado" 
    ,"traslados"    
    ,"trata"
    ,"través"
    ,"tres"
    ,"triple"
    ,"turnos"   
    ,"tuvo"
    ,"ubicacion"    
    ,"última"
    ,"último"
    ,"últimos"    
    ,"unas"
    ,"único"
    ,"unidos"    
    ,"unos"
    ,"urgencias"    
    ,"usted"
    ,"usuarios" 
    ,"validación"   
    ,"validaciones" 
    ,"valor"
    ,"valores"      
    ,"varios"
    ,"veces"
    ,"vehículos"    
    ,"venta"        
    ,"verdad"
    ,"verificacion"     
    ,"vida"
    ,"vigencia" 
    ,"vista"
    ,"visto"
    ,"vivamos:" 
    ,"volante"      
    ,"zona"
    ,"zonas"    
]}
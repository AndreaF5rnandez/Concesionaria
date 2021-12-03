let autos = require("./autos");
const concesionaria = {
   nombre: '',
   autos : autos,
   buscarAuto: function(patente){
            let encontrado = null
            autos.forEach(function(elemento){
                  if(elemento.patente == patente){
                      encontrado = elemento
                  }
             })
          return encontrado
 },
venderAuto: function(paten){
  let autoVendido = this.buscarAuto(paten);
   if (autoVendido != null){
      autoVendido.vendido = true;
   }
   return autoVendido;
},
autosParaLaVenta: function (){
     let lista = autos.filter(function(item){
      if (item.vendido == false){
         return item;
      }
   })
   return lista;
},
autosNuevos: function(){
   let aux = this.autosParaLaVenta()
   let ceroKm = aux.filter(function(punt){
      if(punt.km < 100){
            return punt;
      }
   })
   return ceroKm;
 },
  listaDeVentas: function(){
   let array = [0];
   for( let i=0; i < autos.length; i++){
    if (autos[i].vendido == true){
      array.push(autos[i].precio);
     }
   }
   return array;
  },
  totalDeVentas: function(){
    let vendidos = this.listaDeVentas();
    let suma = vendidos.reduce(function(acum, num){
       return acum + num;
    });
    return suma;
 },
 puedeComprar: function(auto,persona){
       let puede = false 
       let cosTotal = persona.capacidadDePagoTotal - auto.precio
       let capacidadEnCuotas = persona.capacidadDePagoEnCuotas - (auto.precio / auto.cuotas)
       if(cosTotal >= 0 && capacidadEnCuotas >= 0){
           puede = true
       }
       return puede
   },
   autosQuePuedeComprar: function(persona){
      let autosDisponibles = this.autosParaLaVenta();
      let autosDeCompra =[]; 
      autosDisponibles.forEach(function(punt){
            let verificar = concesionaria.puedeComprar(punt,persona)
            if(verificar == true){
               autosDeCompra.push(punt)
            }
      })
      return autosDeCompra;
   }
 }
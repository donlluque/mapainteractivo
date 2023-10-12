import MapaInteractivo from "@usig-gcba/mapa-interactivo";

let map = new MapaInteractivo("map", {
  preferCanvas: true,
  language: "en",
  attributionControl: true,
  onLayerLoaded: function (layerName, layerId) {
    console.log(layerName, layerId);
  },
  onContextMenu: onContextMenu,
});

function addLayerEstacionamientos() {
  map.addPublicLayer("estacionamiento_en_via_publica", {
    callAPIOnClick: true,
    onClickAPI:
      "https://geoserver-dev.gcba.gob.ar/geoserver/mapa_base/wms?service=WMS&version=1.1.0&request=GetMap&layers=mapa_base%3APruebas_Nela&bbox=83881.74028961881%2C73042.87100946742%2C173934.3160413844%2C141156.19689432532&width=768&height=580&srs=EPSG%3A9498&styles=&format=application/openlayers",
    baseLayer: {
      uri: "https://geoserver-dev.gcba.gob.ar/geoserver/mapa_base/wms?service=WMS&version=1.1.0&request=GetMap&layers=mapa_base%3APruebas_Nela&bbox=83881.74028961881%2C73042.87100946742%2C173934.3160413844%2C141156.19689432532&width=768&height=580&srs=EPSG%3A9498&styles=&format=application/openlayers",
    },
  });
}

function addLayer(id) {
  map.addPublicLayer(id, { clustering: true });
}
function onContextMenu(ev) {
  const id = map.addMarker(ev.latlng, true, false, false, false, false, {
    iconUrl:
      "https://static.usig.buenosaires.gob.ar/symbols/bases_extrahospitalarias.png",
  });
}

function getImage() {
  map.getStaticImage().then((canvas) => {
    var img = document.createElement("img");
    var dimensions = map.getMapa().getSize();
    img.width = dimensions.x;
    img.height = dimensions.y;
    img.src = canvas.toDataURL();
    document.getElementById("images").innerHTML = "";
    document.getElementById("images").appendChild(img);
  });
}
module.exports = {
  addLayerEstacionamientos: addLayerEstacionamientos,
  addLayer: addLayer,
  map,
};
//  setTimeout(() => {
//    map.removePublicLayer("estacionamiento_en_via_publica");
//    map.addPublicLayer("cajeros_automaticos", {clustering: true});
//  }, 10000)

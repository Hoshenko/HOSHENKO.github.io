console.log("aboba"); 
// Рандомний глітч ефект для іконок Соціалок
document.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('.all-links li img');           
  // 3 кольори для ефекту
  const colors = ['rgba(255, 0, 128, 0.3)','rgba(255, 149, 0, 0.3)','rgba(5, 5, 25, 0.3)']; 
  const c = document.createElement('canvas');                              
  const ctx = c.getContext('2d');                                         
  Object.assign(c.style, { position:'fixed', pointerEvents:'none', zIndex:9999 }); 
  document.body.appendChild(c);                                          

  let timer = null;           // зупинка таймера                                            

  function start(img){                                                 
    const r = img.getBoundingClientRect();                               
    c.width = Math.round(r.width);                                       
    c.height = Math.round(r.height);                                  
    c.style.left = r.left + 'px';                                         
    c.style.top = r.top + 'px';                                          
// тут робиться очищення і створення нових полосок
    timer = setInterval(() => {                                         
      ctx.clearRect(0,0,c.width,c.height);                               
      for (let i = 0; i < 5; i++) {                                     
        ctx.fillStyle = colors[Math.random()*colors.length | 0];          
        const y = Math.random() * c.height;                             
        const h = 1 + Math.random() * 1;                // висота полоси
        const w = 30 + Math.random() * (c.width - 30);  // ширина полоси
        const x = Math.random() * (c.width - w);        // случайна позиція по горизонталі
        ctx.fillRect(x, y, w, h);                       // малюем полоски                           
      }
    }, 80);                                                          
  }

  function stop(){                                                     
    clearInterval(timer);
    ctx.clearRect(0,0,c.width,c.height);            
  }
// Ефект від наведення і вбирання Мишки
  imgs.forEach(img => {                                                  
    img.addEventListener('mouseenter', () => start(img));                  
    img.addEventListener('mouseleave', stop);                               
  });
});
//Радіальний градіент фону і живий шум
document.addEventListener('DOMContentLoaded', () => {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  Object.assign(c.style, { 
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: -1   // на задний план
  });
  document.body.appendChild(c);

  // функція ресайза під вікно
  function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // анимація
  function draw() {
    ctx.clearRect(0,0,c.width,c.height);

    // Центральний радіальный градієнт 
    const gradient = ctx.createRadialGradient(
      c.width/2, c.height/2, 0,
      c.width/2, c.height/2, c.width/1.2
    );
    gradient.addColorStop(0, 'rgba(163, 0, 30, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,c.width,c.height);

    // Живий шум ===
    const imgData = ctx.getImageData(0, 0, c.width, c.height);
    const buffer = imgData.data;
    for (let i = 0; i < buffer.length; i += 4) {
      if (Math.random() < 0.07) { // плотность шума (0.00%)
        const shade = Math.random() * 255;
        buffer[i] = shade;
        buffer[i+1] = shade;
        buffer[i+2] = shade;
        buffer[i+3] = 40; // прозрачность
      }
    }
    ctx.putImageData(imgData, 0, 0);

    requestAnimationFrame(draw);
  }

  draw();
});


function toggleVisibility_win(e,t){document.getElementById(e).style.display=t?"block":"none"}function toggleVisibility(e,t){document.getElementById(e).style.display=t?"block":"none"}document.addEventListener("DOMContentLoaded",()=>{let i=JSON.parse(localStorage.getItem("alarms"))||[],l=0,d=null,n=null;var e=document.querySelector(".addAlarmButton");let s=document.querySelector("#btnCancelar"),m=document.querySelector("#btnCrear");function c(e){if(!e)return"";let[t,n]=e.split(":");e=12<=(t=parseInt(t,10))?"PM":"AM";return`${t=(t%=12)||12}:${n=n.padStart(2,"0")} `+e}function a(e){if(!e)return"";var[e,t]=e.split(" ");let[n,o]=e.split(":");return n=parseInt(n,10),"PM"===t&&12!==n&&(n+=12),n=(n="AM"===t&&12===n?0:n).toString().padStart(2,"0"),o=o.padStart(2,"0"),n+":"+o}function u(o){var e=document.getElementById("alarmList"),t=document.createElement("li");t.setAttribute("data-id",o.id);o.repeat={once:"Una sola vez",daily:"Diariamente",weekdays:"Lunes a viernes"}[o.repeat]||o.repeat,t.innerHTML=`
            <div>
                <span class="etiquetaTime">${o.label} </span>
                <section class="session-time">
                    <span class="timeHMT">${c(o.time)}</span>
                    <span class="timeExt">${o.repeat}</span>
                </section>
            </div>
            <div class="session-button">
                <button class="button is-info edit-button">Editar</button>
                <button class="button status-button ${o.active?"is-warning":"is-success"} toggle-button">${o.active?"Apagar":"Encender"}</button>
                <button class="button is-danger delete-button">Eliminar</button>
            </div>
        `,o.repeat={"Una sola vez":"once",Diariamente:"daily","Lunes a viernes":"weekdays"}[o.repeat]||o.repeat,t.querySelector(".edit-button").addEventListener("click",()=>{var t,e;t=o.id,(e=i.find(e=>e.id===t))&&(document.querySelector("#alarmInputTime").value=a(e.time),document.querySelector('select[name="soundSelect"]').value=e.sound,document.querySelector('select[name="repeatSelect"]').value=e.repeat,document.querySelector("#autoDelete").checked=e.autoDelete,document.querySelector("#alarmLabel").value=e.label||"",document.querySelector(".button.addAlarmButton").classList.add("expanded"),document.querySelector("#AddAlarm").classList.add("visible"),document.getElementById("Alarma-Programas").scrollTop=document.getElementById("Alarma-Programas").scrollHeight,l=1,d=t,m.value="Guardar",m.classList.remove("is-primary"),m.classList.add("is-info"),s)&&s.classList.remove("hidden")}),t.querySelector(".delete-button").addEventListener("click",()=>r(o.id)),t.querySelector(".toggle-button").addEventListener("click",()=>{var t,e,n;t=o.id,(e=i.find(e=>e.id===t))&&(e.active=!e.active,(n=document.querySelector(`li[data-id="${t}"] .toggle-button`)).textContent=e.active?"Apagar":"Encender",n.classList.toggle("is-warning",e.active),n.classList.toggle("is-success",!e.active),localStorage.setItem("alarms",JSON.stringify(i)))}),e.appendChild(t)}function r(t){i=i.filter(e=>e.id!==t);var e=document.querySelector(`li[data-id="${t}"]`);e&&e.remove(),localStorage.setItem("alarms",JSON.stringify(i))}function g(){document.querySelector(".button.addAlarmButton").classList.remove("expanded"),document.querySelector("#AddAlarm").classList.remove("visible"),document.getElementById("Alarma-Programas").scrollTop=0}function o(e,t){n=n||setInterval(()=>{new Audio(e).play()},t)}document.querySelector("#alarmTime")&&!function e(t){var n=new Date;var o=n.getHours();var a=n.getMinutes();var r=n.getSeconds();var i="AM";0===o?o=12:12<o&&(o-=12,i="PM");o=o.toString().padStart(2,"0");a=a.toString().padStart(2,"0");r=r.toString().padStart(2,"0");r=r%2==0?":":"<span class='color_fondo'>:</span>";o=o+r+a+" "+i;r=n.getHours().toString().padStart(2,"0")+":"+a;i=document.getElementById(t);n=document.getElementById("alarmInputTimeHidden");i?(i.innerHTML=o,n.value=r):console.error(`Element with id "${t}" not found.`);setTimeout(function(){e(t)},1e3)}("alarmTime"),i.forEach(e=>u(e)),setInterval(function(){let e=new Date,t=e.toTimeString().substring(0,5);i.forEach(e=>{e.active&&e.time===a(t)&&("beep"===e.sound?o("./song/SD_ALERT_29.mp3",1e3):"ring"===e.sound&&o("./song/mario-bros-die.mp3",1e3),mostrarModal(`🕑 Alarma: ${e.label} 🕑`,"¡Alarma activada!","Simple").then(e=>{e&&n&&(clearInterval(n),n=null)}),e.autoDelete)&&r(e.id)})},6e4),e&&e.addEventListener("click",()=>{0===l&&(document.getElementById("alarmInputTime").value=a(document.getElementById("alarmInputTimeHidden").value),document.querySelector(".button.addAlarmButton").classList.add("expanded"),document.querySelector("#AddAlarm").classList.add("visible"),document.getElementById("Alarma-Programas").scrollTop=document.getElementById("Alarma-Programas").scrollHeight,l=1,d=null,m.value="Crear",m.classList.remove("is-info"),m.classList.add("is-primary"),s)&&s.classList.remove("hidden")}),s&&s.addEventListener("click",()=>{g(),setTimeout(()=>{l=0,d=null,m.value="Crear",m.classList.remove("is-info"),m.classList.add("is-primary"),s&&s.classList.add("hidden")},500)}),m&&m.addEventListener("click",()=>{var e,t=document.querySelector("#alarmInputTime").value,n=document.querySelector('select[name="soundSelect"]').value,o=document.querySelector('select[name="repeatSelect"]').value,a=document.querySelector("#autoDelete").checked,r=document.querySelector("#alarmLabel").value||"Nueva Alarma",n=(c(t),{label:r,time:t,repeat:o,sound:n,autoDelete:a,active:!0});d?-1<(a=i.findIndex(e=>e.id===d))&&(i[a]={id:d,...n},(e=document.querySelector(`li[data-id="${d}"]`)).querySelector(".etiquetaTime").textContent=r,e.querySelector(".timeHMT").textContent=c(t),r={once:"Una sola vez",daily:"Diariamente",weekdays:"Lunes a viernes"}[o]||o,e.querySelector(".timeExt").textContent=r,e.querySelector(".toggle-button").textContent=i[a].active?"Apagar":"Encender",e.querySelector(".toggle-button").classList.toggle("is-warning",i[a].active),e.querySelector(".toggle-button").classList.toggle("is-success",!i[a].active),localStorage.setItem("alarms",JSON.stringify(i)),d=null,m.value="Crear",m.classList.remove("is-info"),m.classList.add("is-primary"),s)&&s.classList.add("hidden"):(t={id:Date.now(),...n},i.push(t),u(t),localStorage.setItem("alarms",JSON.stringify(i))),g(),setTimeout(()=>{l=0},500)})}),document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("myModal000");var t=document.getElementById("Pomodoro");let n=document.getElementById("myModal06");var o=document.getElementById("cerrarModal06").querySelector("p"),a=document.getElementById("Alarma");let r=document.getElementById("myModal07");var i=document.getElementById("cerrarModal07").querySelector("p");t&&(t.addEventListener("click",()=>{e.classList.remove("visible"),e.classList.toggle("hidden"),toggleVisibility_win("myModal06",1),n.classList.toggle("visible"),n.classList.remove("hidden")}),t.style.backgroundImage="url('./images/Component-lanzador/pomodoro.png')"),o&&o.addEventListener("click",()=>{n.classList.remove("hidden"),n.classList.toggle("visible")}),a&&(a.addEventListener("click",()=>{e.classList.remove("visible"),e.classList.toggle("hidden"),toggleVisibility_win("myModal06",1),r.classList.toggle("visible"),r.classList.remove("hidden")}),a.style.backgroundImage="url('./images/Component-lanzador/alarma.png')"),i&&i.addEventListener("click",()=>{r.classList.remove("hidden"),r.classList.toggle("visible")})}),document.addEventListener("DOMContentLoaded",()=>{var e=document.getElementById("openCalendar");e&&e.addEventListener("click",()=>{var e=document.getElementById("rf-Programas01"),t=document.getElementById("re-Programas01");e&&(e.checked=!e.checked,!e.checked&&t&&(t.checked=!0),toggleVisibility("myModal02",e.checked))})});let isButtonVisible=!0;function toggleButtonVisibility(){var e=document.getElementById("miniPomodoro"),t=document.getElementById("myModal06");e.style.display="none",t.classList.remove("hidden"),t.classList.toggle("visible"),isButtonVisible=!isButtonVisible}document.getElementById("miniPomodoro").addEventListener("click",toggleButtonVisibility),document.addEventListener("DOMContentLoaded",function(){var e=(new Date).getDay(),t=document.getElementById("component-day");t&&(t.innerHTML=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"][e])});let wrapper=document.querySelector(".usermenu"),children=document.querySelectorAll(".usermenu a"),noOfCircles=children.length,degreeAngle=360/noOfCircles,currAngle=0;for(var i=0;i<noOfCircles;i++)currAngle+=degreeAngle,setDiv(children[i],currAngle);function setDiv(e,t){e.classList.add("circle"),e.setAttribute("data-angle",t+250),e.style.transform="rotate("+(t+260)+"deg) translate(0) rotate(-"+(t+260)+"deg)"}function toggle(e,t=!1){let n=document.querySelectorAll(".usermenu a"),o,a=0,r=0,i;for(i=t?".3s":"0s",e&&(r="5em",i="0s"),a;n.length>a;a++)o=n[a].getAttribute("data-angle"),n[a].style.transition="transform 0.3s ease-out "+i,n[a].style.transform="rotate("+o+"deg) translate("+r+") rotate(-"+o+"deg)"}wrapper.addEventListener("mouseover",()=>{toggle(!0,!0)}),wrapper.addEventListener("mouseout",()=>{toggle(!1,!0)});let state=!1,links=(wrapper.addEventListener("touchstart",e=>{if(e.target.classList.contains("circle"))return!1;toggle(state=!state)}),document.querySelectorAll(".usermenu a")),targetDiv=document.querySelector(".usermenu > div");function changeBackgroundImage(e){targetDiv.style.backgroundImage=`url(${e})`}fetch("programs.json").then(e=>e.json()).then(n=>{Object.keys(n).forEach(e=>{let t=n[e];e=document.querySelector("a."+e);e&&t.image&&(e.style.backgroundImage=`url(${t.image})`,e.addEventListener("mouseover",()=>{changeBackgroundImage(t.image)}),e.addEventListener("mouseout",()=>{targetDiv.style.backgroundImage=""}))})}).catch(e=>{console.error("Error al cargar el archivo JSON:",e)});let objOn=document.getElementById("obj-on"),objOff=document.getElementById("obj-off");function toggleVisibility_Lector(){"block"===objOff.style.display?(objOn.style.display="block",objOff.style.display="none",setTimeout(()=>{objOn.style.display="none",objOff.style.display="block"},3e4)):(objOn.style.display="none",objOff.style.display="block")}objOff.style.display="block",objOn.addEventListener("click",toggleVisibility_Lector),objOff.addEventListener("click",toggleVisibility_Lector);let workTime=40,breakTime=10,longBreakTime=30,sessions=0,totalWorkTime=0,timerRunning=!1,timerType="work",remainingTime=60*workTime,freeBreakMode=!1,timerInterval;function formatTime(e){var t=Math.floor(e/60);return e%=60,String(t).padStart(2,"0")+":"+String(e).padStart(2,"0")}function updateTimerDisplay(){document.getElementById("timer_pomodoro").textContent=formatTime(remainingTime)}function updateTimer(){timerRunning&&(0<remainingTime?(--remainingTime,updateTimerDisplay(),timerInterval=setTimeout(updateTimer,1e3)):(playSound(),setTimeout(()=>{(freeBreakMode?startFreeBreak:askForActivityChange)()},1e3)))}function startTimer(){document.getElementById("title_pomodoro").textContent="🔰 Trabajando... 🔰",timerRunning||(freeBreakMode&&(freeBreakMode=!1,document.getElementById("start").textContent="Iniciar"),timerRunning=!0,updateTimer())}function stopTimer(){clearTimeout(timerInterval),timerRunning=!1}function resetTimer(){stopTimer(),document.getElementById("title_pomodoro").textContent="🍅 Pomodoro Timer 🍅",remainingTime="work"===timerType?60*workTime:60*breakTime,updateTimerDisplay()}function startFreeBreak(){document.getElementById("title_pomodoro").textContent="🔰 Descanso 🔰",(freeBreakMode?startTimer:(stopTimer(),freeBreakMode=!0,document.getElementById("start").textContent="Iniciar Descanso",remainingTime=60*breakTime,updateTimerDisplay))()}function askForActivityChange(){timerType="work"===timerType?"trabajo":"descanso",mostrarModal("🍅 Pomodoro Timer 🍅",`¿Deseas cambiar de ${timerType} a ${"trabajo"===timerType?"descanso":"trabajo"}?`).then(e=>{(e?(timerType="work",switchMode(),updateTimer):(timerType="break",resetTimer))()})}function switchMode(){"work"===timerType?(document.getElementById("title_pomodoro").textContent="🔰 Descanso 🔰",2===sessions?(remainingTime=60*longBreakTime,sessions=0):(remainingTime=60*breakTime,sessions+=1),document.getElementById("breakStatus").textContent="Descansos: "+sessions,totalWorkTime+=workTime,document.getElementById("workStatus").textContent="Horas de trabajo: "+totalWorkTime,timerType="break"):(timerType="work",document.getElementById("title_pomodoro").textContent="🔰 Trabajando... 🔰",remainingTime=60*workTime)}function playSound(){new Audio("work"===timerType?"./song/SD_ALERT_29.mp3":"./song/mario-bros-die.mp3").play()}function updateTimes(){workTime=parseInt(document.getElementById("workTime").value,10),breakTime=parseInt(document.getElementById("breakTime").value,10),resetTimer()}function minimizar_pomodoro(){var e=document.getElementById("minimizar_pomodoro"),t=document.getElementById("myModal06");let n=document.getElementById("miniPomodoro");document.getElementById("timer_pomodoro").textContent;e&&(t.classList.remove("hidden"),t.classList.toggle("visible"),n.style.display="block",setInterval(function(){var e=document.getElementById("timer_pomodoro").textContent;n.textContent="🍅 "+e},1e3))}document.addEventListener("DOMContentLoaded",()=>{updateTimerDisplay(),document.getElementById("start").addEventListener("click",startTimer),document.getElementById("stop").addEventListener("click",stopTimer),document.getElementById("reset").addEventListener("click",resetTimer),document.getElementById("freeBreak").addEventListener("click",startFreeBreak),document.getElementById("updateTimes").addEventListener("click",updateTimes),document.getElementById("minimizar_pomodoro").addEventListener("click",minimizar_pomodoro)}),document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("prevMonth"),t=document.getElementById("nextMonth");let v=document.getElementById("monthYear"),p=document.getElementById("days"),n=new Date,b=[{day:1,month:0},{day:1,month:4},{day:20,month:6},{day:7,month:7},{day:25,month:11},{day:25,month:10},{day:2,month:8}];function o(e){var n=e.getFullYear();let o=e.getMonth();var t,a,r,i=new Date,l=(t=n,s=Math.floor,l=t%19,a=s(t/100),l=(r=(r=(a-s(a/4)-s((8*a+13)/25)+19*l+15)%30)-s(r/28)*(1-s(29/(1+r))*s((21-l)/11)))-(t+s(t/4)+r+2-a+s(a/4))%7,r=3+s((40+l)/44),a=28+l-31*s(r/4),new Date(t,r-1,a)),d=[new Date(l.getTime()+33696e5),new Date(l.getTime()+5184e6),new Date(l.getTime()+58752e5),new Date(n,9,8-(new Date(n,9,1).getDay()||7)),new Date(n,10,8-(new Date(n,10,1).getDay()||7)),new Date(n,10,18-(new Date(n,10,11).getDay()||7))],s=(v.textContent=e.toLocaleString("es-ES",{month:"long"}).toUpperCase()+" "+n,p.innerHTML="",new Date(n,o,1).getDay()),m=new Date(n,o+1,0).getDate(),c=0===s?6:s-1;for(let e=0;e<c;e++)p.innerHTML+='<div class="calendar-day-box"></div>';for(let t=1;t<=m;t++){var u=i.getDate()===t&&i.getMonth()===o&&i.getFullYear()===n?"calendar-day-box current-day":"calendar-day-box",g=b.some(e=>e.day===t&&e.month===o),y=d.some(e=>e.getDate()===t&&e.getMonth()===o),g=g||y?u+" holiday":u;p.innerHTML+=`<div class="${g}">${t}</div>`}}e.addEventListener("click",function(){n.setMonth(n.getMonth()-1),o(n)}),t.addEventListener("click",function(){n.setMonth(n.getMonth()+1),o(n)}),o(n)});
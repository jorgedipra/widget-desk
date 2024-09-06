function toggleVisibility_win(e,t){document.getElementById(e).style.display=t?"block":"none"}function toggleVisibility(e,t){document.getElementById(e).style.display=t?"block":"none"}function toggleButtonVisibility(){var e=document.getElementById("miniPomodoro"),t=document.getElementById("myModal06");e.style.display="none",t.classList.remove("hidden"),t.classList.toggle("visible"),isButtonVisible=!isButtonVisible}function showTime(e){var t=new Date,n=t.getHours(),a=t.getMinutes(),o=t.getSeconds(),r="AM",o=(0===n?n=12:12<n&&(n-=12,r="PM"),n=n.toString().padStart(2,"0"),a=a.toString().padStart(2,"0"),(o=o.toString().padStart(2,"0"))%2==0?":":"<span class='color_fondo'>:</span>"),n=n+o+a+" "+r,o=t.getHours().toString().padStart(2,"0")+":"+a,r=document.getElementById(e),t=document.getElementById("alarmInputTimeHidden");r?(r.innerHTML=n,t.value=o):console.error(`Element with id "${e}" not found.`),setTimeout(function(){showTime(e)},1e3)}document.addEventListener("DOMContentLoaded",()=>{let i=JSON.parse(localStorage.getItem("alarms"))||[],l=0,d=null,n=null;var e=document.querySelector(".addAlarmButton");let s=document.querySelector("#btnCancelar"),m=document.querySelector("#btnCrear");function c(e){if(!e)return"";let[t,n]=e.split(":");e=12<=(t=parseInt(t,10))?"PM":"AM";return`${t=(t%=12)||12}:${n=n.padStart(2,"0")} `+e}function o(e){if(!e)return"";var[e,t]=e.split(" ");let[n,a]=e.split(":");return n=parseInt(n,10),"PM"===t&&12!==n&&(n+=12),n=(n="AM"===t&&12===n?0:n).toString().padStart(2,"0"),a=a.padStart(2,"0"),n+":"+a}function u(a){var e=document.getElementById("alarmList"),t=document.createElement("li");t.setAttribute("data-id",a.id);a.repeat={once:"Una sola vez",daily:"Diariamente",weekdays:"Lunes a viernes"}[a.repeat]||a.repeat,t.innerHTML=`
            <div>
                <span class="etiquetaTime">${a.label} </span>
                <section class="session-time">
                    <span class="timeHMT">${c(a.time)}</span>
                    <span class="timeExt">${a.repeat}</span>
                </section>
            </div>
            <div class="session-button">
                <button class="button is-info edit-button">Editar</button>
                <button class="button status-button ${a.active?"is-warning":"is-success"} toggle-button">${a.active?"Apagar":"Encender"}</button>
                <button class="button is-danger delete-button">Eliminar</button>
            </div>
        `,a.repeat={"Una sola vez":"once",Diariamente:"daily","Lunes a viernes":"weekdays"}[a.repeat]||a.repeat,t.querySelector(".edit-button").addEventListener("click",()=>{var t,e;t=a.id,(e=i.find(e=>e.id===t))&&(document.querySelector("#alarmInputTime").value=o(e.time),document.querySelector('select[name="soundSelect"]').value=e.sound,document.querySelector('select[name="repeatSelect"]').value=e.repeat,document.querySelector("#autoDelete").checked=e.autoDelete,document.querySelector("#alarmLabel").value=e.label||"",document.querySelector(".button.addAlarmButton").classList.add("expanded"),document.querySelector("#AddAlarm").classList.add("visible"),document.getElementById("Alarma-Programas").scrollTop=document.getElementById("Alarma-Programas").scrollHeight,l=1,d=t,m.value="Guardar",m.classList.remove("is-primary"),m.classList.add("is-info"),s)&&s.classList.remove("hidden")}),t.querySelector(".delete-button").addEventListener("click",()=>r(a.id)),t.querySelector(".toggle-button").addEventListener("click",()=>{var t,e,n;t=a.id,(e=i.find(e=>e.id===t))&&(e.active=!e.active,(n=document.querySelector(`li[data-id="${t}"] .toggle-button`)).textContent=e.active?"Apagar":"Encender",n.classList.toggle("is-warning",e.active),n.classList.toggle("is-success",!e.active),localStorage.setItem("alarms",JSON.stringify(i)))}),e.appendChild(t)}function r(t){i=i.filter(e=>e.id!==t);var e=document.querySelector(`li[data-id="${t}"]`);e&&e.remove(),localStorage.setItem("alarms",JSON.stringify(i))}function g(){document.querySelector(".button.addAlarmButton").classList.remove("expanded"),document.querySelector("#AddAlarm").classList.remove("visible"),document.getElementById("Alarma-Programas").scrollTop=0}function a(e,t){n=n||setInterval(()=>{new Audio(e).play()},t)}document.querySelector("#alarmTime")&&showTime("alarmTime"),i.forEach(e=>u(e)),setInterval(function(){let e=new Date,t=e.toTimeString().substring(0,5);i.forEach(e=>{e.active&&e.time===o(t)&&("beep"===e.sound?a("./song/SD_ALERT_29.mp3",1e3):"ring"===e.sound&&a("./song/mario-bros-die.mp3",1e3),mostrarModal(`🕑 Alarma: ${e.label} 🕑`,"¡Alarma activada!","Simple").then(e=>{e&&n&&(clearInterval(n),n=null)}),e.autoDelete)&&r(e.id)})},6e4),e&&e.addEventListener("click",()=>{0===l&&(document.getElementById("alarmInputTime").value=o(document.getElementById("alarmInputTimeHidden").value),document.querySelector(".button.addAlarmButton").classList.add("expanded"),document.querySelector("#AddAlarm").classList.add("visible"),document.getElementById("Alarma-Programas").scrollTop=document.getElementById("Alarma-Programas").scrollHeight,l=1,d=null,m.value="Crear",m.classList.remove("is-info"),m.classList.add("is-primary"),s)&&s.classList.remove("hidden")}),s&&s.addEventListener("click",()=>{g(),setTimeout(()=>{l=0,d=null,m.value="Crear",m.classList.remove("is-info"),m.classList.add("is-primary"),s&&s.classList.add("hidden")},500)}),m&&m.addEventListener("click",()=>{var e,t=document.querySelector("#alarmInputTime").value,n=document.querySelector('select[name="soundSelect"]').value,a=document.querySelector('select[name="repeatSelect"]').value,o=document.querySelector("#autoDelete").checked,r=document.querySelector("#alarmLabel").value||"Nueva Alarma",n=(c(t),{label:r,time:t,repeat:a,sound:n,autoDelete:o,active:!0});d?-1<(o=i.findIndex(e=>e.id===d))&&(i[o]={id:d,...n},(e=document.querySelector(`li[data-id="${d}"]`)).querySelector(".etiquetaTime").textContent=r,e.querySelector(".timeHMT").textContent=c(t),r={once:"Una sola vez",daily:"Diariamente",weekdays:"Lunes a viernes"}[a]||a,e.querySelector(".timeExt").textContent=r,e.querySelector(".toggle-button").textContent=i[o].active?"Apagar":"Encender",e.querySelector(".toggle-button").classList.toggle("is-warning",i[o].active),e.querySelector(".toggle-button").classList.toggle("is-success",!i[o].active),localStorage.setItem("alarms",JSON.stringify(i)),d=null,m.value="Crear",m.classList.remove("is-info"),m.classList.add("is-primary"),s)&&s.classList.add("hidden"):(t={id:Date.now(),...n},i.push(t),u(t),localStorage.setItem("alarms",JSON.stringify(i))),g(),setTimeout(()=>{l=0},500)})}),document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("myModal000");var t=document.getElementById("myModal10"),n=document.getElementById("Pomodoro");let a=document.getElementById("myModal06");var o=document.getElementById("cerrarModal06").querySelector("p"),r=document.getElementById("Alarma");let i=document.getElementById("myModal07");var l=document.getElementById("cerrarModal07").querySelector("p");t.classList.remove("visible"),t.classList.toggle("hidden"),toggleVisibility_win("myModal10",1),n&&(n.addEventListener("click",()=>{e.classList.remove("visible"),e.classList.toggle("hidden"),toggleVisibility_win("myModal06",1),a.classList.toggle("visible"),a.classList.remove("hidden")}),n.style.backgroundImage="url('./images/Component-lanzador/pomodoro.png')"),o&&o.addEventListener("click",()=>{a.classList.remove("hidden"),a.classList.toggle("visible")}),r&&(r.addEventListener("click",()=>{e.classList.remove("visible"),e.classList.toggle("hidden"),toggleVisibility_win("myModal06",1),i.classList.toggle("visible"),i.classList.remove("hidden")}),r.style.backgroundImage="url('./images/Component-lanzador/alarma.png')"),l&&l.addEventListener("click",()=>{i.classList.remove("hidden"),i.classList.toggle("visible")})}),document.addEventListener("DOMContentLoaded",()=>{var e=document.getElementById("openCalendar");document.getElementById("miniPomodoro").addEventListener("click",toggleButtonVisibility),e&&e.addEventListener("click",()=>{var e=document.getElementById("rf-Programas01"),t=document.getElementById("re-Programas01");e&&(e.checked=!e.checked,!e.checked&&t&&(t.checked=!0),toggleVisibility("myModal02",e.checked),document.querySelector("#openCalendar > span").textContent="Calendario")}),showTime("MyClockDisplay")}),document.addEventListener("DOMContentLoaded",function(){var e=(new Date).getDay(),t=document.getElementById("component-day");t&&(t.innerHTML=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"][e])});let wrapper=document.querySelector(".usermenu"),children=document.querySelectorAll(".usermenu a"),noOfCircles=children.length,degreeAngle=360/noOfCircles,currAngle=0;for(var i=0;i<noOfCircles;i++)currAngle+=degreeAngle,setDiv(children[i],currAngle);function setDiv(e,t){e.classList.add("circle"),e.setAttribute("data-angle",t+250),e.style.transform="rotate("+(t+260)+"deg) translate(0) rotate(-"+(t+260)+"deg)"}function toggle(e,t=!1){let n=document.querySelectorAll(".usermenu a"),a,o=0,r=0,i;for(i=t?".3s":"0s",e&&(r="5em",i="0s"),o;n.length>o;o++)a=n[o].getAttribute("data-angle"),n[o].style.transition="transform 0.3s ease-out "+i,n[o].style.transform="rotate("+a+"deg) translate("+r+") rotate(-"+a+"deg)"}wrapper.addEventListener("mouseover",()=>{toggle(!0,!0)}),wrapper.addEventListener("mouseout",()=>{toggle(!1,!0)});let state=!1,links=(wrapper.addEventListener("touchstart",e=>{if(e.target.classList.contains("circle"))return!1;toggle(state=!state)}),document.querySelectorAll(".usermenu a")),targetDiv=document.querySelector(".usermenu > div");function changeBackgroundImage(e){targetDiv.style.backgroundImage=`url(${e})`}fetch("programs.json").then(e=>e.json()).then(n=>{Object.keys(n).forEach(e=>{let t=n[e];e=document.querySelector("a."+e);e&&t.image&&(e.style.backgroundImage=`url(${t.image})`,e.addEventListener("mouseover",()=>{changeBackgroundImage(t.image)}),e.addEventListener("mouseout",()=>{targetDiv.style.backgroundImage=""}))})}).catch(e=>{console.error("Error al cargar el archivo JSON:",e)});let objOn=document.getElementById("obj-on"),objOff=document.getElementById("obj-off");function toggleVisibility_Lector(){"block"===objOff.style.display?(objOn.style.display="block",objOff.style.display="none",setTimeout(()=>{objOn.style.display="none",objOff.style.display="block"},3e4)):(objOn.style.display="none",objOff.style.display="block")}function updateSystemUsage(){window.electron.getSystemUsage()}objOff.style.display="block",objOn.addEventListener("click",toggleVisibility_Lector),objOff.addEventListener("click",toggleVisibility_Lector),window.electron.onSystemUsage(e=>{document.getElementById("ram-usage").textContent=`RAM: ${e.memoryUsage}%`,document.getElementById("cpu-usage").textContent=`CPU: ${e.cpuUsage}%`}),setInterval(updateSystemUsage,1e3);let workTime=40,breakTime=10,longBreakTime=30,sessions=0,totalWorkTime=0,timerRunning=!1,timerType="work",remainingTime=60*workTime,freeBreakMode=!1,timerInterval;function formatTime(e){var t=Math.floor(e/60);return e%=60,String(t).padStart(2,"0")+":"+String(e).padStart(2,"0")}function updateTimerDisplay(){document.getElementById("timer_pomodoro").textContent=formatTime(remainingTime)}function updateTimer(){timerRunning&&(0<remainingTime?(--remainingTime,updateTimerDisplay(),timerInterval=setTimeout(updateTimer,1e3)):(playSound(),setTimeout(()=>{(freeBreakMode?startFreeBreak:askForActivityChange)()},1e3)))}function startTimer(){document.getElementById("title_pomodoro").textContent="🔰 Trabajando... 🔰",timerRunning||(freeBreakMode&&(freeBreakMode=!1,document.getElementById("start").textContent="Iniciar"),timerRunning=!0,updateTimer())}function stopTimer(){clearTimeout(timerInterval),timerRunning=!1}function resetTimer(){stopTimer(),document.getElementById("title_pomodoro").textContent="🍅 Pomodoro Timer 🍅",remainingTime="work"===timerType?60*workTime:60*breakTime,updateTimerDisplay()}function startFreeBreak(){document.getElementById("title_pomodoro").textContent="🔰 Descanso 🔰",(freeBreakMode?startTimer:(stopTimer(),freeBreakMode=!0,document.getElementById("start").textContent="Iniciar Descanso",remainingTime=60*breakTime,updateTimerDisplay))()}function askForActivityChange(){timerType="work"===timerType?"trabajo":"descanso",mostrarModal("🍅 Pomodoro Timer 🍅",`¿Deseas cambiar de ${timerType} a ${"trabajo"===timerType?"descanso":"trabajo"}?`).then(e=>{(e?(timerType="work",switchMode(),updateTimer):(timerType="break",resetTimer))()})}function switchMode(){"work"===timerType?(document.getElementById("title_pomodoro").textContent="🔰 Descanso 🔰",2===sessions?(remainingTime=60*longBreakTime,sessions=0):(remainingTime=60*breakTime,sessions+=1),document.getElementById("breakStatus").textContent="Descansos: "+sessions,totalWorkTime+=workTime,document.getElementById("workStatus").textContent="Horas de trabajo: "+totalWorkTime,timerType="break"):(timerType="work",document.getElementById("title_pomodoro").textContent="🔰 Trabajando... 🔰",remainingTime=60*workTime)}function playSound(){new Audio("work"===timerType?"./song/SD_ALERT_29.mp3":"./song/mario-bros-die.mp3").play()}function updateTimes(){workTime=parseInt(document.getElementById("workTime").value,10),breakTime=parseInt(document.getElementById("breakTime").value,10),resetTimer()}function minimizar_pomodoro(){var e=document.getElementById("minimizar_pomodoro"),t=document.getElementById("myModal06");let n=document.getElementById("miniPomodoro");document.getElementById("timer_pomodoro").textContent;e&&(t.classList.remove("hidden"),t.classList.toggle("visible"),n.style.display="block",setInterval(function(){var e=document.getElementById("timer_pomodoro").textContent;n.textContent="🍅 "+e},1e3))}function minimizar_calendar(){var e=document.getElementById("rf-Programas01"),t=document.getElementById("re-Programas01"),n=new Date,n=new Intl.DateTimeFormat("es-CO",{year:"numeric",month:"long",day:"numeric"}).format(n);e&&(e.checked=!e.checked,!e.checked&&t&&(t.checked=!0),toggleVisibility("myModal02",e.checked),document.querySelector("#openCalendar > span").textContent=n)}document.addEventListener("DOMContentLoaded",()=>{updateTimerDisplay(),document.getElementById("start").addEventListener("click",startTimer),document.getElementById("stop").addEventListener("click",stopTimer),document.getElementById("reset").addEventListener("click",resetTimer),document.getElementById("freeBreak").addEventListener("click",startFreeBreak),document.getElementById("updateTimes").addEventListener("click",updateTimes),document.getElementById("minimizar_pomodoro").addEventListener("click",minimizar_pomodoro)}),document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("has-tooltip-calendar"),t=document.getElementById("prevMonth"),n=document.getElementById("nextMonth");let v=document.getElementById("monthYear"),p=document.getElementById("days"),a=new Date,E=[{day:1,month:0},{day:1,month:4},{day:20,month:6},{day:7,month:7},{day:25,month:11},{day:25,month:10},{day:2,month:8}];function o(e){var n=e.getFullYear();let a=e.getMonth();var t,o,r,i=new Date,l=(t=n,s=Math.floor,l=t%19,o=s(t/100),l=(r=(r=(o-s(o/4)-s((8*o+13)/25)+19*l+15)%30)-s(r/28)*(1-s(29/(1+r))*s((21-l)/11)))-(t+s(t/4)+r+2-o+s(o/4))%7,r=3+s((40+l)/44),o=28+l-31*s(r/4),new Date(t,r-1,o)),d=[new Date(l.getTime()+33696e5),new Date(l.getTime()+5184e6),new Date(l.getTime()+58752e5),new Date(n,9,8-(new Date(n,9,1).getDay()||7)),new Date(n,10,8-(new Date(n,10,1).getDay()||7)),new Date(n,10,18-(new Date(n,10,11).getDay()||7))],s=(v.textContent=e.toLocaleString("es-ES",{month:"long"}).toUpperCase()+" "+n,p.innerHTML="",new Date(n,a,1).getDay()),m=new Date(n,a+1,0).getDate(),c=0===s?6:s-1;for(let e=0;e<c;e++)p.innerHTML+='<div class="calendar-day-box"></div>';for(let t=1;t<=m;t++){var u=i.getDate()===t&&i.getMonth()===a&&i.getFullYear()===n?"calendar-day-box current-day":"calendar-day-box",g=E.some(e=>e.day===t&&e.month===a),y=d.some(e=>e.getDate()===t&&e.getMonth()===a),g=g||y?u+" holiday":u;p.innerHTML+=`<div class="${g}">${t}</div>`}}t.addEventListener("click",function(){a.setMonth(a.getMonth()-1),o(a)}),n.addEventListener("click",function(){a.setMonth(a.getMonth()+1),o(a)}),e.addEventListener("click",function(){minimizar_calendar()}),o(a)}),document.addEventListener("DOMContentLoaded",function(){let n=document.getElementById("volume-slider");var e=document.getElementById("mute-toggle");let a=e.querySelector("i"),t=document.querySelector("#volume-slider");t.value;let o=document.querySelector("#range-input-value");async function r(){var e=await window.electron.getVolume(),t=await window.electron.getMuted();n.value=e,a.className=t?"fas fa-volume-mute":"fas fa-volume-up"}n.addEventListener("input",async()=>{var e=n.value;await window.electron.setVolume(Number(e))}),e.addEventListener("click",async()=>{var e=await window.electron.getMuted();await window.electron.setMuted(!e),r()}),r();let i=e=>{o.innerText=e};setInterval(function(){r(),i(t.value)},500),t.addEventListener("input",e=>{i(e.target.value)})});
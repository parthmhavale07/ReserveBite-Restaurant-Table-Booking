const tableArea=document.getElementById("tables");
const dateInput=document.getElementById("date");
const today=new Date().toISOString().split("T")[0];
dateInput.min=today;
let selected=null;

function getBookings(){return JSON.parse(localStorage.getItem("reserveBiteBookings")||"[]")}
function saveBookings(x){localStorage.setItem("reserveBiteBookings",JSON.stringify(x))}
function renderTables(){
  tableArea.innerHTML="";
  const date=dateInput.value, time=document.getElementById("time").value;
  const bookings=getBookings();
  for(let i=1;i<=12;i++){
    const t=document.createElement("div"); t.className="table"; t.textContent="Table "+i;
    const booked=bookings.some(b=>b.date===date&&b.time===time&&b.table===i);
    if(booked){t.classList.add("booked");t.title="Already booked"}
    

    else t.onclick=()=>{
  document.querySelectorAll(".table").forEach(x=>x.classList.remove("selected"));

  t.classList.add("selected");

  selected=i;

  document.getElementById("selectedTable").value=i;

  const selectedTableInfo=document.getElementById("selectedTableInfo");

  if(selectedTableInfo){
    selectedTableInfo.textContent="🪑 Table "+i+" selected";
    selectedTableInfo.classList.add("active");
  }
};

    tableArea.appendChild(t);
  }
}


dateInput.addEventListener("change",()=>{
  selected=null;

  const info=document.getElementById("selectedTableInfo");

  if(info){
    info.textContent="🪑 No table selected yet";
    info.classList.remove("active");
  }

  renderTables();
});

document.getElementById("time").addEventListener("change",()=>{
  selected=null;

  const info=document.getElementById("selectedTableInfo");

  if(info){
    info.textContent="🪑 No table selected yet";
    info.classList.remove("active");
  }

  renderTables();
});

renderTables();

document.getElementById("bookingForm").addEventListener("submit",e=>{
 e.preventDefault();
 if(!selected){
  alert("Please select an available table.");
  return;
}

if(!dateInput.value){
  alert("Please select a reservation date.");
  return;
}

if(!document.getElementById("time").value){
  alert("Please select a reservation time.");
  return;
}

if(!document.getElementById("guests").value){
  alert("Please select the number of guests.");
  return;
}

 const bookings=getBookings();
 const booking={id:"RB"+Date.now().toString().slice(-7),name:document.getElementById("name").value.trim(),phone:document.getElementById("phone").value,date:dateInput.value,time:document.getElementById("time").value,guests:document.getElementById("guests").value,table:selected,request:document.getElementById("request").value.trim()};
 bookings.push(booking);saveBookings(bookings);
 document.getElementById("modalContent").innerHTML=`<div class="success-icon">✅</div><h2>Booking Confirmed!</h2><p>Your table has been reserved successfully.</p><br><p><b>Booking ID:</b> ${booking.id}<br><b>Table:</b> ${booking.table}<br><b>Date:</b> ${booking.date}<br><b>Time:</b> ${booking.time}<br><b>Guests:</b> ${booking.guests}</p>`;
 document.getElementById("modal").style.display="flex";
 

 e.target.reset();
selected=null;

const info=document.getElementById("selectedTableInfo");

if(info){
  info.textContent="🪑 No table selected yet";
  info.classList.remove("active");
}

renderTables();

});
function closeModal(){document.getElementById("modal").style.display="none"}
function findBooking(){
 const q=document.getElementById("searchBooking").value.trim().toLowerCase();
 const b=getBookings().find(x=>x.id.toLowerCase()===q||x.phone===q);
 const r=document.getElementById("bookingResult");
 if(!b){r.innerHTML='<div class="result-card">❌ No booking found. Check your Booking ID or mobile number.</div>';return}
 r.innerHTML=`<div class="result-card"><h3>Booking ${b.id}</h3><p><b>Name:</b> ${b.name}<br><b>Table:</b> ${b.table}<br><b>Date:</b> ${b.date}<br><b>Time:</b> ${b.time}<br><b>Guests:</b> ${b.guests}<br><b>Special Request:</b> ${b.request||"None"}</p><button class="btn danger" onclick="cancelBooking('${b.id}')">Cancel Booking</button></div>`;
}
function cancelBooking(id){
 if(!confirm("Are you sure you want to cancel this booking?"))return;
 saveBookings(getBookings().filter(x=>x.id!==id));
 document.getElementById("bookingResult").innerHTML='<div class="result-card">✅ Booking cancelled successfully.</div>';
 renderTables();
}
document.getElementById("themeBtn").onclick=()=>{
 document.body.classList.toggle("dark");
 document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀️":"🌙";
};
window.onclick=e=>{if(e.target.id==="modal")closeModal()};


// ================================
// MOBILE MENU
// ================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("open");

        if (navLinks.classList.contains("open")) {

            menuBtn.textContent = "✕";

        } else {

            menuBtn.textContent = "☰";

        }

    });

    // Close menu after clicking a link

    navLinks.querySelectorAll("a").forEach(function(link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

            menuBtn.textContent = "☰";

        });

    });

}
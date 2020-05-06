const fetchBtn = document.getElementById("fetch-data");
const tableBody = document.getElementById("table-body");
const fetchData=document.querySelector('.fetchdata')
const loginDiv=document.querySelector('.admin-login')
const status= document.getElementById("status")
fetchData.style.display="none"
//login validations
let isLogged=false
$('#login-form').submit(function(e){
    e.preventDefault()
    var form = $(this);
    var url = "../login";
    status.classList=[]
    status.classList.add("form-text",  "text-center","m-0")
    status.innerText = "Processing...";
    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(), 
      success: function (data) {
        if(data.valid){
          fetchData.style.display="block"
          loginDiv.style.display="none"
        }
        else{
          status.innerText = "Wrong ID/Password";
          if(!status.classList.contains("text-danger")){
              status.classList.add("text-danger")
          }
        }
      }
  })
})







let c = 0;
fetchBtn.addEventListener("click", (e) => {
  fetchBtn.style.pointerEvents = "none";
  tableBody.innerHTML = "";
  fetch("../getinfo")
    .then((data) => {
      return data.json();
    })
    .then((fulldata) => {
      let bdginfo = {};
      fulldata.forEach((user) => {
        console.log(user);
        let tr = document.createElement("tr");
        tr.classList.add("user-row");
        tr.setAttribute("data-toggle", "modal");
        tr.setAttribute("data-target", "#exampleModal");
        tr.style.cursor="pointer"
        tr.innerHTML = `
            <td>${user.prn_no}</td>
            <td>${user.full_name}</td>
            <td>${user.course}</td>
            <td>${user.badgeInfo.totalBadges}</td>
            <td>${user.badgeInfo.totalStars}</td>
            <td class="d-none">${user._id}</td>
           
           `;
        bdginfo[user._id] = user.badgeInfo.badges;
        tableBody.appendChild(tr);
        fetchBtn.style.pointerEvents = "auto";
        tr.addEventListener("click", (e) => {
          let id = $(e.target).siblings()[4].innerText;
          let badgeDetails=bdginfo[id]
          count=1
          let html=""
          Object.entries(badgeDetails).map(info=>{
            html+=`
                <tr>
                <td>${count++}</td>
                <td>${info[0]}</td>
                <td>${info[1]}</td>
                </tr>

            
            `
          })
          document.getElementById('bdg-body').innerHTML=html
        });
      });
    });
});



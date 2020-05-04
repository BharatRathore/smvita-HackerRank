const status= document.getElementById("status")
const badgeDiv=document.getElementById('badge-div')
const name=document.getElementById('bd-name')
const prn=document.getElementById('bd-prn')
const tableDiv=document.querySelector('.table-div')
badgeDiv.style.display="none";
status.style.display="none"
document.getElementById('no-stars').style.display="block"

$("#hidform").submit(function (e) {
    badgeDiv.style.display="none";
  status.style.display="block"
  status.classList=[]
  status.classList.add("form-text",  "text-center" ,"pt-2")
  status.innerText = "Processing...";
  e.preventDefault(); // avoid to execute the actual submit of the form.

  var form = $(this);
  var url = form.attr("action");

  $.ajax({
    type: "POST",
    url: url,
    data: form.serialize(), 
    success: function (data) {
        let tbody=document.getElementById('bdg-body')
        let html=''
        if(data!=="0") {
            document.getElementById('no-stars').style.display="none"
            tableDiv.style.display="block"
            let badgeInfo=data.badges
            status.innerText = "Submitted Successfully"
            console.log(data)
            if(status.classList.contains("text-danger")){
                status.classList.remove("text-danger")
            }
            if(!status.classList.contains("text-success")){
                status.classList.add("text-success")
            }
            let c=1
            name.innerText="Name: "+data.name
            prn.innerText="PRN no.: "+data.prn
            
            if(data.totalBadges>0){
                Object.entries(badgeInfo).map(info=>{
                    html+=`
                        <tr>
                        <td>${c++}</td>
                        <td>${info[0]}</td>
                        <td>${info[1]}</td>
                        </tr>
    
                    
                    `
                })
                tbody.innerHTML=html
            }
            else{
                tableDiv.style.display="none"
                document.getElementById('no-stars').style.display="block"
            }
            
            c=0
            
            badgeDiv.style.display="block";
            
          }  
          else{
              status.innerText="Wrong Userid,Please enter again"
              if(status.classList.contains("text-success")){
                status.classList.remove("text-success")
            }
            if(!status.classList.contains("text-danger")){
                status.classList.add("text-danger")
            }
        }
    },
  });
});

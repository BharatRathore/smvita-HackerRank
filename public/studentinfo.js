const status=document.getElementById('status')
const dashboard=document.querySelector('.dashboard')
const login=document.querySelector('.student-login')
const tbody=document.getElementById('bdg-body')
const noStars=document.getElementById('no-stars')
const stdProfile=document.getElementById('std-profile')
noStars.style.display="none"
let html=''
let c=1


$('#student-login-form').submit(function(e){
    e.preventDefault()
    var form = $(this);
    var url = "../studentLogin";
    status.classList=[]
    status.classList.add("form-text",  "text-center","m-0")
    status.innerText = "Processing...";
    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(), 
      success: function (data) {
          let studentInfo=data.data
        if(data.valid){
            const profileDetails=document.querySelectorAll('.edit')
            profileDetails[0].setAttribute("value",studentInfo.full_name)
            profileDetails[1].setAttribute("value",studentInfo.prn_no)
            profileDetails[2].setAttribute("value",studentInfo.hackerRankId)
            profileDetails[3].setAttribute("value",studentInfo.githubId)

            console.log(profileDetails)
            stdProfileHtml(studentInfo)
            status.innerText = "";
            console.log(data)
            dashboard.classList.toggle('d-none')
            login.style.display="none"
            console.log(studentInfo.badgeInfo.totalBadges)
            if(studentInfo.badgeInfo.totalBadges>0){
                Object.entries(studentInfo.badgeInfo.badges).map(info=>{
                    html+=`
                        <tr>
                        <td>${c++}</td>
                        <td>${info[0]}</td>
                        <td>${info[1]}</td>
                        </tr>
    
                    
                    `
                })
                html+=`
                <tr class="table-secondary">
                        <td>Total</td>
                        <td>${studentInfo.badgeInfo.totalBadges}</td>
                        <td>${studentInfo.badgeInfo.totalStars}</td>
                        </tr>

                `
                tbody.innerHTML=html
            }
            else{
                noStars.style.display="block"
            }

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

function stdProfileHtml(stdInfo){
    let html=`
    
    `
stdProfile.innerHTML+=html
}




function editInfo(){
    const edits=document.querySelectorAll('.edit')
    
    edits.forEach(edit=>{
        edit.removeAttribute("disabled")
    })
}
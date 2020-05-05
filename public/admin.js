const fetchBtn=document.getElementById('fetch-data')
const tableBody=document.getElementById('table-body')
let c=0;
fetchBtn.addEventListener('click',e=>{
    fetchBtn.style.pointerEvents="none"
    tableBody.innerHTML=''
    fetch('../getinfo')
    .then(data=>{
        return data.json()
    })
    .then(fulldata=>{
        let bdginfo={}
        fulldata.forEach(user => {
            console.log(user)
           let tr=document.createElement("tr")
           tr.classList.add('user-row')
           tr.setAttribute("data-toggle","modal")
           tr.setAttribute("data-target","#exampleModal")
           


           tr.innerHTML=`
            <td>${user.prn_no}</td>
            <td>${user.full_name}</td>
            <td>${user.course}</td>
            <td>${user.badgeInfo.totalBadges}</td>
            <td>${user.badgeInfo.totalStars}</td>
            <td class="d-none">${user._id}</td>
           
           `
        bdginfo[user._id]=user.badgeInfo.badges
        tableBody.appendChild(tr)
        fetchBtn.style.pointerEvents="auto"
        tr.addEventListener('click',e=>{
            let id=$(e.target).siblings()[4].innerText
            
        })

        });
    })
})

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })